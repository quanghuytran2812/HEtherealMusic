import { CardGenre } from "@/components/cards";
import { section_title, title_large, title_wrapper } from "@/lib/classname";
import { cn } from "@/lib/utils";
import { useGenreStore } from "@/stores/useGenreStore";
import { GenreItem } from "@/utils/types";
import { useEffect } from "react";
const ExplorePage = () => {
  const { genres, getGenres } = useGenreStore();

  useEffect(() => {
    getGenres();
  }, [getGenres]);
  return (
    <div className="main mt-16 md:mt-4 px-4">
      <section className="mt-4">
        <div className={cn(title_wrapper)}>
          <h2 className={cn(title_large, section_title)}>Explore</h2>
        </div>

        <div className={cn("grid-list")}>
          {genres.map((genre: GenreItem) => (
            <CardGenre key={genre._id} genre={genre} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ExplorePage;
