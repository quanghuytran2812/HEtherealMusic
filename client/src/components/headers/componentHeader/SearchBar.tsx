import { TooltipButton } from "@/components/tooltips";
import { FolderOpen, Home, Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="flex w-[50%] max-w-[546px] min-w-[350px]">
      <TooltipButton
        tooltipContent="Home"
        icon={<Home size={24} />}
        href="/"
        classLink="flex"
        className="h-full w-12 ms-2 bg-[#1f1f1f] rounded-full flex-shrink-0 hover:scale-105 p-3"
        sizeButton="icon"
      />
      <div className="w-full">
        <div className="relative w-full px-2">
          <form action="#" className="relative w-full">
            <div className="left-0 right-auto absolute top-2/4 -translate-y-1/2 flex start-3 z-10">
              <TooltipButton
                tooltipContent="Search"
                icon={<Search size={24} />}
                href="/search"
                classLink="flex"
                className="h-full break-words p-0"
                sizeButton="icon"
              />
            </div>
            <input
              type="text"
              placeholder="What do you want to play?"
              className="pr-16 text-ellipsis bg-[#1f1f1f] rounded-[500px] text-base 
            font-normal py-3 pl-14 appearance-none box-border block w-full"
            />
            <div className="absolute top-2/4 -translate-y-1/2 flex end-3 z-10">
              <div className="pl-3 pr-1 border-s-[1px] border-[#7c7c7c] flex items-center">
                <TooltipButton
                  tooltipContent="Browse"
                  icon={<FolderOpen size={24} />}
                  href="/search"
                  classLink="flex"
                  className="h-full break-words p-0"
                  sizeButton="icon"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
