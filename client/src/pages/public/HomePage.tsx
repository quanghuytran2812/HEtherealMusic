import { MusicSection } from "@/components/section";
import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect, useMemo } from "react";

const HomePage = () => {
  const {
    // State
    recommendAlbums,
    artistsRecommend,
    albumsReleases,
    playlistsPopular,
    playlistsTop,
    // Status
    albumStatus,
    artistStatus,
    playlistStatus,
    // Actions
    getRecommendAlbums,
    getPopularPlaylists,
    getTopPlaylists,
    getNewAlbumReleases,
    getRecommendArtists,
  } = useMusicStore();
  // Memoize unique artist IDs to avoid recalculating on every render
  const uniqueArtistIds = useMemo(() => {
    if (!recommendAlbums.length) return "";
    const artistIdsEntries = recommendAlbums.flatMap(
      (album) => album.artists?.map((artist) => artist._id) || []
    );
    return [...new Set(artistIdsEntries)].join(",");
  }, [recommendAlbums]);

  // Initial data fetch
  useEffect(() => {
    const fetchInitialData = async () => {
      await Promise.all([
        getRecommendAlbums(),
        getPopularPlaylists(),
        getTopPlaylists(),
        getNewAlbumReleases(),
      ]);
    };

    fetchInitialData();
  }, [
    getRecommendAlbums,
    getPopularPlaylists,
    getTopPlaylists,
    getNewAlbumReleases,
  ]);

  useEffect(() => {
    if (uniqueArtistIds) {
      getRecommendArtists(uniqueArtistIds);
    }
  }, [uniqueArtistIds, getRecommendArtists]);

  return (
    <div className="mt-16 md:mt-4 px-4">
      {/* Recommended Albums */}
      <MusicSection
        title="Recommended for you"
        items={recommendAlbums}
        isLoading={albumStatus === 'loading'}
        type="album"
      />

      {/* Recommended Artists */}
      <MusicSection
        title="Artists for you"
        items={artistsRecommend}
        isLoading={artistStatus === 'loading'}
        type="artist"
      />

      {/* New Releases */}
      <MusicSection
        title="New Releases"
        items={albumsReleases}
        isLoading={albumStatus === 'loading'}
        type="album"
      />

      {/* Popular Playlists */}
      <MusicSection
        title="Popular Playlists"
        items={playlistsPopular}
        isLoading={playlistStatus === 'loading'}
        type="playlist"
      />

      {/* Top Playlists */}
      <MusicSection
        title="Top Playlists"
        items={playlistsTop}
        isLoading={playlistStatus === 'loading'}
        type="playlist"
      />
    </div>
  );
};

export default HomePage;
