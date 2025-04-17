import {
  body_medium,
  body_small,
  ellipsis_one_line,
  img_cover,
  img_holder,
  item_content,
  item_number,
  list_item,
} from "@/lib/classname";
import { cn } from "@/lib/utils";
import { msToTimeCode } from "@/utils/format";
import { Artist, Song } from "@/utils/types";
import { PlayButton } from "@/components/play_button";
import IconButton from "@/components/top_bar/icon_btn/IconButton";
import { Check, CirclePlus, Ellipsis } from "lucide-react";
import { MenuDropdown } from "@/components/menu";
import { MenuActions } from "../top_bar/menu/MenuItem";
import { Button } from "../ui/button";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { useMemo } from "react";
import { useSongStore } from "@/stores/useSongStore";
import { useLibraryStore } from "@/stores/useLibraryStore";
import { Link } from "react-router-dom";

interface itemProps {
  trackNumber?: number;
  _id: string;
  title: string;
  image_url?: string;
  artists?: Artist[];
  duration?: number;
  albumName?: string;
  itemId?: string;
}
interface ListItemProps {
  track: itemProps;
  arrayTracks?: Song[];
}
const ListItem = ({ track, arrayTracks = [] }: ListItemProps) => {
  const { isPlaying, currentSong } = usePlayerStore();
  const { libraryMe, fetchLibraryMe } = useLibraryStore();
  const {
    isLoading: isSongLoading,
    addLikedSong,
    removeLikedSong,
  } = useSongStore();
  const isCurrentSong = useMemo(
    () => track._id === currentSong?._id,
    [track, currentSong]
  );

  // Check if song is in library
  const isSongInLibrary = useMemo(() => {
    return (
      libraryMe?.items?.some(
        (item) =>
          item.type === "Playlist" &&
          item.track.songs?.find((song) => song.includes(track._id))
      ) || false
    );
  }, [libraryMe, track._id]);

  const handleToggleLikeSong = async () => {
    if (!track._id) return;
    if (isSongInLibrary) {
      removeLikedSong(track._id);
    } else {
      addLikedSong(track._id);
    }
    await fetchLibraryMe();
  };
  return (
    <div className={cn(list_item, "group")} key={track.trackNumber}>
      {/* Number column */}
      {track.trackNumber && (
        <div className={cn(item_number)}>
          <span className={cn(body_small, "group-hover:hidden size-4")}>
            {track.trackNumber}
          </span>
          {arrayTracks?.length > 0 ? (
            <PlayButton
              songId={track._id}
              arrSongs={arrayTracks}
              classButton="text-white hidden group-hover:block"
              sizeIcon={16}
              fillColor="#fff"
            />
          ) : (
            <PlayButton
              songId={track._id}
              itemId={track.itemId}
              classButton="text-white hidden group-hover:block"
              sizeIcon={16}
              fillColor="#fff"
            />
          )}
        </div>
      )}

      {track.image_url && (
        <div className={cn("item-banner relative")}>
          {/* Image column */}
          <figure
            className={cn(
              img_holder,
              "size-14 transition-opacity duration-100 ease-in-out md:size-10 rounded"
            )}
          >
            <img
              src={track.image_url}
              width={56}
              height={56}
              loading="lazy"
              decoding="async"
              alt={track.title}
              className={cn(img_cover)}
            />
          </figure>
        </div>
      )}

      <div
        className={cn(
          item_content,
          "md:grid-cols-[repeat(2,minmax(0,1fr)),42px]"
        )}
      >
        <div>
          <Link
            to={`/track/${track._id}`}
            className={cn(
              body_medium,
              ellipsis_one_line,
              "text-white font-bold hover:underline",
              isCurrentSong && isPlaying && "text-[#12E29A]"
            )}
          >
            {track.title}
          </Link>

          <p className={cn(body_small, "opacity-80", ellipsis_one_line)}>
            {track.artists?.map((artist) => artist.name).join(", ")}
          </p>
        </div>

        <p
          className={cn(
            body_small,
            "item_album opacity-80 hidden md:block w-fit"
          )}
        >
          {track.albumName}
        </p>

        <div className="flex items-center justify-end">
          <IconButton
            icon={
              isSongInLibrary ? (
                <Check
                  size={12}
                  className="text-black visible"
                  strokeWidth={4}
                />
              ) : (
                <CirclePlus
                  size={16}
                  className="invisible group-hover:visible"
                />
              )
            }
            variant="hidden md:block"
            classSpan={`size-4 hover:scale-105 ${
              isSongInLibrary ? "bg-[#12E29A] rounded-full" : "hover:text-white"
            }`}
            onClick={handleToggleLikeSong}
            disabled={isSongLoading}
          />
          {track.duration && (
            <p className={cn(body_small, "opacity-80 pointer-events-none")}>
              {msToTimeCode(track.duration)}
            </p>
          )}
          <MenuDropdown
            items={MenuActions}
            itemMenuTrigger={
              <Button
                className={cn(
                  "hidden md:block cursor-pointer hover:scale-105 hover:text-white"
                )}
              >
                <Ellipsis className="size-4 invisible group-hover:visible" />
              </Button>
            }
            classItems="flex-row-reverse justify-end text-[#FFFFFFE6] hover:text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default ListItem;
