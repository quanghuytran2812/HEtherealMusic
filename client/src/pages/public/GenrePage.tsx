import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { CardMore } from "@/components/cards";
import { HeroSection } from "@/components/section";
import { useGenreStore } from "@/stores/useGenreStore";
import { useMusicStore } from "@/stores/useMusicStore";

const GenrePage = () => {
  const { genreId } = useParams<{ genreId: string }>();
  const { genreById, fetchGenresById } = useGenreStore();
  const { playlistsByGenre, getPlaylistsByGenre } = useMusicStore();

  // Memoize the playlists to avoid unnecessary re-renders
  const memoizedPlaylists = useMemo(() => playlistsByGenre, [playlistsByGenre]);

  // Fetch data in parallel when genreId changes
  useEffect(() => {
    if (!genreId) return;

    const fetchData = async () => {
      await Promise.all([
        fetchGenresById(genreId),
        getPlaylistsByGenre(genreId),
      ]);
    };

    fetchData();
  }, [genreId, fetchGenresById, getPlaylistsByGenre]);

  // Early return if no genreId
  if (!genreId) {
    return <div className="p-4 text-center">No genre selected</div>;
  }

  return (
    <div className="relative pt-10 md:pt-0 md:rounded-lg md:overflow-hidden">
      <HeroSection
        title={genreById?.genre_name || "Genre"}
        backgroundImage={genreById?.image_url || ""}
      />
      {memoizedPlaylists.length > 0 && (
        <React.Fragment>
          <div
            className="absolute inset-0 h-[450px] bg-no-repeat bg-cover opacity-50"
            style={{
              backgroundImage: `url(${genreById?.image_url})`,
              backgroundSize: "100%",
              backgroundPosition: "top",
            }}
          />
          <div className="absolute inset-0 h-[450px] bg-gradient-to-b from-transparent to-[#191C1A] backdrop-blur-[150px]" />
        </React.Fragment>
      )}

      {memoizedPlaylists.length > 0 ? (
        <div className="relative px-4 py-8">
          <div
            className="absolute inset-0 h-full bg-gradient-to-b from-transparent to-[#000] backdrop-blur-[150px]"
            aria-hidden="true"
          />
          <div className="grid-list">
            {memoizedPlaylists.map((playlist) => (
              <CardMore
                key={playlist._id}
                item={{
                  _id: playlist._id,
                  title: playlist.title,
                  type: "playlist",
                  text: playlist.description,
                  link: `/playlist/${playlist._id}`,
                  image_url: playlist.image_url,
                  songs: playlist.songs,
                }}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="p-4 text-center">No playlists found for this genre</div>
      )}
    </div>
  );
};

export default GenrePage;
