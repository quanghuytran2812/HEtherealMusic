import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { apiLogout } from "@/apis/auth";
import { apiGetMe, apiGetTop, apiGetUserById } from "@/apis/user";
import type { registerData, TopArtist, TopTrack, User } from "@/utils/types";

type TopType = "artists" | "tracks";

interface MeStoreState {
  isAuthenticated: boolean;
  me: User | null;
  registerData: registerData | null;
  topArtist: TopArtist | null;
  topTrack: TopTrack | null;
  userInfo: User | null;
  isLoading: boolean;
  error: string | null;
}

interface MeStoreActions {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setRegisterData: (data: registerData) => void;
  clearRegisterData: () => void;
  getMe: () => Promise<void>;
  logout: () => Promise<void>;
  getTop: (type: TopType) => Promise<void>;
  getUserById: (id: string) => Promise<void>;
  clearError: () => void;
}

type MeStore = MeStoreState & MeStoreActions;

const initialState: MeStoreState = {
  isAuthenticated: false,
  me: null,
  registerData: null,
  topArtist: null,
  topTrack: null,
  userInfo: null,
  isLoading: false,
  error: null,
};

export const useMeStore = create<MeStore>()(
  persist(
    (set) => ({
      ...initialState,

      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      
      setRegisterData: (data) => set({ registerData: data }),
      
      clearRegisterData: () => set({ registerData: null }),
      
      getMe: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await apiGetMe();
          if (response.data.success) {
            set({ 
              me: response.data.user,
              isAuthenticated: true,
              isLoading: false 
            });
          } else {
            set({ 
              me: null, 
              isAuthenticated: false,
              isLoading: false 
            });
          }
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : "Failed to fetch user data",
            isLoading: false 
          });
        }
      },
      
      logout: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await apiLogout();
          if (response.status === 204) {
            set({ 
              isAuthenticated: false, 
              me: null,
              isLoading: false 
            });
          }
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : "Failed to logout",
            isLoading: false 
          });
        }
      },
      
      getTop: async (type) => {
        set({ isLoading: true, error: null });
        try {
          const response = await apiGetTop(type);
          if (response.status === 200) {
            set({ 
              [type === "artists" ? "topArtist" : "topTrack"]: {
                items: response.data.items,
                next: response.data.pagination.next
              },
              isLoading: false
            });
          }
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : `Failed to fetch top ${type}`,
            isLoading: false 
          });
        }
      },
      
      getUserById: async (id) => {
        set({ isLoading: true, error: null });
        try {
          const response = await apiGetUserById(id);
          if (response.status === 200) {
            set({ 
              userInfo: response.data,
              isLoading: false 
            });
          }
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : "Failed to fetch user info",
            isLoading: false 
          });
        }
      },
      
      clearError: () => set({ error: null }),
    }),
    {
      name: "hethereal/me",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        isAuthenticated: state.isAuthenticated
      }),
    }
  )
);