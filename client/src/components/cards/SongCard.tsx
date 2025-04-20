import { Song } from "@/utils/types";
import { cn } from "@/lib/utils";
import {
  body_medium,
  body_small,
  ellipsis_one_line,
  img_cover,
  img_holder,
} from "@/lib/classname";
import { PlayButton } from "../play_button";
import { Link } from "react-router-dom";

interface SongCardProps {
  song: Song;
  variant?: "default" | "queue" | "now-playing";
  arrSongs?: Song[];
}

const SongCard = ({ song, variant = "default", arrSongs = [] }: SongCardProps) => {
  return (
    <div
      className={cn(
        "flex items-center relative gap-3 p-2 group rounded-md hover:bg-white/5 transition-colors cursor-pointer",
        variant === "now-playing" && "bg-white/10"
      )}
    >
      <div className="flex-shrink-0 relative">
        <figure className={cn(img_holder, "size-12")}>
          <img
            src={song.image_url}
            alt={song.title}
            loading="lazy"
            decoding="async"
            width={48}
            height={48}
            className={cn(img_cover, "group-hover:opacity-10")}
          />
          <PlayButton
            songId={song._id}
            arrSongs={arrSongs}
            fillColor="white"
            classButton="absolute text-white top-0 left-0 z-50 opacity-0 invisible group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 group-hover:visible"
          />
        </figure>
      </div>
      <div className="min-w-0 flex-1 flex flex-col gap-[2px]">
        <h3
          className={cn(
            body_medium,
            variant === "now-playing" && "text-[#1ed760]",
            ellipsis_one_line
          )}
        >
          {song.title}
        </h3>
        <p className={cn(body_small, "text-[#b3b3b3]", ellipsis_one_line)}>
          {song.artists?.map((a) => a.name).join(", ")}
        </p>
      </div>
      <Link to={`/track/${song._id}`} className={cn("absolute inset-0")}></Link>
    </div>
  );
};

export default SongCard;
