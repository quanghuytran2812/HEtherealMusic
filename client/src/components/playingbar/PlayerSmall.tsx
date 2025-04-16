import {
  ellipsis_one_line,
  img_cover,
  img_holder,
  player_sm,
  track_banner,
  track_info,
  track_title,
  track_view_btn,
} from "@/lib/classname";
import { cn } from "@/lib/utils";
import { PlayButton } from "@/components/play_button";
import { Button } from "../ui/button";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { useMemo } from "react";

interface PlayerSmallProps {
  onViewToggle: () => void;
}
const PlayerSmall = ({ onViewToggle }: PlayerSmallProps) => {
  const { currentSong } = usePlayerStore();

  // Memoize artist names
  const artistNameStr = useMemo(() => {
    return currentSong?.artists?.map((artist) => artist.name).join(", ") || "";
  }, [currentSong]);

  return (
    <div
      className={cn(
        player_sm,
        "md:hidden",
        currentSong ? "" : "hidden"
      )}
      style={{ "--state-layer-bg": "#C0C9C1" } as React.CSSProperties}
    >
      <div className={cn(track_info)}>
        {currentSong && (
          <>
            <figure className={cn(img_holder, track_banner)}>
              <img
                src={currentSong.image_url}
                alt={currentSong.title}
                className={cn(img_cover)}
                loading="lazy"
                decoding="async"
              />
            </figure>

            <div className="min-w-0">
              <h3
                className={cn(
                  ellipsis_one_line,
                  track_title,
                  "text-sm font-bold tracking-[0.10px]"
                )}
                data-track-name
              >
                {currentSong.title}
              </h3>
              <p
                className={cn(
                  ellipsis_one_line,
                  "track-text text-xs opacity-70 tracking-[0.10px]"
                )}
                data-track-artist
              >
                {artistNameStr}
              </p>
            </div>
          </>
        )}
      </div>

      {currentSong && (
        <PlayButton
          songId={currentSong._id}
          sizeIcon={16}
          fillColor="#C0C9C1"
        />
      )}

      <Button
        onClick={onViewToggle}
        className={cn(track_view_btn, "state-layer")}
        aria-label="Now playing view"
      ></Button>
    </div>
  );
};

export default PlayerSmall;
