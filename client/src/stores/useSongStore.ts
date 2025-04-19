import { apiGetRecommendedSongsByIds, apiGetSongById } from "@/apis/song";
import { Song } from "@/utils/types";
import { create } from "zustand";

interface SongStoreState {
  songById: Song | null;
  songRecommended: Song[] | null;
  isLoading: boolean;
  error: string | null;

  fetchSongById: (songId: string) => Promise<void>;
  fetchRecommendedSongs: (songId: string) => Promise<void>;
}

export const useSongStore = create<SongStoreState>((set) => ({
  isLoading: false,
  error: null,
  songById: null,
  songRecommended: null,

  fetchSongById: async (songId: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiGetSongById(songId);
      if (response.status === 200) {
        set({ songById: response.data, isLoading: false, error: null });
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch song",
        isLoading: false,
      });
    }
  },
  fetchRecommendedSongs: async (songId: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiGetRecommendedSongsByIds(songId);
      if (response.status === 200) {
        set({ songRecommended: response.data, isLoading: false, error: null });
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch song",
        isLoading: false,
      });
    }
  },
}));