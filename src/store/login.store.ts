import { create } from 'zustand';

export type LoginStore = {
  email: string;
  password: string;
  passwordVisible: boolean;
  changeEmail: (email: string) => void;
  changePassword: (password: string) => void;
  changePasswordVisible: () => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const useLoginStore = create<LoginStore>((set) => ({
  email: '',
  password: '',
  passwordVisible: false,
  changeEmail: (email: string) => set({ email }),
  changePassword: (password: string) => set({ password }),
  changePasswordVisible: () => set((state) => ({ passwordVisible: !state.passwordVisible })),
  login: async () => {},
  logout: async () => {},
}));
