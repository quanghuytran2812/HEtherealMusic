import { apiGetRecommendedSongsByIds, apiGetSongById, apiLikeSong, apiUnlikeSong } from "@/apis/song";
import { Song } from "@/utils/types";
import { create } from "zustand";

interface SongStoreState {
  songById: Song | null;
  songRecommended: Song[] | null;
  isLoading: boolean;
  error: string | null;

  addLikedSong: (songId: string) => void;
  removeLikedSong: (songId: string) => void;
  fetchSongById: (songId: string) => void;
  fetchRecommendedSongs: (songId: string) => void;
}

export const useSongStore = create<SongStoreState>((set) => ({
  isLoading: false,
  error: null,
  songById: null,
  songRecommended: null,

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