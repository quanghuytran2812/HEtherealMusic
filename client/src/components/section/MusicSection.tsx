/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  card,
  section,
  section_title,
  slider,
  slider_inner,
  title_large,
  title_wrapper,
} from "@/lib/classname";
import { cn } from "@/lib/utils";
import { CardMore } from "@/components/cards";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const SectionSkeleton = ({
  title,
  isArtist = false,
}: {
  title: string;
  isArtist?: boolean;
}) => (
  <section className={cn(section)}>
    <div className={cn(title_wrapper)}>
      <h2 className={cn(title_large, section_title)}>{title}</h2>
    </div>
    <div className={cn(slider, "slider")}>
      <div className={cn(slider_inner)}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className={cn(card, "animate-pulse")}>
            <div className={cn(isArtist && "pt-4 px-4")}>
              <div
                className={cn(
                  "h-[170px] bg-zinc-700 flex-shrink-0",
                  isArtist && "rounded-full size-[150px]"
                )}
              />
            </div>

            <div className="flex flex-col gap-2 p-4">
              <div className="h-4 bg-zinc-700 rounded w-3/4" />
              <div className="h-3 bg-zinc-700 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
// Reusable Section Component
interface MusicSectionProps {
  title: string;
  items: Array<any>;
  isLoading: boolean;
  type: "album" | "artist" | "playlist";
}
const MusicSection = ({ title, items, isLoading, type }: MusicSectionProps) => {
  if (isLoading)
    return <SectionSkeleton title={title} isArtist={type === "artist"} />;
  return (
    <section className={cn(section)}>
      <div className={cn(title_wrapper)}>
        <h2 className={cn(title_large, section_title)}>{title}</h2>
      </div>
      <ScrollArea
        className={cn(slider, type === "artist" ? "lg:-mx-6 lg:px-6" : "")}
      >
        <div className={cn(slider_inner)}>
          {items.map((item) => {
            const text =
              type === "album"
                ? item.artists?.map((artist: any) => artist.name).join(", ") ||
                  "Unknown Artist"
                : type === "playlist"
                ? item.description
                : item.type;

            return (
              <CardMore
                key={item._id}
                item={{
                  _id: item._id,
                  title: item.title || item.name,
                  type,
                  text,
                  link: `/${type}/${item._id}`,
                  image_url: item.image_url,
                  songs: item.songs,
                  ...(type === "album" && { year: item.year }),
                }}
              />
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
};

export default MusicSection;
