import {
  ellipsis_one_line,
  img_cover,
  img_holder,
  label_small,
  player_controller,
  player_lg,
  player_overlay,
  player_range,
  player_range_wrapper,
  player_volume,
  progress_label,
  track_title,
} from "@/lib/classname";
import { cn } from "@/lib/utils";
import IconButton from "@/components/top_bar/icon_btn/IconButton";
import { PlayButton } from "@/components/play_button";
import {
  Repeat,
  Repeat1,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume,
  Volume1,
  Volume2,
  VolumeX,
} from "lucide-react";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { formatTime } from "@/utils/format";

interface PlayerLargeProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}
const PlayerLarge = ({ open, setOpen }: PlayerLargeProps) => {
  const {
    currentSong,
    playNext,
    playPrevious,
    isRepeat,
    isShuffle,
    toggleRepeat,
    toggleShuffle,
  } = usePlayerStore();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.4);

  // Initialize audioRef with the existing <audio> element
  useEffect(() => {
    audioRef.current = document.querySelector("audio");
  }, []);

  // Memoize artist names
  const artistNameStr = useMemo(() => {
    return currentSong?.artists?.map((artist) => artist.name).join(", ") || "";
  }, [currentSong]);

  // Update current time
  const updateTime = useCallback(() => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  }, []);

  // Update duration
  const updateDuration = useCallback(() => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  }, []);

  // Handle song ended
  const handleEnded = useCallback(() => {
    playNext();
  }, [playNext]);

  // Handle progress bar change
  const handleProgressChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (audioRef.current) {
        const newTime = parseFloat(e.target.value);
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
      }
    },
    []
  );

  // Handle volume change
  const handleVolumeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newVolume = parseFloat(e.target.value);
      setVolume(newVolume);
      if (audioRef.current) {
        audioRef.current.volume = newVolume;
      }
    },
    []
  );

  // Update audio source when the song changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
    }
  }, []);

  // Add event listeners for time and duration updates
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener("timeupdate", updateTime);
      audio.addEventListener("loadedmetadata", updateDuration);
      audio.addEventListener("ended", handleEnded);
    }

    return () => {
      if (audio) {
        audio.removeEventListener("timeupdate", updateTime);
        audio.removeEventListener("loadedmetadata", updateDuration);
        audio.removeEventListener("ended", handleEnded);
      }
    };
  }, [updateTime, updateDuration, handleEnded]);

  return (
    <>
      <div
        className={cn(
          player_lg,
          "now-playing-bar",
          open ? "-translate-y-full visible" : "invisible"
        )}
      >
        <div className="handle w-full h-12 grid place-items-center md:hidden">
          <span className="handle-indicator w-8 h-1 rounded-full bg-[#C0C9C1] opacity-40"></span>
        </div>

        <div className={cn("flex items-center gap-6 min-w-0 md:gap-4")}>
          {currentSong && (
            <>
              <figure
                className={cn(
                  img_holder,
                  "w-20 h-20 rounded-lg flex-shrink-0 md:h-14 md:w-14"
                )}
              >
                <img
                  src={currentSong.image_url}
                  alt={currentSong.title}
                  className={cn(img_cover)}
                  height={80}
                  width={80}
                  loading="lazy"
                  decoding="async"
                />
              </figure>

              <div className="min-w-0">
                <h3
                  className={cn(
                    ellipsis_one_line,
                    track_title,
                    "text-sm font-normal tracking-[0.10px]"
                  )}
                  data-track-name
                >
                  {currentSong.title}
                </h3>
                <p
                  className={cn(
                    ellipsis_one_line,
                    "track-text text-xs font-normal opacity-70 tracking-[0.10px]"
                  )}
                  data-track-artist
                >
                  {Array.isArray(currentSong.artists) &&
                    currentSong.artists.length > 0 &&
                    artistNameStr}
                </p>
              </div>
            </>
          )}
        </div>

        <div className={cn(player_controller)}>
          <div className={cn(player_range_wrapper, "lg:max-w-[860px]")}>
            <span className={cn(label_small, progress_label, "text-left")}>
              {formatTime(currentTime)}
            </span>

            <input
              type="range"
              name="track-position"
              step={1}
              max={duration}
              value={currentTime}
              onChange={handleProgressChange}
              className={cn(
                player_range,
                "player-range -order-1 md:order-none"
              )}
            />

            <span className={cn(label_small, progress_label)}>
              {formatTime(duration)}
            </span>
          </div>

          <div className="player-control-btns flex items-center gap-3 justify-center">
            <IconButton
              icon={
                isShuffle ? (
                  <Shuffle
                    size={16}
                    className="text-[#12E29A]"
                  />
                ) : (
                  <Shuffle size={16} />
                )
              }
              variant="size-8 hover:text-white hover:scale-110"
              onClick={toggleShuffle}
              disabled={!currentSong}
            />
            <IconButton
              icon={<SkipBack size={16} />}
              variant="size-8 hover:text-white hover:scale-110"
              onClick={playPrevious}
              disabled={!currentSong}
            />
            {currentSong && (
              <PlayButton
                songId={currentSong._id}
                sizeIcon={16}
                fillColor="#003823"
                classButton="text-[#003823] bg-[#fff] md:size-8 hover:scale-110"
                classIcon="size-3"
              />
            )}
            <IconButton
              icon={<SkipForward size={16} />}
              variant="size-8 hover:text-white hover:scale-110"
              onClick={playNext}
              disabled={!currentSong}
            />
            <IconButton
              icon={
                isRepeat ? (
                  <Repeat1 size={16} className="text-[#12E29A]" />
                ) : (
                  <Repeat size={16} />
                )
              }
              variant="size-8 hover:text-white hover:scale-110"
              onClick={toggleRepeat}
              disabled={!currentSong}
            />
          </div>
        </div>

        <div className={cn(player_volume)}>
          <IconButton
            icon={
              volume > 0.66 ? (
                <Volume2 size={20} />
              ) : volume > 0.33 ? (
                <Volume1 size={20} />
              ) : volume > 0 ? (
                <Volume size={20} />
              ) : (
                <VolumeX size={20} />
              )
            }
            variant="size-8"
          />
          <input
            type="range"
            name="player-volume"
            min={0}
            max={1}
            step={0.1}
            value={volume}
            onChange={handleVolumeChange}
            className={cn(player_range, "player-range")}
            data-volume-progress
          />
        </div>
      </div>

      <div
        className={cn(
          player_overlay,
          "md:hidden",
          open ? "opacity-50 visible" : "opacity-0 invisible"
        )}
        onClick={() => setOpen(false)}
      ></div>
    </>
  );
};

export default PlayerLarge;
