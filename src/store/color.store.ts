import { create } from 'zustand';

export const DARK_GREEN = '#1F3731';
export const WHITE = '#f5f5f5';

export const useColorStore = create<{
  scrollY: number;
  mainColor: string;
  reverseColor: string;
  changeColors: () => void;
  changeColorsOnScrollY: () => void;
}>((set) => ({
  scrollY: 0,
  mainColor: DARK_GREEN,
  reverseColor: WHITE,
  changeColors: () =>
    set((state) => ({
      mainColor: state.mainColor === DARK_GREEN ? WHITE : DARK_GREEN,
      reverseColor: state.reverseColor === WHITE ? DARK_GREEN : WHITE,
    })),
  changeColorsOnScrollY: () => {
    set((state) => {
      const scrollY = window.scrollY;
      const isChangeColors = (state.scrollY === 0 && scrollY > 0) || (scrollY === 0 && state.scrollY > 0);

      if (!isChangeColors) {
        return { scrollY };
      }

      return {
        scrollY,
        mainColor: state.mainColor === DARK_GREEN ? WHITE : DARK_GREEN,
        reverseColor: state.reverseColor === WHITE ? DARK_GREEN : WHITE,
      };
    });
  },
}));
