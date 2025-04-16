import { apiSearch } from "@/apis/search";
import { SearchResult } from "@/utils/types";
import { create } from "zustand";

interface SearchStoreState {
  query: string;
  results: SearchResult;
  isLoading: boolean;
  error: string | null;
  search: (query: string, type?: string) => Promise<void>;
}

export const useSearchStore = create<SearchStoreState>((set) => ({
  query: '',
  results: {},
  isLoading: false,
  error: null,
  
  search: async (query, type) => {
    if (!query.trim()) {
      set({ results: {}, error: null, query: '' });
      return;
    }

    set({ isLoading: true, error: null, query });
    
    try {
      const endpoint = type 
        ? `?q=${encodeURIComponent(query)}&type=${type}`
        : `?q=${encodeURIComponent(query)}`;
      
      const response = await apiSearch(endpoint);
      
      set({ 
        results: response.data,
        isLoading: false,
        error: null,
        query
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Search failed',
        isLoading: false 
      });
    }
  }
}));