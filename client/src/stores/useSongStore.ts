import { apiLikeSong, apiUnlikeSong } from "@/apis/song";
import { create } from "zustand";

interface SongStoreState {
  isLoading: boolean;
  error: string | null;

  addLikedSong: (songId: string) => void;
  removeLikedSong: (songId: string) => void;
}

export const useSongStore = create<SongStoreState>((set) => ({
  isLoading: false,
  error: null,

  addLikedSong: async (songId: string) => {
    set({ isLoading: true, error: null });
    try {
      await apiLikeSong(songId);
      set({ isLoading: false, error: null });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to add to liked song",
        isLoading: false,
      });
    }
  },
  removeLikedSong: async (songId: string) => {
    set({ isLoading: true, error: null });
    try {
      await apiUnlikeSong(songId);
      set({ isLoading: false, error: null });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to remove from liked song",
        isLoading: false,
      });
    }
  },
}));