import { card, card_banner, card_content, card_link, card_title, genre_card, img_cover, img_holder, title_medium } from "@/lib/classname"
import { cn } from "@/lib/utils"
import { GenreItem } from "@/utils/types"
import { Link } from "react-router-dom"

interface CardGenreProps {
  genre: GenreItem
}
const CardGenre = ({ genre }: CardGenreProps) => {
  return (
    <div className={cn(card, genre_card)} key={genre._id}>

      <div className={cn(card_banner, "absolute size-[100px] md:size-[150px] -right-6 bottom-[-10px] md:-bottom-6 rotate-[30deg]")}>
        <figure className={cn(img_holder, "size-full rounded")}>
          <img src={genre.image_url} alt={genre.genre_name} width={150} height={150} loading="lazy" decoding="async" className={cn(img_cover)} />
        </figure>
      </div>

      <div className={cn(card_content, "pr-[68px] md:pr-4")}>
        <h3 className={cn(title_medium, card_title, "whitespace-normal break-words")}>
          {genre.genre_name}
        </h3>
      </div>

      <Link to={`/genre/${genre._id}`} className={cn(card_link)} aria-label={`Explore ${genre.genre_name}`}></Link>

      <div className="state-layer"></div>
    </div>
  )
}

export default CardGenre