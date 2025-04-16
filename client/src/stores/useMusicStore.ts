import { create } from "zustand";
import { Artist, Song, User, Playlist, PlaylistData, Album, AlbumData } from "@/utils/types";
import { apiGetArtistTopTracks, apiGetUserById, apiRecommendArtists } from "@/apis/user";
import { apiGetPlaylistById, apiGetPopularPlaylists, apiGetTopPlaylists } from "@/apis/playlist";
import { apiGetAlbumById, apiGetAllAlbumsByArtist, apiGetNewReleases, apiRecommendAlbums } from "@/apis/album";

type StoreStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

interface MusicStoreState {
  // Artist state
  artistsRecommend: Artist[];
  artist: User | null;
  artistTopTracks: Song[];
  artistStatus: StoreStatus;
  artistError: string | null;
  
  // Playlist state
  playlistsPopular: Playlist[];
  playlistsTop: Playlist[];
  currentPlaylist: PlaylistData | null;
  playlistStatus: StoreStatus;
  playlistError: string | null;
  
  // Album state
  albumsReleases: Album[];
  albumsByArtist: Album[];
  recommendAlbums: Album[];
  currentAlbum: AlbumData | null;
  albumStatus: StoreStatus;
  albumError: string | null;

  // Artist actions
  getRecommendArtists: (artistIds: string) => Promise<void>;
  getArtistById: (id: string) => Promise<void>;
  getArtistTopTracks: (id: string) => Promise<void>;
  
  // Playlist actions
  getPopularPlaylists: () => Promise<void>;
  getTopPlaylists: () => Promise<void>;
  getPlaylistById: (id: string) => Promise<void>;
  
  // Album actions
  getNewAlbumReleases: () => Promise<void>;
  getAlbumById: (id: string) => Promise<void>;
  getAllAlbumsByArtist: (id: string) => Promise<void>;
  getRecommendAlbums: () => Promise<void>;

  // Utility actions
  resetArtistState: () => void;
  resetPlaylistState: () => void;
  resetAlbumState: () => void;
}

