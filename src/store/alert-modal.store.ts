import { create } from 'zustand';

export type AlertModalStore = {
  open: boolean;
  title: string;
  message: string;
  onOpen: (title: string, message: string) => void;
  onClose: () => void;
  reset: () => void;
};

export const useAlertModalStore = create<AlertModalStore>((set) => ({
  open: false,
  title: 'TEST',
  message: 'test message',
  onOpen: (title: string, message: string) => set({ open: true, title, message }),
  onClose: () => set({ open: false }),
  reset: () => set({ open: false, title: '', message: '' }),
}));
