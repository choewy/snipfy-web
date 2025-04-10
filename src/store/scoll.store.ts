import { useEffect } from 'react';
import { create } from 'zustand';

export const useScrollStore = create<{
  windowScrollY: number;
  borderBottomWidth: number;
  setBorderBottomWidth: () => void;
}>((set) => ({
  windowScrollY: window.scrollY,
  borderBottomWidth: 0,
  setBorderBottomWidth: () =>
    set((state) => {
      let windowScrollY = window.scrollY;
      let borderBottomWidth = state.borderBottomWidth;

      switch (true) {
        case state.windowScrollY > 0 && windowScrollY < 2:
          borderBottomWidth = 0;
          break;

        case state.windowScrollY < 2 && windowScrollY > 0:
          borderBottomWidth = 1;
          break;
      }

      return { windowScrollY, borderBottomWidth };
    }),
}));

export const useOnWindowScrollEvent = () => {
  const { setBorderBottomWidth } = useScrollStore();

  useEffect(() => {
    window.addEventListener('scroll', setBorderBottomWidth);

    return () => {
      window.removeEventListener('scroll', setBorderBottomWidth);
    };
  }, []);
};
