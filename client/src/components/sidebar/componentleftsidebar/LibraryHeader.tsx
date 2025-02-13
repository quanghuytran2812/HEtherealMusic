import { DropdownMenuCustom } from "@/components/menu";
import { TooltipButton } from "@/components/tooltips";
import { Library, Plus } from "lucide-react";

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
        <DropdownMenuCustom
          tooltip={{
            tooltipContent: 'Create playlist or folder',
            triggerIcon: <Plus size={20} />,
          }}
          items={[
            { id: 1, title: 'Create a new playlist', onClick: buttonAction },
          ]}
        />
        </span>
      </div>
    </header>
  );
};

export default LibraryHeader;
