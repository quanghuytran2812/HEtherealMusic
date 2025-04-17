import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { icon_btn, play_btn } from "@/lib/classname";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { apiCreateNewPlayer, apiGetRecentlyPlayed } from "@/apis/player";
import { Song } from "@/utils/types";
import { useCallback, useMemo } from "react";

interface PlayButtonProps {
  classButton?: string;
  classIcon?: string;
  fillColor?: string;
  sizeIcon?: number;
  songId?: string;
  itemId?: string;
  arrSongs?: Song[];
}

const PlayButton = ({
  classButton,
  classIcon,
  fillColor,
  sizeIcon,
  itemId,
  songId,
  arrSongs = []
}: PlayButtonProps) => {
  const { isPlaying, currentSong, togglePlay, playItem } = usePlayerStore();
  const isCurrentSong = useMemo(() => songId === currentSong?._id, [songId, currentSong]);

  const handleNewSongPlay = useCallback(async (itemId?: string) => {
    if (itemId) {
      await apiCreateNewPlayer(itemId);
      const response = await apiGetRecentlyPlayed();
      if (response.status === 200) {
        const songs = response.data.items[0].track.songs;
        const index = songs.findIndex((song: Song) => song._id === songId);
        playItem(songs, index >= 0 ? index : 0);
      }
    }else {
      const index = arrSongs.findIndex((song: Song) => song._id === songId);
      playItem(arrSongs, index >= 0 ? index : 0);
    }
  }, [playItem, songId, arrSongs]);

  const handleClickPlay = useCallback(async () => {
    if (!songId) return;

    if (isCurrentSong) {
      togglePlay();
    } else {
      await handleNewSongPlay(itemId);
    }
  }, [isCurrentSong, songId, itemId, togglePlay, handleNewSongPlay]);

  return (
    <Button
      onClick={handleClickPlay}
      className={cn(icon_btn, play_btn, `${classButton}`)}
      style={{ "--state-layer-bg": "#003823" } as React.CSSProperties}
      disabled={!songId}
    >
      {isPlaying && isCurrentSong ? (
        <span className={cn("material-symbols-rounded", classIcon)}>
          <Pause style={{ fill: `${fillColor}` }} size={sizeIcon} />
        </span>
      ) : (
        <span className={cn("material-symbols-rounded", classIcon)}>
          <Play style={{ fill: `${fillColor}` }} size={sizeIcon} />
        </span>
      )}
      <div className="state-layer rounded-full" />
    </Button>
  );
};

export default PlayButton;