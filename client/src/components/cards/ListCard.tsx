import {
  CheckCircle2,
  CirclePlus,
  DiscAlbum,
  Ellipsis,
  ListMusic,
  Play,
  Plus,
  PlusCircle,
  User
} from "lucide-react";
import { TooltipButton } from "../tooltips";
import { DropdownMenuCustom } from "../menu";

interface Track {
  _id: number;
  imageUrl: string;
  title: string;
  artist: string;
  albumName: string;
  isLiked: boolean;
}

interface ListCardsProps {
  title: string;
  description?: string;
  classSection?: string;
  tracks: Track[];
}
const ListCard = ({ title, description, classSection, tracks }: ListCardsProps) => {
  return (
    <section className={`flex flex-col relative min-w-full min-h-[260px] ${classSection}`}>
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
      <div className="-mx-3">
        {tracks.map((item, i) => (
          <div
            key={item._id}
            className="grid grid-cols-[16px_4fr_4fr_1.2fr] gap-4 px-4 py-2 text-sm text-[#b3b3b3] hover:bg-white/5 rounded-md group cursor-pointer"
          >
            <div className="flex items-center justify-center">
              <span className="group-hover:hidden">{i + 1}</span>
              <Play
                fill="white"
                className="h-4 w-4 text-white hidden group-hover:block"
              />
            </div>
            <div className="h-14 px-4 flex flex-row items-center">
              <img
                src={item.imageUrl}
                className="rounded mr-3 object-cover object-center size-10"
              />
              <div className="flex flex-col">
                <p className="text-white text-base font-normal">{item.title}</p>
                <span className="text-sm font-normal">{item.artist}</span>
              </div>
            </div>
            <div className="flex items-center">
              <span className="block overflow-hidden whitespace-normal break-all truncate">
                <a href="#" className="text-sm font-normal">
                  {item.albumName}
                </a>
              </span>
            </div>
            <div className="flex flex-row items-center">
              {/* Liked or Not Liked */}
              {item.isLiked ? (
                <TooltipButton
                  tooltipContent="Add to playlist"
                  icon={
                    <CheckCircle2
                      fill="#1ed760"
                      className="text-black size-5"
                    />
                  }
                  className="flex mr-3 items-center flex-shrink-0 hover:scale-105"
                  sizeButton="icon"
                />
              ) : (
                <TooltipButton
                  tooltipContent="Add to Liked Songs"
                  icon={
                    <CirclePlus className="size-4 hidden group-hover:block" />
                  }
                  className="flex mr-3 items-center flex-shrink-0 hover:scale-105"
                  sizeButton="icon"
                />
              )}
              <div>4:04</div>
              <DropdownMenuCustom
                tooltip={{
                  triggerIcon: <Ellipsis className="size-5" />,
                  tooltipContent: "More options"
                }}
                items={[
                  { id: 1, title: 'Add to playlist', icon: <Plus size={16} className="text-[#b3b3b3]" /> },
                  { id: 2, title: 'Save to your Liked Songs', icon: <PlusCircle size={16} className="text-[#b3b3b3]" /> },
                  { id: 3, title: 'Go to artist', icon: <User size={16} className="text-[#b3b3b3]" /> },
                  { id: 4, title: 'Go to album', icon: <DiscAlbum size={16} className="text-[#b3b3b3]" /> },
                  { id: 5, title: 'View credits', icon: <ListMusic size={16} className="text-[#b3b3b3]" /> },
                ]}
                classItems="flex-row-reverse justify-end text-[#FFFFFFE6] hover:text-white"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ListCard;
