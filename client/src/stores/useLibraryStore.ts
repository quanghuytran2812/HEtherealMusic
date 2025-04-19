import { apiCreateLibrary, apiDeleteItemFromLibrary, apiGetLibraryForMe } from "@/apis/library";
import { apiLikeSong, apiUnlikeSong } from "@/apis/song";
import { Library } from "@/utils/types";
import { create } from "zustand";

interface LibraryStoreState {
  libraryMe: Library | null;
  isLoading: boolean;
  error: string | null;

  fetchLibraryMe: () => Promise<void>;
  addToLibrary: (trackId: string) => Promise<void>;
  removeFromLibrary: (trackId: string) => Promise<void>;
  addLikedSong: (songId: string) => Promise<void>;
  removeLikedSong: (songId: string) => Promise<void>;
}

export const useLibraryStore = create<LibraryStoreState>()((set) => ({
  libraryMe: null,
  isLoading: false,
  error: null,
  fetchLibraryMe: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiGetLibraryForMe();
      if (response.status === 200) {
        set({ libraryMe: response.data, isLoading: false, error: null });
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch library",
        isLoading: false,
      });
    }
  },
  addToLibrary: async (trackId: string) => {
    set({ isLoading: true, error: null });
    try {
      await apiCreateLibrary(trackId);
      await apiGetLibraryForMe().then(response => {
        if (response.status === 200) {
          set({ libraryMe: response.data, isLoading: false, error: null });
        }
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to add to library",
        isLoading: false,
      });
    }
  },

  removeFromLibrary: async (trackId: string) => {
    set({ isLoading: true, error: null });
    try {
      await apiDeleteItemFromLibrary(trackId);
      await apiGetLibraryForMe().then(response => {
        if (response.status === 200) {
          set({ libraryMe: response.data, isLoading: false, error: null });
        }
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to remove from library",
        isLoading: false,
      });
    }
  },

  addLikedSong: async (songId: string) => {
    set({ isLoading: true, error: null });
    try {
      await apiLikeSong(songId);
      await apiGetLibraryForMe().then(response => {
        if (response.status === 200) {
          set({ libraryMe: response.data, isLoading: false, error: null });
        }
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to add to library",
        isLoading: false,
      });
    }
  },

  removeLikedSong: async (songId: string) => {
    set({ isLoading: true, error: null });
    try {
      await apiUnlikeSong(songId);
      await apiGetLibraryForMe().then(response => {
        if (response.status === 200) {
          set({ libraryMe: response.data, isLoading: false, error: null });
        }
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to remove from library",
        isLoading: false,
      });
    }
  }
}))