import {
  body_medium,
  card,
  card_banner,
  card_content,
  card_link,
  card_text,
  card_title,
  ellipsis_one_line,
  ellipsis_two_line,
  img_cover,
  img_holder,
  separator,
  title_medium,
} from "@/lib/classname";
import { cn } from "@/lib/utils";
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { PlayButton } from "@/components/play_button";
import { usePlayerStore } from "@/stores/usePlayerStore";

interface itemProps {
  _id: string;
  title: string;
  text?: string;
  image_url?: string;
  type?: string;
  year?: string;
  link?: string;
  songs?: string[];
}
interface CardMoreProps {
  item: itemProps;
}
const CardMore = ({ item }: CardMoreProps) => {
  const { currentSong } = usePlayerStore();

  const songId = useMemo(() => {
    const foundSong = item.songs?.find((song) => song === currentSong?._id);
    return foundSong || (item?.songs && item?.songs[0]);
  }, [item.songs, currentSong]);

  return (
    <div
      className={cn(card)}
      key={item.title}
      style={{ "--state-layer-bg": "#C5C7C3" } as React.CSSProperties}
    >
      <div
        className={cn(card_banner, item.type === "artist" ? "pt-4 px-4" : "")}
      >
        <figure
          className={cn(
            img_holder,
            "aspect-[1/1] rounded-[12px]",
            item.type === "artist" ? "rounded-full" : ""
          )}
        >
          <img
            src={item.image_url}
            alt={item.title}
            width={200}
            height={200}
            loading="lazy"
            decoding="async"
            className={cn(img_cover)}
          />
        </figure>

        <PlayButton
          songId={songId}
          itemId={item._id}
          classButton="absolute text-[#003823] bg-[#12E29A] opacity-0 invisible z-10 right-2 bottom-2 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 group-hover:visible"
        />
      </div>

      <div className={cn(card_content)}>
        <h3 className={cn(title_medium, card_title, ellipsis_one_line)}>
          {item.title}
        </h3>
        <p
          className={cn(
            body_medium,
            card_text,
            ellipsis_two_line,
            "capitalize"
          )}
        >
          {item.year && (
            <React.Fragment>
              <span>{item.year}</span>
              <div className={cn(separator)}></div>
            </React.Fragment>
          )}
          {item.text}
        </p>
      </div>

      <Link to={`${item.link}`} className={cn(card_link)}></Link>

      <div className="state-layer"></div>
    </div>
  );
};

export default CardMore;
