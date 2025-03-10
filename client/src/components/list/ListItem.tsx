import {
  body_large,
  body_medium,
  body_small,
  img_holder,
  img_hover,
  item_content,
  list_item,
} from "@/lib/classname";
import { cn } from "@/lib/utils";
import { msToTimeCode } from "@/utils/format";
import { Song } from "@/utils/types";
import { Play } from "lucide-react";

interface ListItemProps {
  tracks: Song[];
}
const ListItem = ({ tracks }: ListItemProps) => {
  return (
    <>
      {tracks.map((track, i) => (
        <div className={cn(list_item)} key={i}>
          <span className={cn(body_medium, "number_col size-4 text-center group-hover:hidden")}>
            {i + 1}
          </span>
          <Play
            fill="white"
            className="size-4 text-white hidden group-hover:block"
          />
          <div className="item_banner flex items-center w-full">
            <figure className={`${img_holder} size-10 rounded mr-3`}>
              <img
                src={track.image_url}
                loading="lazy"
                alt={track.title}
                className={`${img_hover}`}
              />
            </figure>

            <div className={cn(item_content)}>
              <div className="">
                <h3 className={cn(body_large, "text-[#ffffff]")}>
                  {track.title}
                </h3>

                <p className={cn(body_medium, "opacity-80")}>{track.artists?.map((artist) => artist.name).join(", ")}</p>
              </div>

              {track.albumName && (
                <p className={cn(body_medium, "album_col")}>
                  {track.albumName}
                </p>
              )}

              {track.duration && (
                <p className={cn(body_small)}>
                  {msToTimeCode(track.duration)}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ListItem;
