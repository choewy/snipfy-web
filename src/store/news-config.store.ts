import { create } from 'zustand';

import { localStorageService } from '../core/local-storage/local-storage.service';

export const useNewsConfigStore = create<{
  visible: boolean;
  hideNews: () => void;
}>((set) => ({
  visible: localStorageService.getNewsVisible(),
  hideNews: () => set({ visible: localStorageService.setNewsVisible(false) }),
}));
