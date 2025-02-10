import { apiLogout } from "@/apis/auth";
import { apiGetMe } from "@/apis/user";
import { registerData, User } from "@/utils/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface MeStore {
  isAuthenticated: boolean;
  me: User | null;
  registerData: registerData | null;

  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setRegisterData: (data: registerData) => void;
  clearRegisterData: () => void;
  getMe: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useMeStore = create<MeStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      me: null,
      registerData: null,

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
    }),
    {
      name: "hethereal/me",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ isAuthenticated: state.isAuthenticated }),
    }
  )
);
