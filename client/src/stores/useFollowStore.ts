import {
  apiFollow,
  apiGetArtistsFollowedByUser,
  apiGetRelatedArtists,
  apiUnfollow,
} from "@/apis/follow";
import { Artist, TopArtist } from "@/utils/types";
import { create } from "zustand";

interface FollowStoreState {
  artistsFollowed: TopArtist | null;
  relatedArtists: TopArtist | null;
  isLoading: boolean;
  error: string | null;

  fetchArtistsFollowedByUser: () => Promise<void>;
  fetchArtistsRelated: (id: string) => Promise<void>;
  followUser: (
    artistId: string,
    artistData: Omit<Artist, "_id">,
    onSuccess?: () => void
  ) => Promise<void>;
  unfollowUser: (
    artistId: string,
    onSuccess?: () => void
  ) => Promise<void>;
}

export const useFollowStore = create<FollowStoreState>()((set) => ({
  artistsFollowed: null,
  relatedArtists: null,
  isLoading: false,
  error: null,

  fetchArtistsFollowedByUser: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiGetArtistsFollowedByUser();
      if (response.status === 200) {
        set({ artistsFollowed: response.data, isLoading: false, error: null });
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch followed artists",
        isLoading: false,
      });
    }
  },

  fetchArtistsRelated: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiGetRelatedArtists(id);
      if (response.status === 200) {
        set({ relatedArtists: response.data, isLoading: false, error: null });
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch related artists",
        isLoading: false,
      });
    }
  },

  followUser: async (artistId: string, artistData: Omit<Artist, "_id">, onSuccess?: () => void) => {
    set({ isLoading: true, error: null });
    try {
      await apiFollow(artistId);
      set((state) => {
        if (!state.artistsFollowed) {
          return {
            artistsFollowed: {
              items: [{ _id: artistId, ...artistData }],
              next: false,
            },
            isLoading: false,
            error: null,
          };
        }
        return {
          artistsFollowed: {
            ...state.artistsFollowed,
            items: [
              ...state.artistsFollowed.items,
              { _id: artistId, ...artistData },
            ],
          },
          isLoading: false,
          error: null,
        };
      });
      onSuccess?.();
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to follow user",
        isLoading: false,
      });
    }
  },

  unfollowUser: async (artistId: string, onSuccess?: () => void) => {
    set({ isLoading: true, error: null });
    try {
      await apiUnfollow(artistId);
      set((state) => {
        if (!state.artistsFollowed) {
          return {
            ...state,
            isLoading: false,
            error: null,
          };
        }
        return {
          artistsFollowed: {
            ...state.artistsFollowed,
            items: state.artistsFollowed.items.filter(
              (artist) => artist._id !== artistId
            ),
          },
          isLoading: false,
          error: null,
        };
      });
      onSuccess?.();
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to unfollow user",
        isLoading: false,
      });
    }
  },
}));