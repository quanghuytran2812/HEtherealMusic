import { Play } from "lucide-react";
import { TooltipButton } from "../tooltips";

type CardProps<T> = {
  title: string;
  items: T[];
};

const Card = <
  T extends {
    _id: number;
    title: string;
    imageUrl?: string;
    artist?: string;
    desc?: string;
  }
>({
  title,
  items,
}: CardProps<T>) => {
  return (
    <section className="flex flex-col relative min-w-full min-h-[260px]">
      <header className="flex justify-between mb-2">
        <h2 className="text-2xl font-bold text-balance">
          <a href="#" className="hover:underline">
            {title}
          </a>
        </h2>
        <a
          href="#"
          className="text-[#b3b3b3] font-bold text-sm hover:underline"
        >
          Show all
        </a>
      </header>
      <div className="-mx-3 grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))]">
        {items.map((item) => (
          <CardItem
            key={item._id}
            title={item.title}
            imageUrl={item.imageUrl}
            artist={item.artist}
            desc={item.desc}
          />
        ))}
      </div>
    </section>
  );
};

const CardItem: React.FC<{
  title: string;
  imageUrl?: string;
  artist?: string;
  desc?: string;
}> = ({ title, imageUrl, artist, desc }) => {
  return (
    <div className="group px-3 py-3 inline-flex flex-col gap-2 cursor-pointer relative rounded-md hover:bg-zinc-800">
      <div className="relative">
        <img
          src={
            imageUrl ||
            "https://img.freepik.com/premium-photo/woman-s-face-with-landscape-background_250469-18401.jpg"
          }
          alt={title}
          className={`w-36 h-36 object-center object-cover ${
            artist || desc ? "rounded-lg" : "rounded-full"
          }`}
        />
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
      <div className="flex gap-3 items-center">
        <div className="flex flex-col gap-1 basis-full items-start">
          <a href="#" className="hover:underline">
            <p className="text-base font-normal truncate">{title}</p>
          </a>
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
