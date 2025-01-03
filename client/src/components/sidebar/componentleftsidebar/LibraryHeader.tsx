import { TooltipButton } from "@/components/tooltips";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Library, ListPlus, Plus } from "lucide-react";

interface LibraryHeaderProps {
  buttonAction: () => void; // Function type for button action
}
const LibraryHeader = ({ buttonAction }: LibraryHeaderProps) => {
  return (
    <header className="flex flex-col gap-2 pb-2 px-4 pt-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1 text-[#b3b3b3] hover:cursor-pointer hover:text-white">
          <TooltipButton
            tooltipContent="Collapse Your Library"
            icon={<Library size={24} strokeWidth={3} />}
            className="flex justify-start flex-shrink-0 py-1 px-2 font-bold text-base transition-colors"
            classLink="flex"
            title="Your Library"
          />
        </div>
        <span className="flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="hover:bg-zinc-800 rounded-full p-2 size-6">
                <Plus size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#282828] text-white border-transparent">
              <DropdownMenuItem className="focus:bg-white focus:bg-opacity-10 focus:text-white cursor-pointer">
                <ListPlus />
                <Button onClick={buttonAction} className="p-0">
                  <span>Create a new playlist</span>
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </span>
      </div>
    </header>
  );
};

export default LibraryHeader;
