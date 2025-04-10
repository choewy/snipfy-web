import { create } from 'zustand';

export const useAlertModalStore = create<{
  open: boolean;
  message: string;
  onClose: () => void;
}>((set) => ({
  open: false,
  message: '',
  onClose: () => set({ open: false }),
}));
