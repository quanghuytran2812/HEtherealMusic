import { CardMore } from "@/components/cards";
import { ListItem } from "@/components/list";
import { PlayButton } from "@/components/play_button";
import IconButton from "@/components/top_bar/icon_btn/IconButton";
import { Button } from "@/components/ui/button";
import {
  btn_follow,
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
  slider,
  slider_inner,
  title_large,
  title_wrapper,
} from "@/lib/classname";
import { cn } from "@/lib/utils";
import { useFollowStore } from "@/stores/useFollowStore";
import { useLibraryStore } from "@/stores/useLibraryStore";
import { useMusicStore } from "@/stores/useMusicStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { ChevronDown, Ellipsis } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ArtistPage = () => {
  const { artistId } = useParams();
  const { currentSong } = usePlayerStore();
  const { artist, artistTopTracks, getArtistById, getArtistTopTracks, albumsByArtist, getAllAlbumsByArtist } =
    useMusicStore();
  const { 
    relatedArtists, 
    artistsFollowed, 
    isLoading: isFollowLoading,
    fetchArtistsRelated, 
    fetchArtistsFollowedByUser,
    followUser,
    unfollowUser
  } = useFollowStore();
  const { fetchLibraryMe } = useLibraryStore();
  const [showAllTracks, setShowAllTracks] = useState(false);

  const isFollowing = useMemo(() => {
    return artistsFollowed?.items?.some(artist => artist._id === artistId) || false;
  }, [artistsFollowed, artistId]);

  const fetchArtistData = useCallback(async () => {
    if (artistId) {
      await Promise.all([
        getArtistById(artistId),
        getArtistTopTracks(artistId),
        getAllAlbumsByArtist(artistId),
        fetchArtistsRelated(artistId),
        fetchArtistsFollowedByUser()
      ]);
    }
  }, [
    artistId,
    getArtistById,
    getArtistTopTracks,
    getAllAlbumsByArtist,
    fetchArtistsRelated,
    fetchArtistsFollowedByUser
  ]);

  useEffect(() => {
    fetchArtistData();
  }, [fetchArtistData]);

  const lastImageUrl = artist?.imageUrl?.slice(-1)[0] || "";
  const songId = useMemo(() => {
    const foundSong = artistTopTracks.find(
      (song) => song._id === currentSong?._id
    );
    return foundSong ? foundSong._id : artistTopTracks[0]?._id;
  }, [artistTopTracks, currentSong]);

  const displayedTracks = showAllTracks
    ? artistTopTracks
    : artistTopTracks.slice(0, 5);

  const handleFollowToggle = async () => {
    if (!artistId || !artist) return;
    
    if (isFollowing) {
      await unfollowUser(artistId, fetchLibraryMe);
    } else {
      await followUser(artistId, {
        name: artist.name,
        image_url: lastImageUrl,
        type: artist.type || 'artist'
      }, fetchLibraryMe);
    }
  };

  return (
    <div className="relative pt-10 md:pt-0 md:rounded-lg md:overflow-hidden">
      <div
        className="absolute inset-0 h-[450px] bg-no-repeat bg-cover opacity-50"
        style={{
          backgroundImage: `url(${lastImageUrl})`,
          backgroundSize: "100%",
          backgroundPosition: "top",
        }}
      />
      <div className="absolute inset-0 h-[450px] bg-gradient-to-b from-transparent to-[#191C1A] backdrop-blur-[150px]" />
      
      {/* ARTIST DETAIL */}
      <section className={cn(detail_header)}>
        <figure className={cn(img_holder, detail_banner)}>
          <img
            src={lastImageUrl}
            alt={artist?.name}
            width={300}
            height={300}
            className={cn(img_cover)}
            loading="lazy"
            decoding="async"
          />
        </figure>

        <div className={cn(detail_content)}>
          <p className={cn(label_large, detail_subtitle)}>{artist?.type}</p>
          <h2 className={cn(headline_large, detail_title)}>{artist?.name}</h2>
          <div className={cn(detail_text, "flex-wrap has-separator")}>
            <p className={cn(label_large)}></p>
          </div>
        </div>
      </section>

      <div className="relative p-4">
        <div className="absolute inset-0 h-full bg-gradient-to-b from-transparent to-[#000] backdrop-blur-[150px]" />
        
        {/* ARTIST TOP TRACKS */}
        <section className={cn("list-container relative")}>
          <div className={cn(detail_actions)}>
            <PlayButton
              songId={songId}
              classButton="text-[#003823] bg-[#12E29A] hover:scale-105 relative"
              fillColor="#000"
            />
            <Button 
              className={cn(btn_follow, isFollowing ? "border-[#12E29A] text-[#12E29A]" : "")}
              onClick={handleFollowToggle}
              disabled={isFollowLoading}
            >
              {isFollowLoading ? "Processing..." : isFollowing ? "Following" : "Follow"}
            </Button>
            <IconButton icon={<Ellipsis size={24} />} />
          </div>

          <div className={cn(divider, "md:hidden")}></div>

          <div className={cn(title_wrapper, "mt-4")}>
            <h2 className={cn(title_large, section_title)}>Popular</h2>
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
                  {showAllTracks ? 'Show less' : 'See more'}
                </span>
                <ChevronDown
                  size={16} 
                  className={`transition-transform ${showAllTracks ? 'rotate-180' : ''}`}
                />
              </Button>
            </div>
          )}
        </section>

        {/* ARTIST ALBUMS */}
        {albumsByArtist.length > 0 && (
          <section className="mt-4 isolate">
            <div className={cn(title_wrapper)}>
              <h2 className={cn(title_large, section_title)}>Discography</h2>
              <Link to={`/artist`} className="btn btn-link">
                <span className={cn(label_large, "hover:underline text-[#C0C9C1]")}>
                  Show all
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
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* RELATED ARTISTS */}
        {relatedArtists?.items && relatedArtists?.items.length > 0 && (
          <section className="mt-4 isolate">
            <div className={cn(title_wrapper)}>
              <h2 className={cn(title_large, section_title)}>Fans also like</h2>
              {relatedArtists?.next && (
                <Link to={`/artist`} className="flex flex-col justify-end h-full">
                  <span className={cn(label_large, "hover:underline text-[#C0C9C1]")}>
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

export default ArtistPage;