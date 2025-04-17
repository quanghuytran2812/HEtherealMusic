import { NotificationAlert } from "@/components/alerts";
import { CardGenre } from "@/components/cards";
import { ExploreSkeleton } from "@/components/skeletons";
import { section_title, title_large, title_wrapper } from "@/lib/classname";
import { cn } from "@/lib/utils";
import { useGenreStore } from "@/stores/useGenreStore";
import { useEffect } from "react";
const ExplorePage = () => {
  const { genres, isLoading, error, getGenres } = useGenreStore();

  useEffect(() => {
    // Only fetch if we don't already have genres
    if (genres.length === 0) {
      getGenres();
    }
  }, [getGenres, genres.length]);

  if (error) {
    return (
      <div className="main mt-16 md:mt-4 px-4">
        <NotificationAlert
          message={error}
          title="Error"
          open={true}
          variant="destructive"
        />
      </div>
    );
  }
  return (
    <div className="main mt-16 md:mt-4 px-4">
      <section className="mt-4">
        <div className={cn(title_wrapper)}>
          <h2 className={cn(title_large, section_title)}>Explore</h2>
        </div>

        {isLoading ? (
          <ExploreSkeleton />
        ) : (
          <div className={cn("grid-list")}>
            {genres.map((genre) => (
              <CardGenre key={genre._id} genre={genre} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ExplorePage;
