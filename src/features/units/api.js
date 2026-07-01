/**
 * API definitions for this specific feature.
 * Consumes the central axios instance for endpoints relating to this specific domain mapping.
 */


import api from '@/lib/axios';

export const UnitsApi = {
  getAll: async () => {
    return api.get('units');
  },
  getFeatured: async () => {
    return api.get('featured-units');
  }
};
