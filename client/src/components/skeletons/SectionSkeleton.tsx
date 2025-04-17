import { card, section, section_title, slider, slider_inner, title_large, title_wrapper } from "@/lib/classname";
import { cn } from "@/lib/utils";

interface SectionSkeletonProps {
  title: string;
  isArtist?: boolean;
}

const SectionSkeleton = ({ title, isArtist = false }: SectionSkeletonProps) => {
  return (
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
};

export default SectionSkeleton;
