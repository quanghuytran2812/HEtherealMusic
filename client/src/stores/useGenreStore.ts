import { apiGetAllGenres, apiGetGenreById } from "@/apis/genre";
import { GenreItem } from "@/utils/types";
import { create } from "zustand";

interface GenreStoreState {
  genres: GenreItem[];
  genreById: GenreItem | null;
  isLoading: boolean;
  error: string | null;

  getGenres: () => Promise<void>;
  fetchGenresById: (id: string) => Promise<void>;
}

export const useGenreStore = create<GenreStoreState>()((set) => ({
  genres: [],
  isLoading: false,
  error: null,
  genreById: null,
  getGenres: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await apiGetAllGenres();
      
      if (response.status === 200) {
        set({ genres: response.data, isLoading: false, error: null });
      } else {
        throw new Error('Failed to fetch genres');
      }
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        isLoading: false 
      });
    }
  },
  fetchGenresById: async (id: string) => {
    try {
      set({ isLoading: true, error: null });
      const response = await apiGetGenreById(id);
      
      if (response.status === 200) {
        set({ genreById: response.data, isLoading: false, error: null });
      } else {
        throw new Error('Failed to fetch genre by id');
      }
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        isLoading: false 
      });
    }
  }
}))