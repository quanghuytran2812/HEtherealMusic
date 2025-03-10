import { CardMore } from "@/components/cards";
import { ListItem } from "@/components/list";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  body_large,
  body_medium,
  copyright,
  detail_banner,
  detail_header,
  detail_text,
  headline_large,
  img_holder,
  img_hover,
  label_extra_large,
  label_large,
  label_small,
  list_header,
  section_title,
  separator,
  slider,
  slider_inner,
  title_large,
  title_wrapper,
} from "@/lib/classname";
import { cn } from "@/lib/utils";
import { useAlbumStore } from "@/stores/useAlbumStore";
import { convertSecondsToDuration } from "@/utils/format";
import { Clock } from "lucide-react";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const AlbumPage = () => {
  const { albumId } = useParams();
  const { currentAlbum, getAlbumById, albumsByArtist, getAllAlbumsByArtist } =
    useAlbumStore();

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

  // Sum the durations of all songs
  const totalSeconds =
    currentAlbum?.songs?.reduce((sum, song) => sum + song.duration, 0) || 0; // Fallback to 0 if songs is undefined
  // Convert total seconds to a readable format
  const totalDuration = convertSecondsToDuration(totalSeconds);

  return (
    <div className="main">
      <ScrollArea className="h-[calc(100vh-105px)] rounded-lg relative">
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
        <section className={`${detail_header}`}>
          <figure className={`${img_holder} ${detail_banner} isolate`}>
            <img
              src={currentAlbum?.image_url}
              alt={currentAlbum?.title}
              className={`${img_hover}`}
            />
          </figure>

          <div className="text-[#C0C9C1] isolate">
            <p className={`${label_large} capitalize opacity-80`}>
              {currentAlbum?.type}
            </p>

            <h2 className={`${headline_large}`}>{currentAlbum?.title}</h2>

            <div className={`${detail_text}`}>
              {currentAlbum?.artists?.map((artist) => (
                <React.Fragment key={artist._id}>
                  <p className={`${label_extra_large}`}>{artist.name}</p>
                  <span className={`${separator}`}></span>
                </React.Fragment>
              ))}
              <p className={`${label_large}`}>
                {currentAlbum?.createdAt
                  ? new Date(currentAlbum.createdAt).getFullYear()
                  : "N/A"}
              </p>
              <span className={`${separator}`}></span>
              <p className={`${label_large}`}>
                {currentAlbum?.songs?.length} songs, {totalDuration}
              </p>
            </div>
          </div>
        </section>

        {/* ALBUM TRACK LIST */}
        <section className="isolate relative px-4">
          <div className={`${list_header}`}>
            <div className={cn(body_large, "number-col")}>#</div>
            <div className={cn(body_large, "flex-grow")}>Title</div>
            <div className="w-[42px]">
              <Clock className="h-4 w-4" />
            </div>
          </div>

          <div className="list">
            {currentAlbum?.songs?.length ? (
              <ListItem tracks={currentAlbum?.songs || []} />
            ) : (
              <p>No songs in this album!</p>
            )}
          </div>
        </section>

        {/* ALBUM COPYRIGHT */}
        <section className={cn(copyright, "isolate")}>
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
            © 2024 ROSÉ under exclusive license to Atlantic Recording
            Corporation for the World excluding Korea
          </p>
          <p className={cn(label_small)}>
            © 2024 ROSÉ under exclusive license to Atlantic Recording
            Corporation for the World excluding Korea
          </p>
        </section>

        {/* MORE BY ARTIST */}
        <section className="mt-4 isolate">
          <div className={cn(title_wrapper)}>
            <h2 className={cn(title_large, section_title)}>More by {currentAlbum?.artists?.[0]?.name || "N/A"}</h2>

            <Link to={`/artist`} className="btn btn-link">
              <span className={cn(label_large, "hover:underline text-[#C0C9C1]")}>See discography</span>
            </Link>

            <div className={cn(slider)}>
              <div className={cn(slider_inner)}>
                <CardMore albums={albumsByArtist} />
              </div>
            </div>
          </div>
        </section>
      </ScrollArea>
    </div>
  );
};

export default AlbumPage;
