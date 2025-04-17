import { usePlayerStore } from "@/stores/usePlayerStore";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const prevSongRef = useRef<string | null>(null);
  const [isAudioReady, setIsAudioReady] = useState(false);
  const documentTitle = useMemo(() => document.title, []);
  const { currentSong, isPlaying, playNext, fetchRecentlyPlayed, queue, isRepeat } = usePlayerStore();

  useEffect(() => {
    // Only fetch recently played if the queue is empty
    if (queue.length === 0) {
      fetchRecentlyPlayed();
    }
  }, [queue.length, fetchRecentlyPlayed]);

  // Memoize artist names
  const artistNameStr = useMemo(() => {
    return currentSong?.artists?.map((artist) => artist.name).join(", ") || "";
  }, [currentSong]);

  // Handle play/pause logic
  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    if (isPlaying && isAudioReady) {
      audio.play()
    } else {
      audio.pause();
    }
  }, [isPlaying, isAudioReady]);

  const handleEnded = useCallback(() => {    
    if (isRepeat) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
      usePlayerStore.setState({ isPlaying: true });
    } else {
      playNext();
    }
  }, [isRepeat, playNext]);
  // Handle song ends
  useEffect(() => {
    const audio = audioRef.current;

    audio?.addEventListener("ended", handleEnded);

    return () => {
      audio?.removeEventListener("ended", handleEnded);
    };
  }, [handleEnded]);

  // Handle song changes
  useEffect(() => {
    if (!audioRef.current || !currentSong) return;

    const audio = audioRef.current;

    // Check if this is actually a new song
    const isSongChange = prevSongRef.current !== currentSong.audio_url;
    if (isSongChange) {
      setIsAudioReady(false); // Reset audio readiness flag
      audio.src = currentSong.audio_url;
      audio.currentTime = 0; // Reset playback position
      prevSongRef.current = currentSong.audio_url;

      // Wait for the audio to be ready before playing
      const handleCanPlay = () => {
        setIsAudioReady(true);
        if (isPlaying) {
          audio.play()
        }
      };

      audio.addEventListener("canplay", handleCanPlay);

      // Cleanup event listener
      return () => {
        audio.removeEventListener("canplay", handleCanPlay);
      };
    }
  }, [currentSong, isPlaying]);

  // Change the document title
  useEffect(() => {
    const newTitle =
      isPlaying && currentSong
        ? `${currentSong.title} • ${artistNameStr}`
        : documentTitle;
    document.title = newTitle;

    // Reset the title on cleanup
    return () => {
      document.title = documentTitle;
    };
  }, [currentSong, isPlaying, artistNameStr, documentTitle]);

  return <audio ref={audioRef} />;
};

export default AudioPlayer;