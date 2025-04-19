import { CardMore } from "@/components/cards";
import { ListItem } from "@/components/list";
import { PlayButton } from "@/components/play_button";
import IconButton from "@/components/top_bar/icon_btn/IconButton";
import { Button } from "@/components/ui/button";
import {
  artist_item,
  artist_list,
  body_large,
  body_small,
  card_link,
  detail_actions,
  detail_banner,
  detail_content,
  detail_header,
  detail_subtitle,
  detail_text,
  detail_title,
  divider,
  headline_large,
  img_cover,
  img_holder,
  label_large,
  section_title,
  separator,
  slider,
  slider_inner,
  title_large,
  title_wrapper,
} from "@/lib/classname";
import { cn } from "@/lib/utils";
import { useFollowStore } from "@/stores/useFollowStore";
import { useLibraryStore } from "@/stores/useLibraryStore";
import { useMusicStore } from "@/stores/useMusicStore";
import { useSongStore } from "@/stores/useSongStore";
import { msToTimeCode } from "@/utils/format";
import { Song } from "@/utils/types";
import { Check, ChevronDown, CirclePlus, Ellipsis } from "lucide-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

const TrackPage = () => {
  const { trackId } = useParams();
  const [showAllTracks, setShowAllTracks] = useState(false);

  // Store hooks
  const { songById, fetchSongById, fetchRecommendedSongs, songRecommended } =
    useSongStore();
  const { artistTopTracks, getArtistTopTracks } = useMusicStore();
  const { relatedArtists, fetchArtistsRelated } = useFollowStore();
  const { libraryMe, fetchLibraryMe } = useLibraryStore();
  const {
    isLoading: isTrackLoading,
    addLikedSong,
    removeLikedSong,
  } = useLibraryStore();

  // Memoized values
  const safeSongById = useMemo(
    () => songById || ({} as Partial<Song>),
    [songById]
  );
  const safeSongRecommended = useMemo(
    () => songRecommended || [],
    [songRecommended]
  );
  const displayedTracks = useMemo(
    () => (showAllTracks ? artistTopTracks : artistTopTracks.slice(0, 5)),
    [showAllTracks, artistTopTracks]
  );
  const isSongInLibrary = useMemo(() => {
    if (!trackId) return false;
    
    return (
      libraryMe?.items?.some(
        (item) =>
          item.type === "Playlist" &&
          item.track.songs?.some((song) => song.includes(trackId))
      ) || false
    );
  }, [libraryMe, trackId]);

  // Data fetching
  useEffect(() => {
    if (trackId) {
      fetchSongById(trackId);
      fetchRecommendedSongs(trackId);
    }
  }, [trackId, fetchSongById, fetchRecommendedSongs]);

  const fetchArtistData = useCallback(async () => {
    if (songById?.artists?.[0]?._id) {
      await Promise.all([
        getArtistTopTracks(songById.artists[0]._id),
        fetchArtistsRelated(songById.artists[0]._id),
      ]);
    }
  }, [songById?.artists, getArtistTopTracks, fetchArtistsRelated]);

  useEffect(() => {
    fetchArtistData();
  }, [fetchArtistData]);

  const handleToggleLikeSong = async () => {
    if (!trackId) return;
    if (isSongInLibrary) {
      removeLikedSong(trackId);
    } else {
      addLikedSong(trackId);
    }
    await fetchLibraryMe();
  };

  return (
    <div className="relative pt-10 md:pt-0 md:rounded-lg md:overflow-hidden">
      <div
        className="absolute inset-0 h-[450px] bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url(${songById?.image_url})`,
          backgroundSize: "100%",
          backgroundPosition: "top",
        }}
      />
      <div className="absolute inset-0 h-[450px] bg-gradient-to-b from-transparent to-[#191C1A] backdrop-blur-[150px]" />

      {/* ARTIST DETAIL */}
      <section className={cn(detail_header)}>
        <figure className={cn(img_holder, detail_banner)}>
          <img
            src={songById?.image_url}
            alt={songById?.title}
            width={300}
            height={300}
            className={cn(img_cover)}
            loading="lazy"
            decoding="async"
          />
        </figure>

        <div className={cn(detail_content)}>
          <p className={cn(label_large, detail_subtitle)}>{songById?.type}</p>
          <h2 className={cn(headline_large, detail_title)}>
            {songById?.title}
          </h2>
          <div className={cn(detail_text, "flex-wrap has-separator")}>
            {songById?.artists?.map((artist) => (
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
            {songById?.albums.title && (
              <Link
                to={`/album/${songById.albums._id}`}
                className={cn(
                  label_large,
                  "text-white font-normal hover:underline"
                )}
              >
                {songById?.albums.title}
              </Link>
            )}
            <span className={cn(separator)}></span>

            <p className={cn(label_large)}>
              {songById?.albums.createdAt
                ? new Date(songById.albums.createdAt).getFullYear()
                : "N/A"}
            </p>
            <span className={cn(separator)}></span>

            {songById?.duration && (
              <p className={cn(label_large)}>
                {msToTimeCode(songById.duration)}
              </p>
            )}
          </div>
        </div>
      </section>

      <div className="relative p-4">
        <div className="absolute inset-0 h-full bg-gradient-to-b from-transparent to-[#000] backdrop-blur-[150px]" />

        <section className={cn("list-container relative")}>
          <div className={cn(detail_actions)}>
            {safeSongById._id && (
              <PlayButton
                songId={safeSongById._id}
                arrSongs={safeSongById._id ? [safeSongById as Song] : []}
                classButton="text-[#003823] bg-[#12E29A] hover:scale-105 relative"
                fillColor="#000"
              />
            )}
            <IconButton
              icon={
                isSongInLibrary ? (
                  <Check size={16} className="text-black" strokeWidth={4} />
                ) : (
                  <CirclePlus size={24} />
                )
              }
              classSpan={`hover:scale-105 ${isSongInLibrary ? "size-7 bg-[#12E29A] rounded-full" : "hover:text-white"}`}
              onClick={handleToggleLikeSong}
              disabled={isTrackLoading}
            />
            <IconButton icon={<Ellipsis size={24} />} />
          </div>

          <div className={cn(divider, "md:hidden")}></div>

          {/* ARTIST OF TRACKS */}
          <div className={cn(artist_list)}>
            {songById?.artists?.map((artist, i) => (
              <div className={cn(artist_item)} key={i}>
                <div className={cn("item-banner size-16 relative")}>
                  <figure className={cn(img_holder, "size-full rounded-full")}>
                    <img
                      src={artist.image_url}
                      alt={artist.name}
                      width={56}
                      height={56}
                      loading="lazy"
                      decoding="async"
                      className={cn(img_cover)}
                    />
                  </figure>
                </div>

                <div
                  className={cn(
                    "grid grid-cols-[minmax(0,1fr)] items-center flex-grow min-w-0"
                  )}
                >
                  <p className={cn("text-[#b3b3b3]")}>Artist</p>

                  <p className={cn(body_large, "item-title")}>{artist.name}</p>
                </div>

                <Link
                  to={`/artist/${artist._id}`}
                  className={cn(card_link)}
                ></Link>
              </div>
            ))}
          </div>
          {/* RECOMMENDED TRACKS */}
          {safeSongRecommended.length > 0 && (
            <div className="mt-4">
              <div
                className={cn(
                  "grid grid-cols-[max-content] items-center gap-1 mb-4"
                )}
              >
                <h2 className={cn(title_large)}>Recommended</h2>
                <p className={cn(body_small, section_title)}>
                  Based on this song
                </p>
              </div>

              <div className="list">
                {safeSongRecommended.map((song, i) => (
                  <ListItem
                    key={song._id}
                    track={{
                      _id: song._id,
                      title: song.title,
                      image_url: song.image_url,
                      albumName: song.albums.title,
                      duration: song.duration,
                      trackNumber: i + 1,
                    }}
                    arrayTracks={safeSongRecommended}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ARTIST TOP TRACKS */}
          <div className="mt-4">
            <div
              className={cn(
                "grid grid-cols-[max-content] items-center gap-1 mb-4"
              )}
            >
              <p className={cn(body_small, section_title)}>Popular Tracks by</p>
              <h2 className={cn(title_large)}>
                {songById?.artists?.[0]?.name || "Unknown Artist"}
              </h2>
            </div>

            <div className="list">
              {displayedTracks.map((song, i) => (
                <ListItem
                  key={song._id}
                  track={{
                    _id: song._id,
                    title: song.title,
                    image_url: song.image_url,
                    albumName: song.albums.title,
                    duration: song.duration,
                    trackNumber: i + 1,
                  }}
                  arrayTracks={artistTopTracks}
                />
              ))}
            </div>
            {artistTopTracks.length > 5 && (
              <div className="flex justify-center mt-4">
                <Button
                  onClick={() => setShowAllTracks(!showAllTracks)}
                  className="flex items-center gap-2 text-[#FFFFFFB2] hover:text-white transition-colors"
                >
                  <span className={cn("text-xs font-bold")}>
                    {showAllTracks ? "Show less" : "See more"}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      showAllTracks ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* RELATED ARTISTS */}
        {relatedArtists?.items && relatedArtists?.items.length > 0 && (
          <section className="mt-4 isolate">
            <div className={cn(title_wrapper)}>
              <h2 className={cn(title_large, section_title)}>Fans also like</h2>
              {relatedArtists?.next && (
                <Link
                  to={`/artist`}
                  className="flex flex-col justify-end h-full"
                >
                  <span
                    className={cn(
                      label_large,
                      "hover:underline text-[#C0C9C1]"
                    )}
                  >
                    Show all
                  </span>
                </Link>
              )}
            </div>

            <div className={cn(slider)}>
              <div className={cn(slider_inner)}>
                {relatedArtists?.items.map((artist) => (
                  <CardMore
                    key={artist._id}
                    item={{
                      _id: artist._id,
                      title: artist.name,
                      link: `/artist/${artist._id}`,
                      image_url: artist.image_url,
                    }}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default TrackPage;
