/* eslint-disable @typescript-eslint/no-explicit-any */
import { ListItem } from "@/components/list";
import { PlayButton } from "@/components/play_button";
import IconButton from "@/components/top_bar/icon_btn/IconButton";
import {
  body_small,
  col,
  detail_content,
  detail_header,
  detail_text,
  detail_title,
  duration_col,
  headline_large,
  img_cover,
  img_holder,
  label_large,
  list_header,
  number_col,
  separator,
} from "@/lib/classname";
import { cn } from "@/lib/utils";
import { Song } from "@/utils/types";
import { Check, CirclePlus, Clock, Ellipsis } from "lucide-react";
import { useMemo } from "react";
interface ListAlbumItemProps {
  album: any;
  libraryMe: any;
  isLibraryLoading: boolean;
  addToLibrary: (id: string) => Promise<void>;
  removeFromLibrary: (id: string) => Promise<void>;
}

const ListAlbumItem = ({
  album,
  libraryMe,
  isLibraryLoading,
  addToLibrary,
  removeFromLibrary,
}: ListAlbumItemProps) => {
  const isAlbumInLibrary = useMemo(() => {
    return (
      libraryMe?.items?.some(
        (item: any) => item.type === "Album" && item.track._id === album._id
      ) || false
    );
  }, [libraryMe, album._id]);

  const handleLibraryToggle = async () => {
    if (!album._id) return;

    if (isAlbumInLibrary) {
      await removeFromLibrary(album._id);
    } else {
      await addToLibrary(album._id);
    }
  };

  const formatReleaseYear = (dateString?: string) => {
    return dateString ? new Date(dateString).getFullYear() : "N/A";
  };

  return (
    <div className="px-3" key={album._id}>
    <section className={cn(detail_header, "mt-8")}>
      <figure className={cn(img_holder, "size-40 rounded-lg flex-shrink-0")}>
        <img
          src={album.image_url}
          alt={album.title}
          width={136}
          height={136}
          className={cn(img_cover)}
          loading="lazy"
          decoding="async"
        />
      </figure>

      <div className={cn(detail_content)}>
        <h2 className={cn(headline_large, detail_title)}>
          {album.title}
        </h2>

        <div className={cn(detail_text, "flex-wrap has-separator")}>
          <p className={cn(label_large, "capitalize")}>
            {album.type}
          </p>
          <span className={cn(separator)}></span>
          <p className={cn(label_large)}>
            {formatReleaseYear(album?.createdAt)}
          </p>
          <span className={cn(separator)}></span>
          <p className={cn(label_large)}>
            {album.songs?.length ?? 0} songs
          </p>
        </div>

        <div className={cn("isolate flex items-center gap-2")}>
          <PlayButton
            songId={album.songs?.[0]?._id}
            itemId={album._id}
            classButton="size-8 text-[#000] bg-white hover:scale-105 relative"
            sizeIcon={16}
            fillColor="#000"
          />
          <IconButton
            icon={
              isAlbumInLibrary ? (
                <Check
                  size={16}
                  className="text-black"
                  strokeWidth={4}
                />
              ) : (
                <CirclePlus size={20} />
              )
            }
            classSpan={`hover:scale-105 ${
              isAlbumInLibrary
                ? "size-5 bg-[#12E29A] rounded-full"
                : "hover:text-white"
            }`}
            onClick={handleLibraryToggle}
            disabled={isLibraryLoading}
          />
          <IconButton icon={<Ellipsis size={24} />} />
        </div>
      </div>
    </section>

    <div className={cn(list_header)}>
      <div className={cn(body_small, number_col)}>#</div>
      <div className={cn(body_small, col)}>Title</div>
      <div className={cn(duration_col)}>
        <Clock size={16} />
      </div>
    </div>

    <div className="list">
      {album.songs?.length ? (
        album.songs.map((song: Song, index: number) => (
          <ListItem
            key={song._id}
            track={{
              _id: song._id,
              title: song.title,
              artists: song.artists,
              duration: song.duration,
              trackNumber: index + 1,
              itemId: album._id,
            }}
          />
        ))
      ) : (
        <p
          className={cn(
            body_small,
            "py-4 text-center text-muted-foreground"
          )}
        >
          No songs available
        </p>
      )}
    </div>
  </div>
  );
};

export default ListAlbumItem;
