import { apiGetAlbumById, apiGetAllAlbumsByArtist, apiGetNewReleases } from "@/apis/album";
import { Album } from "@/utils/types";
import { create } from "zustand";

interface AlbumStoreState {
  albums: Album[];
  albumsByArtist: Album[];
  currentAlbum: Album | null;
  getAlbums: () => Promise<void>;
  getAlbumById: (id: string) => Promise<void>;
  getAllAlbumsByArtist: (id: string) => Promise<void>;
}

export const useAlbumStore = create<AlbumStoreState>()((set) => ({
  albums: [],
  currentAlbum: null,
  albumsByArtist: [],
  getAlbums: async () => {
    const response = await apiGetNewReleases();
    if (response.status === 200){
      set({ albums: response.data });
    }
  },
  getAlbumById: async (id: string) => {
    const response = await apiGetAlbumById(id);
    if (response.status === 200){
      set({ currentAlbum: response.data });
    }
  },
  getAllAlbumsByArtist: async (id: string) => {
    const response = await apiGetAllAlbumsByArtist(id);
    if (response.status === 200){
      set({ albumsByArtist: response.data });
    }
  }
}))