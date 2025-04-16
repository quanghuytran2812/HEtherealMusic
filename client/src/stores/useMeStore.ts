import { apiLogout } from "@/apis/auth";
import { apiGetMe, apiGetTop } from "@/apis/user";
import { registerData, TopArtist, TopTrack, User } from "@/utils/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface MeStore {
  isAuthenticated: boolean;
  me: User | null;
  registerData: registerData | null;
  topArtist: TopArtist | null;
  topTrack: TopTrack | null;

  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setRegisterData: (data: registerData) => void;
  clearRegisterData: () => void;
  getMe: () => Promise<void>;
  logout: () => Promise<void>;
  getTopArtist: () => Promise<void>;
  getTopTrack: () => Promise<void>;
}

export const useMeStore = create<MeStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      me: null,
      registerData: null,
      topArtist: null,
      topTrack: null,

      setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
      setRegisterData: (data) => set({ registerData: data }),
      clearRegisterData: () => set({ registerData: null }),
      getMe: async () => {
        const response = await apiGetMe();
        if (response.data.success) set({ me: response.data.user });
        else set({ me: null, isAuthenticated: false });
      },
      logout: async() => {
        const response = await apiLogout();
        if (response.status === 204){
          set({ isAuthenticated: false, me: null })
        };      
      },
      getTopArtist: async () => {
        const response = await apiGetTop("artists");
        if (response.status === 200) set({ topArtist: { items: response.data.items, next: response.data.pagination.next } });
      },
      getTopTrack: async () => {
        const response = await apiGetTop("tracks");
        if (response.status === 200) set({ topTrack: { items: response.data.items, next: response.data.pagination.next } });
      },
    }),
    {
      name: "hethereal/me",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ isAuthenticated: state.isAuthenticated }),
    }
  )
);
