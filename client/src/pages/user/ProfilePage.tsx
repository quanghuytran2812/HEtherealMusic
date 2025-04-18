import { CardMore } from "@/components/cards";
import { ProfileHeader } from "@/components/headers";
import { ListItem } from "@/components/list";
import {
  divider,
  label_large,
  slider,
  slider_inner,
  title_large,
  title_wrapper,
} from "@/lib/classname";
import { cn } from "@/lib/utils";
import { useFollowStore } from "@/stores/useFollowStore";
import { useMeStore } from "@/stores/useMeStore";
import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";

const ProfilePage = () => {
  const { userId } = useParams();
  const {
    topArtist,
    topTrack,
    userInfo,
    getTop,
    getUserById,
    isLoading: userLoading,
  } = useMeStore();
  const {
    artistsFollowed,
    fetchArtistsFollowedByUser,
    isLoading: followLoading,
  } = useFollowStore();

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        getTop("artists"),
        getTop("tracks"),
        fetchArtistsFollowedByUser(),
      ]);
    };
    fetchData();
  }, [getTop, fetchArtistsFollowedByUser]);

  useEffect(() => {
    if (userId) {
      getUserById(userId);
    }
  }, [getUserById, userId]);

  const backgroundImage = useMemo(() => {
    if (!userInfo?.imageUrl || userInfo.imageUrl.length === 0) return null;
    return userInfo.imageUrl[userInfo.imageUrl.length - 1];
  }, [userInfo]);

  if (userLoading || followLoading) {
    return <div className="p-4 text-center">Loading profile...</div>;
  }

  if (!userInfo) {
    return <div className="p-4 text-center">User not found</div>;
  }

  return (
    <div className="relative pt-10 md:pt-0 md:rounded-lg md:overflow-hidden">
      <div
        className="absolute inset-0 h-[450px] bg-no-repeat bg-cover opacity-50"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "100%",
          backgroundPosition: "top",
        }}
      />
      <div className="absolute inset-0 h-[450px] bg-gradient-to-b from-transparent to-[#191C1A] backdrop-blur-[150px]" />
      {/* PROFILE */}
      <ProfileHeader
        userInfo={userInfo}
        followingCount={artistsFollowed?.items.length || 0}
      />

      <div className="relative p-4">
        <div className="absolute inset-0 h-full bg-gradient-to-b from-transparent to-[#000] backdrop-blur-[150px]" />

        <div className={cn(divider, "md:hidden")}></div>

        {/* TOP ARTIST */}
        {topArtist?.items && topArtist?.items.length > 0 && (
          <section className="mt-4 isolate">
            <div className={cn(title_wrapper)}>
              <div className="flex flex-col gap-1 items-start">
                <h2 className={cn(title_large, "text-[#fff]")}>
                  Top artists this month
                </h2>
                <p className={cn(label_large, "text-[#C0C9C1]")}>
                  Only visible to you
                </p>
              </div>

              {topArtist?.next && (
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

            <div className={cn(slider, "slider")}>
              <div className={cn(slider_inner)}>
                {topArtist.items.map((artist) => {
                  return (
                    <CardMore
                      key={artist._id}
                      item={{
                        _id: artist._id,
                        title: artist.name,
                        type: artist.type,
                        text: artist.type,
                        link: `/artist/${artist._id}`,
                        image_url: artist.image_url,
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* TOP TRACKS */}
        {topTrack?.items && topTrack?.items.length > 0 && (
          <section className="mt-4 isolate">
            <div className={cn(title_wrapper)}>
              <div className="flex flex-col gap-1 items-start">
                <h2 className={cn(title_large, "text-[#fff]")}>
                  Top tracks this month
                </h2>
                <p className={cn(label_large, "text-[#C0C9C1]")}>
                  Only visible to you
                </p>
              </div>

              {topTrack?.next && (
                <Link
                  to={`/track`}
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

            <div className="list">
              {topTrack?.items.map((song, i) => (
                <ListItem
                  key={song._id}
                  track={{
                    _id: song._id,
                    title: song.title,
                    image_url: song.image_url,
                    artists: song.artists,
                    duration: song.duration,
                    albumName: song.albums.title,
                    trackNumber: i + 1,
                  }}
                  arrayTracks={topTrack.items}
                />
              ))}
            </div>
          </section>
        )}

        {/* FOLLOW ARTIST */}
        {artistsFollowed?.items && artistsFollowed?.items.length > 0 && (
          <section className="mt-4 isolate">
            <div className={cn(title_wrapper)}>
              <h2 className={cn(title_large, "text-[#fff]")}>Following</h2>

              {artistsFollowed?.next && (
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

            <div className={cn(slider, "slider")}>
              <div className={cn(slider_inner)}>
                {artistsFollowed.items.map((artist) => {
                  return (
                    <CardMore
                      key={artist._id}
                      item={{
                        _id: artist._id,
                        title: artist.name,
                        type: artist.type,
                        text: artist.type,
                        link: `/artist/${artist._id}`,
                        image_url: artist.image_url,
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

export default ProfilePage;
