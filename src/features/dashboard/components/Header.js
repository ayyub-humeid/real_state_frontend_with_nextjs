'use client';

import { useState, useEffect, useRef } from 'react';
import { useBroadcast } from '@/context/BroadcastContext';
import Link from 'next/link';

export function Header({ user, onLogout }) {
  const { notifications, unreadCount, markAsRead } = useBroadcast();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNotificationClick = async (notification) => {
    // Mark as read
    if (!notification.read_at) {
      await markAsRead(notification.id);
    }
    setIsOpen(false);
    
    // Redirect if URL is provided
    if (notification.url) {
      window.location.href = notification.url;
    }
  };

  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-between px-6 lg:px-8 h-16"
      style={{ background: 'rgba(247,249,251,0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #f1f5f9' }}
    >
      {/* Mobile brand */}
      <div className="lg:hidden flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#4f46e5' }}>
          <span className="material-symbols-outlined text-white" style={{ fontSize: '18px' }}>apartment</span>
        </div>
        <span className="font-bold text-base" style={{ color: '#0f172a' }}>EstateSync Pro</span>
      </div>

      {/* Desktop title */}
      <div className="hidden lg:block">
        <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#94a3b8' }}>Tenant Portal</p>
        <h1 className="text-lg font-bold" style={{ color: '#0f172a' }}>
          Welcome back, {user?.name?.split(' ')[0] || 'Tenant'} 👋
        </h1>
      </div>

      <div className="flex items-center gap-3 relative" ref={dropdownRef}>
        {/* Bell Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative p-2 rounded-xl transition-all hover:bg-slate-100 flex items-center justify-center"
          aria-label="Notifications"
          id="notification-bell-button"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '22px', color: '#64748b' }}>notifications</span>
          {unreadCount > 0 && (
            <span
              className="absolute -top-0.5 -right-0.5 min-w-5 h-5 px-1.5 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-sm"
              style={{ background: '#4f46e5', border: '2px solid #f7f9fb' }}
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div
            className="absolute right-0 top-12 w-80 md:w-96 rounded-2xl shadow-2xl overflow-hidden z-50 flex flex-col border border-slate-100"
            style={{
              background: '#ffffff',
              boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
            }}
          >
            {/* Dropdown Header */}
            <div className="px-5 py-4 flex items-center justify-between border-b border-slate-50">
              <span className="font-bold text-sm" style={{ color: '#0f172a' }}>Notifications</span>
              {unreadCount > 0 && (
                <button
                  onClick={() => markAsRead(null)}
                  className="text-xs font-semibold transition-colors hover:opacity-80"
                  style={{ color: '#4f46e5' }}
                >
                  Mark all as read
                </button>
              )}
            </div>

            {/* Dropdown List */}
            <div className="max-h-80 overflow-y-auto divide-y divide-slate-50">
              {notifications.length === 0 ? (
                <div className="py-12 flex flex-col items-center justify-center text-center px-4">
                  <span className="material-symbols-outlined text-slate-300 mb-2" style={{ fontSize: '36px' }}>notifications_off</span>
                  <p className="text-xs font-semibold" style={{ color: '#64748b' }}>No notifications yet</p>
                  <p className="text-[10px] mt-0.5" style={{ color: '#94a3b8' }}>We'll notify you when something updates.</p>
                </div>
              ) : (
                notifications.map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => handleNotificationClick(notif)}
                    className="p-4 flex items-start gap-3 hover:bg-slate-50 transition-colors cursor-pointer relative"
                  >
                    {/* Left Icon depending on notification type */}
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        background: notif.read_at ? '#f1f5f9' : '#eef2ff',
                        color: notif.read_at ? '#94a3b8' : '#4f46e5'
                      }}
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                        {notif.type?.includes('Payment') ? 'payments' : 'build'}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 pr-2">
                      <div className="flex items-start justify-between gap-1">
                        <p
                          className={`text-xs font-bold truncate ${notif.read_at ? 'text-slate-600' : 'text-slate-900'}`}
                        >
                          {notif.title}
                        </p>
                        <span className="text-[10px]" style={{ color: '#94a3b8' }}>
                          {notif.created_at}
                        </span>
                      </div>
                      <p className={`text-[11px] leading-relaxed mt-0.5 break-words ${notif.read_at ? 'text-slate-400' : 'text-slate-500'}`}>
                        {notif.message}
                      </p>
                    </div>

                    {/* Unread indicator dot */}
                    {!notif.read_at && (
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: '#4f46e5' }} />
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Dropdown Footer */}
            {notifications.length > 0 && (
              <div className="bg-slate-50 px-5 py-3 text-center border-t border-slate-100">
                <Link
                  href="/tenant/maintenance"
                  onClick={() => setIsOpen(false)}
                  className="text-[11px] font-bold hover:underline"
                  style={{ color: '#4f46e5' }}
                >
                  View Maintenance History
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Mobile Logout */}
        <button
          id="mobile-logout"
          onClick={onLogout}
          className="lg:hidden p-2 rounded-xl transition-all hover:bg-red-50"
          aria-label="Logout"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '22px', color: '#ef4444' }}>logout</span>
        </button>
      </div>
    </header>
  );
}

