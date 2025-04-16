import { CardMore } from "@/components/cards";
import { ProfileUpdateDialog } from "@/components/dialogs";
import { ListItem } from "@/components/list";
import {
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
  slider,
  slider_inner,
  title_large,
  title_wrapper,
} from "@/lib/classname";
import { cn } from "@/lib/utils";
import { useFollowStore } from "@/stores/useFollowStore";
import { useMeStore } from "@/stores/useMeStore";
import { Pen, User } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { me, topArtist, topTrack, getTopArtist, getTopTrack } = useMeStore();
  const { artistsFollowed, fetchArtistsFollowedByUser } = useFollowStore();

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([getTopArtist(), getTopTrack(), fetchArtistsFollowedByUser()]);
    };
    fetchData();
  }, [getTopArtist, getTopTrack, fetchArtistsFollowedByUser]);

  return (
    <div className="relative pt-10 md:pt-0 md:rounded-lg md:overflow-hidden">
      {me && me.imageUrl && me.imageUrl.length > 0 && (
        <div
          className="absolute inset-0 h-[450px] bg-no-repeat bg-cover opacity-50"
          style={{
            backgroundImage: `url(${me.imageUrl[me.imageUrl.length - 1]})`,
            backgroundSize: "100%",
            backgroundPosition: "top",
          }}
        />
      )}
      <div className="absolute inset-0 h-[450px] bg-gradient-to-b from-transparent to-[#191C1A] backdrop-blur-[150px]" />
      {/* PROFILE */}
      <section className={cn(detail_header)}>
        <figure
          className={cn(
            img_holder,
            detail_banner,
            "rounded-full group relative flex items-center justify-center"
          )}
        >
          {me && me.imageUrl && me.imageUrl.length > 0 ? (
            <img
              src={me.imageUrl[me.imageUrl.length - 1]}
              alt={me?.name}
              width={300}
              height={300}
              loading="lazy"
              decoding="async"
              className={cn(img_cover)}
            />
          ) : (
            <User size={48} className="text-[#b3b3b390]" />
          )}
          <div className="hidden group-hover:block cursor-pointer w-full h-full absolute top-0 left-0 rounded-full bg-black/70">
            <ProfileUpdateDialog
              triggerContent={
                <div className="flex flex-col h-full justify-center items-center gap-1">
                  <Pen size={48} />
                  <p className="text-base font-normal">Choose photo</p>
                </div>
              }
            />
          </div>
        </figure>

        <div className={cn(detail_content)}>
          <p className={cn(label_large, detail_subtitle)}>Profile</p>

          <h2 className={cn(headline_large, detail_title)}>{me?.name}</h2>

          <div className={cn(detail_text, "flex-wrap has-separator")}>
            <p className={cn(label_large)}>{artistsFollowed?.items.length} Following</p>
          </div>
        </div>
      </section>

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
                    itemId: song.albums._id,
                  }}
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
