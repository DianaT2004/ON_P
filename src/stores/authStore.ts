import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'driver' | 'owner';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isPremium: boolean;
  phone: string;
  company?: string;
  rating: number;
  completedLoads: number;
  joinedDate: string;
  verified: boolean;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  upgradeToPremium: () => void;
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
      
      upgradeToPremium: () => {
        set((state) => ({
          user: state.user ? { ...state.user, isPremium: true } : null,
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
    isPremium: false,
    phone: '+995 555 123 456',
    rating: 4.8,
    completedLoads: 147,
    joinedDate: 'March 2023',
    verified: true,
  },
  owner: {
    id: 'own-001',
    name: 'Fresh Harvest Ltd.',
    email: 'owner@onpoint.ge',
    role: 'owner' as const,
    isPremium: true,
    company: 'Fresh Harvest Ltd.',
    phone: '+995 555 789 012',
    rating: 4.9,
    completedLoads: 89,
    joinedDate: 'January 2023',
    verified: true,
  },
};