export const useMusicStore = create<MusicStoreState>((set) => ({
  // Initial artist state
  artistsRecommend: [],
  artist: null,
  artistTopTracks: [],
  artistStatus: 'idle',
  artistError: null,

  // Initial playlist state
  playlistsPopular: [],
  playlistsTop: [],
  currentPlaylist: null,
  playlistStatus: 'idle',
  playlistError: null,

  // Initial album state
  albumsReleases: [],
  albumsByArtist: [],
  recommendAlbums: [],
  currentAlbum: null,
  albumStatus: 'idle',
  albumError: null,

  // Artist actions
  getRecommendArtists: async (artistIds: string) => {
    set({ artistStatus: 'loading', artistError: null });
    try {
      const response = await apiRecommendArtists(artistIds);
      if (response.status === 200) {
        set({ 
          artistsRecommend: response.data,
          artistStatus: 'succeeded'
        });
      } else {
        set({ 
          artistStatus: 'failed',
          artistError: 'Failed to fetch recommended artists'
        });
      }
    } catch (error) {
      set({ 
        artistStatus: 'failed',
        artistError: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }
  },

  getArtistById: async (id: string) => {
    set({ artistStatus: 'loading', artistError: null });
    try {
      const response = await apiGetUserById(id);
      if (response.status === 200) {
        set({ 
          artist: response.data,
          artistStatus: 'succeeded'
        });
      } else {
        set({ 
          artistStatus: 'failed',
          artistError: 'Failed to fetch artist'
        });
      }
    } catch (error) {
      set({ 
        artistStatus: 'failed',
        artistError: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }
  },

  getArtistTopTracks: async (id: string) => {
    set({ artistStatus: 'loading', artistError: null });
    try {
      const response = await apiGetArtistTopTracks(id);
      if (response.status === 200) {
        set({ 
          artistTopTracks: response.data,
          artistStatus: 'succeeded'
        });
      } else {
        set({ 
          artistStatus: 'failed',
          artistError: 'Failed to fetch artist top tracks'
        });
      }
    } catch (error) {
      set({ 
        artistStatus: 'failed',
        artistError: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }
  },

  // Playlist actions
  getPopularPlaylists: async () => {
    set({ playlistStatus: 'loading', playlistError: null });
    try {
      const response = await apiGetPopularPlaylists();
      if (response.status === 200) {
        set({ 
          playlistsPopular: response.data,
          playlistStatus: 'succeeded'
        });
      } else {
        set({ 
          playlistStatus: 'failed',
          playlistError: 'Failed to fetch popular playlists'
        });
      }
    } catch (error) {
      set({ 
        playlistStatus: 'failed',
        playlistError: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }
  },

  getTopPlaylists: async () => {
    set({ playlistStatus: 'loading', playlistError: null });
    try {
      const response = await apiGetTopPlaylists();
      if (response.status === 200) {
        set({ 
          playlistsTop: response.data,
          playlistStatus: 'succeeded'
        });
      } else {
        set({ 
          playlistStatus: 'failed',
          playlistError: 'Failed to fetch top playlists'
        });
      }
    } catch (error) {
      set({ 
        playlistStatus: 'failed',
        playlistError: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }
  },

  getPlaylistById: async (id: string) => {
    set({ playlistStatus: 'loading', playlistError: null });
    try {
      const response = await apiGetPlaylistById(id);
      if (response.status === 200) {
        set({ 
          currentPlaylist: response.data,
          playlistStatus: 'succeeded'
        });
      } else {
        set({ 
          playlistStatus: 'failed',
          playlistError: 'Failed to fetch playlist'
        });
      }
    } catch (error) {
      set({ 
        playlistStatus: 'failed',
        playlistError: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }
  },

  // Album actions
  getNewAlbumReleases: async () => {
    set({ albumStatus: 'loading', albumError: null });
    try {
      const response = await apiGetNewReleases();
      if (response.status === 200) {
        set({ 
          albumsReleases: response.data,
          albumStatus: 'succeeded'
        });
      } else {
        set({ 
          albumStatus: 'failed',
          albumError: 'Failed to fetch new album releases'
        });
      }
    } catch (error) {
      set({ 
        albumStatus: 'failed',
        albumError: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }
  },

  getAlbumById: async (id: string) => {
    set({ albumStatus: 'loading', albumError: null });
    try {
      const response = await apiGetAlbumById(id);
      if (response.status === 200) {
        set({ 
          currentAlbum: response.data,
          albumStatus: 'succeeded'
        });
      } else {
        set({ 
          albumStatus: 'failed',
          albumError: 'Failed to fetch album'
        });
      }
    } catch (error) {
      set({ 
        albumStatus: 'failed',
        albumError: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }
  },

  getAllAlbumsByArtist: async (id: string) => {
    set({ albumStatus: 'loading', albumError: null });
    try {
      const response = await apiGetAllAlbumsByArtist(id);
      if (response.status === 200) {
        set({ 
          albumsByArtist: response.data,
          albumStatus: 'succeeded'
        });
      } else {
        set({ 
          albumStatus: 'failed',
          albumError: 'Failed to fetch artist albums'
        });
      }
    } catch (error) {
      set({ 
        albumStatus: 'failed',
        albumError: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }
  },

  getRecommendAlbums: async () => {
    set({ albumStatus: 'loading', albumError: null });
    try {
      const response = await apiRecommendAlbums();
      if (response.status === 200) {
        set({ 
          recommendAlbums: response.data,
          albumStatus: 'succeeded'
        });
      } else {
        set({ 
          albumStatus: 'failed',
          albumError: 'Failed to fetch recommended albums'
        });
      }
    } catch (error) {
      set({ 
        albumStatus: 'failed',
        albumError: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }
  },

  // Utility actions
  resetArtistState: () => set({ 
    artistsRecommend: [],
    artist: null,
    artistTopTracks: [],
    artistStatus: 'idle',
    artistError: null
  }),

  resetPlaylistState: () => set({ 
    playlistsPopular: [],
    playlistsTop: [],
    currentPlaylist: null,
    playlistStatus: 'idle',
    playlistError: null
  }),

  resetAlbumState: () => set({ 
    albumsReleases: [],
    albumsByArtist: [],
    recommendAlbums: [],
    currentAlbum: null,
    albumStatus: 'idle',
    albumError: null
  }),
}));