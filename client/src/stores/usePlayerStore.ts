import { apiGetRecentlyPlayed } from "@/apis/player";
import { Song } from "@/utils/types";
import { create } from "zustand";

interface PlayerStoreState {
  currentSong: Song | null;
  isPlaying: boolean;
  queue: Song[];
  currentIndex: number;

  initializeQueue: (songs: Song[]) => void;
  playItem: (songs: Song[], startIndex?: number) => void;
  setCurrentSong: (songs: Song | null) => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrevious: () => void;
  fetchRecentlyPlayed: () => Promise<void>;
}

export const usePlayerStore = create<PlayerStoreState>()((set, get) => ({
  currentSong: null,
  isPlaying: false,
  queue: [],
  currentIndex: -1,

  initializeQueue: (songs: Song[]) => set({ 
    queue: songs,
    currentSong: get().currentSong || songs[0],
    currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex
  }),
  playItem: (songs: Song[], startIndex = 0) => {
    if (songs.length === 0) return;
    const song = songs[startIndex];
    set({
      queue: songs,
      currentSong: song,
      currentIndex: startIndex,
      isPlaying: true,
    });
  },
  setCurrentSong: (song: Song | null) => {
    if (!song) return;

    const songIndex = get().queue.findIndex((s) => s._id === song._id);

    set({
      currentSong: song,
      isPlaying: true,
      currentIndex: songIndex !== -1 ? songIndex : get().currentIndex,
    });
  },
  togglePlay: () => { 
    const willStartPlaying = !get().isPlaying;

    set({ isPlaying: willStartPlaying });
   },
  playNext: () => {
    const { currentIndex, queue } = get();
    const nextIndex = currentIndex + 1;

    if (nextIndex < queue.length) {
      const nextSong = queue[nextIndex];
      set({
        currentIndex: nextIndex,
        currentSong: nextSong,
        isPlaying: true
      })
    } else {
      set({
        isPlaying: false
      })
    }
  },
  playPrevious: () => {
    const { currentIndex, queue } = get();
    const prevIndex = currentIndex - 1;

    if (prevIndex >= 0) {
      const prevSong = queue[prevIndex];
      set({
        currentIndex: prevIndex,
        currentSong: prevSong,
        isPlaying: true
      })
    } else {
      set({
        isPlaying: false
      })
    }
  },
  fetchRecentlyPlayed: async () => {
    const response = await apiGetRecentlyPlayed();
    if (response.status === 200 && response.data.items) {
      const songs = response.data.items[0].track.songs;
      const song = response.data.items[0].track.songs[0];

      set({
        queue: songs,
        currentSong: song,
        currentIndex: 0
      });
    }
  }
}))
