import { apiGetRecentlyPlayed } from "@/apis/player";
import { Song } from "@/utils/types";
import { create } from "zustand";

interface PlayerStoreState {
  currentSong: Song | null;
  isPlaying: boolean;
  queue: Song[];
  currentIndex: number;
  isRepeat: boolean;
  isShuffle: boolean;

  playItem: (songs: Song[], startIndex?: number) => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrevious: () => void;
  toggleRepeat: () => void;
  toggleShuffle: () => void;
  shuffleQueue: () => void;
  fetchRecentlyPlayed: () => Promise<void>;
}

export const usePlayerStore = create<PlayerStoreState>()((set, get) => ({
  currentSong: null,
  isPlaying: false,
  queue: [],
  currentIndex: -1,
  isRepeat: false,
  isShuffle: false,

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
        isPlaying: true,
      });
    } else {
      set({
        isPlaying: false,
      });
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
        isPlaying: true,
      });
    } else {
      set({
        isPlaying: false,
      });
    }
  },
  toggleRepeat: () => {
    set({ isRepeat: !get().isRepeat });
  },

  toggleShuffle: () => {
    const isShuffle = !get().isShuffle;
    set({ isShuffle });
    if (isShuffle) {
      get().shuffleQueue();
    }
  },
  shuffleQueue: () => {
    const { queue, currentIndex } = get();
    if (queue.length <= 1) return;

    // Create a copy of the queue without the current song
    const queueCopy = [...queue];
    const currentSongItem = queueCopy.splice(currentIndex, 1)[0];

    // Fisher-Yates shuffle algorithm
    for (let i = queueCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [queueCopy[i], queueCopy[j]] = [queueCopy[j], queueCopy[i]];
    }

    // Put current song back at the beginning
    queueCopy.unshift(currentSongItem);

    set({
      queue: queueCopy,
      currentIndex: 0,
      currentSong: currentSongItem,
    });
  },
  fetchRecentlyPlayed: async () => {
    // Only fetch if queue is empty
    if (get().queue.length > 0) return;

    const response = await apiGetRecentlyPlayed();
    if (response.status === 200 && response.data.items) {
      const songs = response.data.items[0].track.songs;
      const song = response.data.items[0].track.songs[0];

      set({
        queue: songs,
        currentSong: song,
        currentIndex: 0,
      });
    }
  },
}));
