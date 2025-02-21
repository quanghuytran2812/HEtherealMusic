import { ScrollArea } from "@/components/ui/scroll-area";
import { useGenreStore } from "@/stores/useGenreStore";
import { GenreItem } from "@/utils/types";
import { useEffect } from "react";
import { Link } from "react-router-dom";

interface Props {
  dataGenre: GenreItem[];
}

const GenreCard: React.FC<{ item: GenreItem }> = ({ item }) => (
  <div className="p-3 transform hover:scale-90 transition-all duration-300">
    <Link to={"/genre/" + item._id}>
      <div
        className={`w-full h-full rounded-lg relative bg-gradient-to-l from-[#fff2] to-transparent border border-white border-opacity-10 shadow-card-shadow pb-[56.25%] overflow-hidden`}
      >
        <img
          className="size-20 object-cover object-center rounded absolute right-0 bottom-0 transform rotate-[25deg] translate-x-[18%] translate-y-[-2%] shadow-md"
          src={item.image_url}
          loading="lazy"
          alt={item.genre_name}
          data-image-load-animation
        />
        <span className="hyphens-auto min-w-full absolute px-4 pt-4 text-balance font-bold text-2xl">
          {item.genre_name}
        </span>
      </div>
    </Link>
  </div>
);

const GenreGrid: React.FC<Props> = ({ dataGenre }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(254px,1fr))] auto-rows-min">
      {dataGenre.map((item, index) => (
        <GenreCard key={index} item={item} />
      ))}
    </div>
  );
};

const SearchPage = () => {
  const { genres, getGenres } = useGenreStore();

  useEffect(() => {
    getGenres();
  }, [getGenres]);
  return (
    <div className="w-full pt-8 bg-[#121212] rounded-lg overflow-hidden">
      <ScrollArea className="h-[calc(100vh-138px)] isolate pb-3">
        <main className="px-5">
          <div className="min-h-[48px] flex flex-col justify-end pl-3 mb-2">
            <h2 className="font-bold text-2xl">Browse all</h2>
          </div>
          <GenreGrid dataGenre={genres} />
        </main>
      </ScrollArea>
    </div>
  );
};

export default SearchPage;
