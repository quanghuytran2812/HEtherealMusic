import { CardMore } from "@/components/cards";
import { ListItem } from "@/components/list";
import { PlayButton } from "@/components/play_button";
import IconButton from "@/components/top_bar/icon_btn/IconButton";
import {
  body_large,
  body_medium,
  col,
  copyright,
  detail_actions,
  detail_banner,
  detail_content,
  detail_header,
  detail_subtitle,
  detail_text,
  detail_title,
  divider,
  duration_col,
  headline_large,
  img_cover,
  img_holder,
  label_large,
  label_small,
  list_header,
  number_col,
  section_title,
  separator,
  slider,
  slider_inner,
  title_large,
  title_wrapper,
} from "@/lib/classname";
import { cn } from "@/lib/utils";
import { useLibraryStore } from "@/stores/useLibraryStore";
import { useMusicStore } from "@/stores/useMusicStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { convertSecondsToDuration } from "@/utils/format";
import { Check, CirclePlus, Clock, Ellipsis } from "lucide-react";
import React, { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";

const AlbumPage = () => {
  const { albumId } = useParams();
  const { currentSong } = usePlayerStore();
  const { currentAlbum, getAlbumById, albumsByArtist, getAllAlbumsByArtist } =
    useMusicStore();
  const {
    libraryMe,
    isLoading: isLibraryLoading,
    addToLibrary,
    removeFromLibrary,
  } = useLibraryStore();

  useEffect(() => {
    if (albumId) {
      getAlbumById(albumId);
    }
  }, [albumId, getAlbumById]);

  useEffect(() => {
    if (currentAlbum?.artists?.[0]?._id) {
      getAllAlbumsByArtist(currentAlbum.artists[0]._id);
    }
  }, [currentAlbum?.artists, getAllAlbumsByArtist]);

  // Check if album is in library
  const isAlbumInLibrary = useMemo(() => {
    return (
      libraryMe?.items?.some((item) => item.type === "Album" && item.track._id === currentAlbum?._id) || false
    );
  }, [libraryMe, currentAlbum]);

  const handleLibraryToggle = async () => {
    if (!currentAlbum?._id) return;

    if (isAlbumInLibrary) {
      await removeFromLibrary(currentAlbum._id);
    } else {
      await addToLibrary(currentAlbum._id);
    }
  };

  const songId = useMemo(() => {
    const foundSong = currentAlbum?.songs?.find(
      (song) => song._id === currentSong?._id
    );
    return foundSong
      ? foundSong._id
      : currentAlbum?.songs && currentAlbum?.songs[0]?._id; // Return the found song ID or undefined if not found
  }, [currentAlbum, currentSong]);

  // Sum the durations of all songs
  const totalSeconds =
    currentAlbum?.songs?.reduce((sum, song) => sum + song.duration, 0) || 0; // Fallback to 0 if songs is undefined
  // Convert total seconds to a readable format
  const totalDuration = convertSecondsToDuration(totalSeconds);

  return (
    <div className="relative pt-10 md:pt-0 md:rounded-lg md:overflow-hidden">
      <div
        className="absolute inset-0 h-[450px] bg-no-repeat bg-cover opacity-50"
        style={{
          backgroundImage: `url(${currentAlbum?.image_url})`,
          backgroundSize: "100%",
          backgroundPosition: "top",
        }}
      />
      <div className="absolute inset-0 h-[450px] bg-gradient-to-b from-transparent to-[#191C1A] backdrop-blur-[150px]" />
      {/* ALBUM DETAIL */}
      <section className={cn(detail_header)}>
        <figure className={cn(img_holder, detail_banner)}>
          <img
            src={currentAlbum?.image_url}
            alt={currentAlbum?.title}
            width={300}
            height={300}
            className={cn(img_cover)}
            loading="lazy"
            decoding="async"
          />
        </figure>

        <div className={cn(detail_content)}>
          <p className={cn(label_large, detail_subtitle)}>
            {currentAlbum?.type}
          </p>

          <h2 className={cn(headline_large, detail_title)}>
            {currentAlbum?.title}
          </h2>

          <div className={cn(detail_text, "flex-wrap has-separator")}>
            {currentAlbum?.artists?.map((artist) => (
              <React.Fragment key={artist._id}>
                <Link
                  to={`/artist/${artist._id}`}
                  key={artist._id}
                  className={cn(
                    label_large,
                    "text-white font-bold hover:underline"
                  )}
                >
                  {artist.name}
                </Link>
                <span className={cn(separator)}></span>
              </React.Fragment>
            ))}

            <p className={cn(label_large)}>
              {currentAlbum?.createdAt
                ? new Date(currentAlbum.createdAt).getFullYear()
                : "N/A"}
            </p>
            <span className={cn(separator)}></span>

            <p className={cn(label_large)}>
              {currentAlbum?.songs?.length} songs, {totalDuration}
            </p>
          </div>
        </div>
      </section>

      <div className="relative p-4">
        <div className="absolute inset-0 h-full bg-gradient-to-b from-transparent to-[#000] backdrop-blur-[150px]" />
        {/* ALBUM TRACKS */}
        <section className={cn("list-container relative")}>
          <div className={cn(detail_actions)}>
            <PlayButton
              songId={songId}
              itemId={currentAlbum?._id}
              classButton="text-[#003823] bg-[#12E29A] hover:scale-105 relative"
              fillColor="#000"
            />
            <IconButton
              icon={
                isAlbumInLibrary ? (
                  <Check size={16} className="text-black" strokeWidth={4}/>
                ) : (
                  <CirclePlus size={24} />
                )
              }
              classSpan={`hover:scale-105 ${isAlbumInLibrary ? "size-7 bg-[#12E29A] rounded-full" : "hover:text-white"}`}
              onClick={handleLibraryToggle}
              disabled={isLibraryLoading}
            />
            <IconButton icon={<Ellipsis size={24} />} />
          </div>

          <div className={cn(divider, "md:hidden")}></div>

          <div className={cn(list_header)}>
            <div className={cn(body_large, number_col)}>#</div>
            <div className={cn(body_large, col)}>Title</div>
            <div className={cn(duration_col)}>
              <span className={cn("material-symbols-rounded")}>
                <Clock size={16} />
              </span>
            </div>
          </div>

          <div className="list">
            {currentAlbum?.songs?.map((song, i) => (
              <ListItem
                key={song._id}
                track={{
                  _id: song._id,
                  title: song.title,
                  artists: song.artists,
                  duration: song.duration,
                  trackNumber: i + 1,
                  itemId: currentAlbum?._id,
                }}
              />
            ))}
          </div>
        </section>

        {/* ALBUM COPYRIGHT */}
        <section className={cn(copyright)}>
          <p className={cn(body_medium)}>
            {currentAlbum?.createdAt
              ? new Date(currentAlbum.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "N/A"}
          </p>

          <p className={cn(label_small)}>
            &copy;{" "}
            {currentAlbum?.createdAt
              ? new Date(currentAlbum.createdAt).getFullYear()
              : "N/A"}{" "}
            {currentAlbum?.title}
          </p>
          <p className={cn(label_small)}>
            &copy;{" "}
            {currentAlbum?.createdAt
              ? new Date(currentAlbum.createdAt).getFullYear()
              : "N/A"}{" "}
            {currentAlbum?.title}
          </p>
        </section>

        {/* MORE BY ARTIST */}
        {albumsByArtist.length > 0 && (
          <section className="mt-4 isolate">
            <div className={cn(title_wrapper)}>
              <h2 className={cn(title_large, section_title)}>
                More by {currentAlbum?.artists?.[0]?.name || "N/A"}
              </h2>

              <Link to={`/artist`} className="btn btn-link">
                <span
                  className={cn(label_large, "hover:underline text-[#C0C9C1]")}
                >
                  See discography
                </span>
              </Link>
            </div>

            <div className={cn(slider)}>
              <div className={cn(slider_inner)}>
                {albumsByArtist.map((album) => {
                  const text = album.createdAt
                    ? new Date(album.createdAt).getFullYear()
                    : "Unknown Year";
                  return (
                    <CardMore
                      key={album._id}
                      item={{
                        _id: album._id,
                        title: album.title,
                        text: text.toString(),
                        link: `/album/${album._id}`,
                        image_url: album.image_url,
                        songs: album.songs
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default AlbumPage;
