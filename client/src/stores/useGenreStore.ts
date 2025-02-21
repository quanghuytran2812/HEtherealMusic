import { apiGetAllGenres } from "@/apis/genre";
import { GenreItem } from "@/utils/types";
import { create } from "zustand";

interface GenreStoreState {
  genres: GenreItem[];
  getGenres: () => Promise<void>;
}

export const useGenreStore = create<GenreStoreState>()((set) => ({
  genres: [],
  getGenres: async () => {
    const response = await apiGetAllGenres();
    if (response.status === 200){
      set({ genres: response.data });
    }
  }
}))