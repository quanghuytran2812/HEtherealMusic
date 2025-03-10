import { body_medium, card, card_banner, card_link, card_text, card_title, ellipsis_one_line, ellipsis_two_line, img_holder, img_hover, title_medium } from "@/lib/classname";
import { cn } from "@/lib/utils";
import { Album } from "@/utils/types";
import { PlayButton } from "../play_button";

interface CardMoreProps {
  albums: Album[];
}
const CardMore = ({ albums }: CardMoreProps) => {
  return (
    <>
      {albums.map((album, i) => (
        <div className={cn(card)} key={i}>
          <div className={cn(card_banner)}>
            <figure className={cn(img_holder, "aspect-[1/1] rounded-[12px]")}>
              <img src={album.image_url} alt={album.title} width={300} height={300} loading="lazy" className={cn(img_hover)} />
            </figure>

            <PlayButton />
          </div>

          <div className="p-2">
            <h3 className={cn(title_medium, card_title, ellipsis_one_line)}>{album.title}</h3>
            <p className={cn(body_medium, card_text, ellipsis_two_line)}>
            {album?.createdAt
                  ? new Date(album.createdAt).getFullYear()
                  : album.artists?.map((artist) => artist.name).join(", ")}
            </p>
          </div>

          <a href={`/album/` + album._id} className={cn(card_link)} aria-label={album.title}></a>
        </div>
      ))}
    </>
  );
};

export default CardMore;
