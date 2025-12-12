import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'driver' | 'owner';
export type SubscriptionType = 'free' | 'pro' | 'premium';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  subscription: SubscriptionType;
  phone: string;
  company?: string;
  rating: number;
  completedLoads: number;
  joinedDate: string;
  verified: boolean;
  truckTypes?: string[];
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateSubscription: (type: SubscriptionType) => void;
  updateTruckTypes: (types: string[]) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      
      login: (user) => {
        set({ user, isAuthenticated: true });
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      
      updateSubscription: (type: SubscriptionType) => {
        set((state) => ({
          user: state.user ? { ...state.user, subscription: type } : null,
        }));
      },
      
      updateTruckTypes: (types: string[]) => {
        set((state) => ({
          user: state.user ? { ...state.user, truckTypes: types } : null,
        }));
      },
    }),
    {
      name: 'onpoint-auth-storage',
    }
  )
);

// Demo users for testing
export const DEMO_USERS = {
  driver: {
    id: 'drv-001',
    name: 'Dachi Ghambashidze',
    email: 'driver@onpoint.ge',
    role: 'driver' as const,
    subscription: 'free' as const,
    phone: '+995 555 123 456',
    rating: 4.8,
    completedLoads: 147,
    joinedDate: 'March 2023',
    verified: true,
    truckTypes: [],
  },
  owner: {
    id: 'own-001',
    name: 'Fresh Harvest Ltd.',
    email: 'owner@onpoint.ge',
    role: 'owner' as const,
    subscription: 'premium' as const,
    company: 'Fresh Harvest Ltd.',
    phone: '+995 555 789 012',
    rating: 4.9,
    completedLoads: 89,
    joinedDate: 'January 2023',
    verified: true,
  },
};
