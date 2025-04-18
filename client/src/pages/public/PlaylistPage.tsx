import { ListItem } from "@/components/list";
import { PlayButton } from "@/components/play_button";
import IconButton from "@/components/top_bar/icon_btn/IconButton";
import {
  album_col,
  body_large,
  body_medium,
  col,
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
  list_header,
  number_col,
  separator,
} from "@/lib/classname";
import { cn } from "@/lib/utils";
import { useLibraryStore } from "@/stores/useLibraryStore";
import { useMusicStore } from "@/stores/useMusicStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { convertSecondsToDuration } from "@/utils/format";
import { Check, CirclePlus, Clock, Ellipsis } from "lucide-react";
import React, { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";

const PlaylistPage = () => {
  const { playlistId } = useParams();
  const { currentSong } = usePlayerStore();
  const { currentPlaylist, getPlaylistById } = useMusicStore();
  const {
    libraryMe,
    isLoading: isLibraryLoading,
    addToLibrary,
    removeFromLibrary,
  } = useLibraryStore();

  // Fetch playlist data
  const fetchPlaylist = React.useCallback(async () => {
    if (playlistId) {
      await getPlaylistById(playlistId);
    }
  }, [playlistId, getPlaylistById]);

  useEffect(() => {
    fetchPlaylist();
  }, [fetchPlaylist]);

  const songId = useMemo(() => {
    const foundSong = currentPlaylist?.songs?.find(
      (song) => song._id === currentSong?._id
    );
    return foundSong
      ? foundSong._id
      : currentPlaylist?.songs && currentPlaylist?.songs[0]?._id;
  }, [currentPlaylist, currentSong]);

  // Check if playlist is in library
  const isPlaylistInLibrary = useMemo(() => {
    return (
      libraryMe?.items?.some(
        (item) =>
          item.type === "Playlist" && item.track._id === currentPlaylist?._id
      ) || false
    );
  }, [libraryMe, currentPlaylist]);

  const handleLibraryPlaylistToggle = async () => {
    if (!currentPlaylist?._id) return;

    if (isPlaylistInLibrary) {
      await removeFromLibrary(currentPlaylist._id);
    } else {
      await addToLibrary(currentPlaylist._id);
    }

    // Refresh playlist data after library operation
    await fetchPlaylist();
  };
  // Sum the durations of all songs
  const totalSeconds =
    currentPlaylist?.songs?.reduce((sum, song) => sum + song.duration, 0) || 0; // Fallback to 0 if songs is undefined
  // Convert total seconds to a readable format
  const totalDuration = convertSecondsToDuration(totalSeconds);

  return (
    <div className="relative pt-10 md:pt-0 md:rounded-lg md:overflow-hidden">
      <div
        className="absolute inset-0 h-full bg-no-repeat bg-cover opacity-50"
        style={{
          backgroundImage: `url(${currentPlaylist?.image_url})`,
          backgroundSize: "100%",
          backgroundPosition: "top",
        }}
      />
      <div className="absolute inset-0 h-full bg-gradient-to-b from-transparent to-[#191C1A] backdrop-blur-[150px]" />
      {/* PLAYLIST DETAIL */}
      <section className={cn(detail_header)}>
        <figure className={cn(img_holder, detail_banner)}>
          <img
            src={currentPlaylist?.image_url}
            alt={currentPlaylist?.title}
            width={200}
            height={200}
            loading="lazy"
            decoding="async"
            className={cn(img_cover)}
          />
        </figure>

        <div className={cn(detail_content)}>
          <p className={cn(label_large, detail_subtitle)}>Playlist</p>

          <h2 className={cn(headline_large, detail_title)}>
            {currentPlaylist?.title}
          </h2>

          <p className={cn(label_large, detail_text)}>
            {currentPlaylist?.description}
          </p>

          <div className={cn(detail_text, "flex-wrap has-separator")}>
            {currentPlaylist?.users && (
              <React.Fragment key={currentPlaylist?.users._id}>
                <Link
                  to={`/user/${currentPlaylist?.users._id}`}
                  key={currentPlaylist?.users._id}
                  className={cn(
                    label_large,
                    "text-white font-bold hover:underline"
                  )}
                >
                  {currentPlaylist?.users.name}
                </Link>
                <span className={cn(separator)}></span>
              </React.Fragment>
            )}
            {currentPlaylist?.type !== "likedSongs" && (
              <React.Fragment>
                <p className={cn(label_large)}>
                  {currentPlaylist?.saves} saves
                </p>
                <span className={cn(separator)}></span>
              </React.Fragment>
            )}

            <p className={cn(label_large)}>
              {currentPlaylist?.songs?.length} songs, about {totalDuration}
            </p>
          </div>
        </div>
      </section>

      <div className="relative p-4">
        <div className="absolute inset-0 h-full bg-gradient-to-b from-transparent to-[#000] backdrop-blur-[150px]" />
        {/* PLAYLIST TRACKS */}
        <section className={cn("list-container relative")}>
          <div className={cn(detail_actions)}>
            <PlayButton
              songId={songId}
              itemId={currentPlaylist?._id}
              classButton="text-[#003823] bg-[#12E29A] hover:scale-105 relative"
              fillColor="#000"
            />
            <IconButton
              icon={
                isPlaylistInLibrary ? (
                  <Check size={16} className="text-black" strokeWidth={4} />
                ) : (
                  <CirclePlus size={24} />
                )
              }
              classSpan={`hover:scale-105 ${
                isPlaylistInLibrary
                  ? "size-7 bg-[#12E29A] rounded-full"
                  : "hover:text-white"
              }`}
              onClick={handleLibraryPlaylistToggle}
              disabled={isLibraryLoading}
            />
            <IconButton icon={<Ellipsis size={24} />} />
          </div>

          <div className={cn(divider, "md:hidden")}></div>

          <div className={cn(list_header)}>
            <div className={cn(body_large, number_col)}>#</div>
            <div className={cn(body_medium, col)}>Title</div>
            <div className={cn(body_medium, album_col, col)}>Album</div>
            <div className={cn(duration_col)}>
              <span className={cn("material-symbols-rounded")}>
                <Clock size={16} />
              </span>
            </div>
          </div>

          <div className="list">
            {currentPlaylist?.songs?.map((song, i) => (
              <ListItem
                key={song._id}
                track={{
                  _id: song._id,
                  image_url: song.image_url,
                  title: song.title,
                  artists: song.artists,
                  duration: song.duration,
                  albumName: song.albums.title,
                  trackNumber: i + 1,
                  itemId: currentPlaylist?._id,
                }}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PlaylistPage;
