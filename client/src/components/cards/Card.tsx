import { Play } from "lucide-react";
import { TooltipButton } from "../tooltips";
import { Link } from "react-router-dom";

type CardProps<T> = {
  title: string;
  description?: string;
  classSection?: string;
  link?: string;
  items: T[];
};

const Card = <
  T extends {
    _id: string;
    title: string;
    imageUrl?: string;
    artists?: string;
    desc?: string;
  }
>({
  title,
  description,
  classSection,
  link,
  items,
}: CardProps<T>) => {
  return (
    <section
      className={`flex flex-col relative min-w-full min-h-[260px] ${classSection}`}
    >
      <header className="flex justify-between mb-2">
        <h2 className="flex flex-col text-2xl font-bold text-balance gap-1">
          <a href="#" className="hover:underline">
            {title}
          </a>
          <p className="text-[#b3b3b3] text-sm font-normal">{description}</p>
        </h2>
        <a
          href="#"
          className="flex flex-col justify-end text-[#b3b3b3] font-bold text-sm hover:underline"
        >
          Show all
        </a>
      </header>
      <div className="-mx-3 grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))]">
        {items.map((item) => (
          <CardItem
            key={item._id}
            _id={item._id}
            title={item.title}
            imageUrl={item.imageUrl}
            artist={item.artists}
            desc={item.desc}
            link={link}
          />
        ))}
      </div>
    </section>
  );
};

const CardItem: React.FC<{
  _id: string;
  title: string;
  imageUrl?: string;
  artist?: string;
  desc?: string;
  link?: string;
}> = ({ _id, title, imageUrl, artist, desc, link }) => {
  return (
    <div className="group px-3 py-3 inline-flex flex-col gap-2 cursor-pointer relative rounded-md hover:bg-zinc-800">
      <div className="relative">
        <Link to={`/${link}/` + _id}>
          <img
            src={imageUrl}
            alt={title}
            className={`w-36 h-36 object-center object-cover ${
              artist || desc ? "rounded-lg" : "rounded-full"
            }`}
          />
        </Link>
        <div className="absolute right-3 bottom-3 opacity-0 z-50 transform translate-y-2 transition-all duration-200 ease-out group-hover:opacity-100">
          <TooltipButton
            tooltipContent={`Play ${title} ${artist ? `by ${artist}` : ""}`}
            icon={<Play fill="black" className="text-black size-6" />}
            classLink="relative bg-[#1ed760] flex items-center justify-center w-12 h-12 rounded-full"
            className="w-full h-full"
            sizeButton="icon"
          />
        </div>
      </div>
      <div className="flex gap-3 items-center overflow-hidden">
        <div className="flex flex-col gap-1 basis-full items-start">
          <Link to={`/${link}/` + _id} className="hover:underline">
            <p className="text-base font-normal truncate">{title}</p>
          </Link>
          <div className="text-[#b3b3b3] text-sm font-normal">
            {artist && artist.length > 36 ? (
              `${artist.slice(0, 36)}...`
            ) : artist ? (
              artist
            ) : desc && desc.length > 36 ? (
              `${desc.slice(0, 36)}...`
            ) : desc ? (
              desc
            ) : (
              <span>Artist</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
