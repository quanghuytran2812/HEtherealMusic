import { create } from "zustand";

type RightSidebarView = 'users' | 'queue' | null;

interface RightSidebarState {
  view: RightSidebarView;
  isOpen: boolean;
  toggleView: (view: RightSidebarView) => void;
  closeSidebar: () => void;
}

export const useRightSidebarStore = create<RightSidebarState>()((set) => ({
  view: null,
  isOpen: false,
  toggleView: (view) => set((state) => ({
    view,
    isOpen: view !== state.view || !state.isOpen
  })),
  closeSidebar: () => set({ isOpen: false })
}));