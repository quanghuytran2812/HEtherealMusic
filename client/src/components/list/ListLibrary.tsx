import {
  body_medium,
  body_small,
  ellipsis_one_line,
  img_cover,
  img_holder,
  list_item,
} from "@/lib/classname";
import { cn } from "@/lib/utils";
import { Artist, LibraryItem } from "@/utils/types";
import { Link } from "react-router-dom";
import { PlayButton } from "@/components/play_button";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { useMemo } from "react";
import { Volume2 } from "lucide-react";

interface ListLibraryProps {
  item: LibraryItem;
  index: number;
}
const ListLibrary = ({ item, index }: ListLibraryProps) => {
  const { isPlaying, currentSong } = usePlayerStore();

  const songId = useMemo(() => {
    const foundSong = item.track.songs?.find(
      (song) => song === currentSong?._id
    );
    return foundSong || undefined; // Return the found song ID or undefined if not found
  }, [item.track.songs, currentSong]);

  const isCurrentSong = useMemo(
    () => item.track.songs?.some((song) => song === currentSong?._id),
    [item.track.songs, currentSong]
  );
  return (
    <div className={cn(list_item, "group")} key={index}>
      <div className={cn("relative")}>
        <figure
          className={cn(
            img_holder,
            "size-12",
            item.type == "User" ? "rounded-full" : "rounded"
          )}
        >
          <img
            src={item.track.image_url || item.track.imageUrl![0]}
            loading="lazy"
            decoding="async"
            width={48}
            height={48}
            alt={item.track.title || item.track.name || "Track"}
            className={cn(img_cover, "group-hover:opacity-10")}
          />
          <PlayButton
            songId={songId}
            itemId={item.track._id}
            fillColor="white"
            classButton="absolute text-white top-0 left-0 z-50 opacity-0 invisible group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 group-hover:visible"
          />
        </figure>
      </div>

      <div className="item-content cursor-pointer">
        <div className="relative">
          <p
            className={cn(
              body_medium,
              "text-[#fff]",
              ellipsis_one_line,
              isCurrentSong && isPlaying && "text-[#12E29A]"
            )}
          >
            {item.track.title || item.track.name}
          </p>

          <p className={cn(body_small, "text-[#b3b3b3]", ellipsis_one_line)}>
            {item.type == "User" ? "Artist" : item.type}
            {item.type == "Album" &&
              Array.isArray(item.track.artists) &&
              item.track.artists.length > 0 &&
              " • " +
                item.track.artists
                  .map((artist: Artist) => artist.name)
                  .join(", ")}
            {item.type === "Playlist" &&
              (item.track?.type === "likedSongs"
                ? ` • ${item.track.songs?.length ?? 0} song${
                    item.track.songs?.length !== 1 ? "s" : ""
                  }`
                : item.track?.users?.name && ` • ${item.track.users.name}`)}
          </p>
        </div>
      </div>

      {isCurrentSong && isPlaying && (
        <Volume2 size={16} className="text-[#12E29A]" />
      )}
      <Link
        to={
          item.type == "Playlist"
            ? `/playlist/${item.track._id}`
            : item.type == "Album"
            ? `/album/${item.track._id}`
            : `/artist/${item.track._id}`
        }
        className={cn("absolute inset-0")}
      ></Link>
    </div>
  );
};

export default ListLibrary;
