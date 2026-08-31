import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { apiClient } from './api-client';

export interface AuthUser {
  id: string;
  username: string;
  name: string;
  email?: string | null;
  role: string;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  login: (loginId: string, pass: string) => Promise<boolean>;
  signup: (name: string, loginId: string, pass: string) => Promise<boolean>;
  forgotPassword: (loginId: string, newPass: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      clearError: () => set({ error: null }),

      login: async (loginId: string, pass: string) => {
        set({ isLoading: true, error: null });
        try {
          const response: any = await apiClient.post('/auth/login', {
            loginId: loginId.trim(),
            password: pass,
          });

          const { token, user } = response.data || response;
          if (token) {
            localStorage.setItem('token', token);
            set({
              user,
              token,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
            return true;
          }
          throw new Error('Authentication token missing in response');
        } catch (err: any) {
          const message =
            err.message ||
            (err.response?.data?.message ?? 'Login failed. Please check your credentials.');
          set({ isLoading: false, error: message });
          return false;
        }
      },

      signup: async (name: string, loginId: string, pass: string) => {
        set({ isLoading: true, error: null });
        try {
          const response: any = await apiClient.post('/auth/signup', {
            name: name.trim(),
            loginId: loginId.trim(),
            password: pass,
          });

          const { token, user } = response.data || response;
          if (token) {
            localStorage.setItem('token', token);
            set({
              user,
              token,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
            return true;
          }
          throw new Error('Failed to create account');
        } catch (err: any) {
          const message =
            err.message ||
            (err.response?.data?.message ?? 'Sign up failed. Please try a different User ID.');
          set({ isLoading: false, error: message });
          return false;
        }
      },

      forgotPassword: async (loginId: string, newPass: string) => {
        set({ isLoading: true, error: null });
        try {
          const response: any = await apiClient.post('/auth/forgot-password', {
            loginId: loginId.trim(),
            newPassword: newPass,
          });
          set({ isLoading: false });
          return {
            success: true,
            message: response.message || 'Password reset successfully.',
          };
        } catch (err: any) {
          const message =
            err.message ||
            (err.response?.data?.message ?? 'Failed to reset password.');
          set({ isLoading: false, error: message });
          return {
            success: false,
            message,
          };
        }
      },

      logout: () => {
        localStorage.removeItem('token');
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
      },
    }),
    {
      name: 'dream_decorators_auth',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
