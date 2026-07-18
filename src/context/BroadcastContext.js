'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import Echo from 'laravel-echo';
import windowPusher from 'pusher-js';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';
import api from '@/lib/axios';

const BroadcastContext = createContext(null);

export const BroadcastProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [echoInstance, setEchoInstance] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      setLoading(true);
      const res = await api.get('tenant/notifications');
      if (res?.success) {
        setNotifications(res.data || []);
        setUnreadCount(res.unread_count || 0);
      }
    } catch (e) {
      console.error('Failed to load notifications:', e);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const markAsRead = useCallback(async (id = null) => {
    try {
      if (id) {
        setNotifications(prev =>
          prev.map(n => n.id === id ? { ...n, read_at: new Date().toISOString() } : n)
        );
        setUnreadCount(prev => Math.max(0, prev - 1));
        await api.post(`tenant/notifications/${id}/mark-as-read`);
      } else {
        setNotifications(prev =>
          prev.map(n => ({ ...n, read_at: new Date().toISOString() }))
        );
        setUnreadCount(0);
        await api.post('tenant/notifications/mark-as-read');
      }
    } catch (e) {
      console.error('Failed to mark notification(s) as read:', e);
      // Re-fetch to sync if failed
      fetchNotifications();
    }
  }, [fetchNotifications]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchNotifications();
    } else {
      setNotifications([]);
      setUnreadCount(0);
    }
  }, [isAuthenticated, fetchNotifications]);

  useEffect(() => {
    // Only connect if the user is authenticated and we're in the browser
    if (typeof window !== 'undefined' && isAuthenticated && user) {
      window.Pusher = windowPusher;

      const token = localStorage.getItem('token');
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/';
      const authEndpoint = apiUrl.replace(/\/$/, '') + '/broadcasting/auth';

      const echo = new Echo({
        broadcaster: 'reverb',
        key: process.env.NEXT_PUBLIC_REVERB_APP_KEY || 'abcdefg',
        wsHost: process.env.NEXT_PUBLIC_REVERB_HOST || 'localhost',
        wsPort: process.env.NEXT_PUBLIC_REVERB_PORT || 8080,
        wssPort: process.env.NEXT_PUBLIC_REVERB_PORT || 8080,
        forceTLS: (process.env.NEXT_PUBLIC_REVERB_SCHEME || 'http') === 'https',
        enabledTransports: ['ws', 'wss'],
        authEndpoint: authEndpoint,
        auth: {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        },
      });

      setEchoInstance(echo);

      // Listen to the default User channel (which Filament also uses)
      const channelName = `App.Models.User.${user.id}`;
      console.log(`[Broadcast] Subscribing to private channel: ${channelName}`);

      const channel = echo.private(channelName);

      channel.notification((notification) => {
        console.log('[Broadcast] Notification Received:', notification);

        // Standardize structure to match database schema format
        const newNotif = {
          id: notification.id || Math.random().toString(),
          type: notification.type || 'App\\Notifications\\Generic',
          title: notification.title || 'New Notification',
          message: notification.message || notification.body || 'You have a new update.',
          url: notification.url || null,
          read_at: null,
          created_at: 'Just now',
        };

        setNotifications(prev => [newNotif, ...prev.slice(0, 19)]);
        setUnreadCount(prev => prev + 1);

        // Show modern toast using sonner
        toast(newNotif.title, {
          description: newNotif.message,
          action: newNotif.url ? {
            label: 'View',
            onClick: () => window.location.href = newNotif.url,
          } : undefined,
          duration: 5000,
        });
      });

      // Add connection state logging to debug connection issues
      echo.connector.pusher.connection.bind('connected', () => {
        console.log('[Broadcast] Successfully connected to Reverb WebSocket!');
      });
      echo.connector.pusher.connection.bind('disconnected', () => {
        console.log('[Broadcast] Disconnected from Reverb WebSocket.');
      });
      echo.connector.pusher.connection.bind('error', (err) => {
        console.error('[Broadcast] WebSocket Connection Error:', err);
      });

      return () => {
        if (echo) {
          console.log('[Broadcast] Cleaning up connection...');
          echo.leave(channelName);
          echo.disconnect();
        }
      };
    }
  }, [isAuthenticated, user]);

  return (
    <BroadcastContext.Provider
      value={{
        echo: echoInstance,
        notifications,
        unreadCount,
        loading,
        fetchNotifications,
        markAsRead
      }}
    >
      {children}
    </BroadcastContext.Provider>
  );
};

export const useBroadcast = () => {
  return useContext(BroadcastContext);
};

