import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { TooltipButton } from "@/components/tooltips";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MenuItem } from "@/utils/types";

interface TooltipItem {
  triggerIcon: React.ReactNode; // Icon for the trigger button
  tooltipContent: string; // Tooltip for the trigger
}

interface AvatarItem {
  imageUrl: string;
  name: string;
}

interface CustomDropdownMenuProps {
  tooltip?: TooltipItem;
  items: MenuItem[]; // Array of menu items
  classItems?: string; // Class for the menu items
  itemsPerGroup?: number; // Number of items before a separator
  avatar?: AvatarItem;
}

const DropdownMenuCustom = ({
  tooltip,
  items,
  classItems,
  itemsPerGroup = 2,
  avatar,
}: CustomDropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        {avatar ? (
          <Avatar className="size-8">
            <AvatarImage src={avatar?.imageUrl} />
            <AvatarFallback>{avatar?.name}</AvatarFallback>
          </Avatar>
        ) : (
          <TooltipButton
            tooltipContent={tooltip?.tooltipContent || ""}
            icon={tooltip?.triggerIcon}
            className="flex items-center flex-shrink-0 hover:scale-105"
            sizeButton="icon"
            onClick={handleToggle} // Toggle dropdown on click
          />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-48 p-1 bg-[#282828] border-none text-white">
        {items.map((item, index) => (
          <React.Fragment key={item.id}>
            <DropdownMenuItem className="focus:bg-[#535353]">
              {item.path ? (
                <Link
                  className={`flex w-full justify-between items-center text-start py-1 pl-2 pr-1 hover:underline ${classItems}`}
                  to={item.path}
                >
                  {item.title}
                  {item.icon}
                </Link>
              ) : (
                <span
                  className={`flex w-full gap-3 items-center py-1 pl-2 pr-1 cursor-pointer hover:underline ${classItems}`}
                  onClick={item.onClick}
                >
                  {item.title}
                  {item.icon}
                </span>
              )}
            </DropdownMenuItem>

            {/* Add a separator if this is not the last item and if the number of items processed is a multiple of itemsPerGroup */}
            {index < items.length - 1 && (index + 1) % itemsPerGroup === 0 && (
              <DropdownMenuSeparator className="bg-[#B3B3B377] h-[0.5px]" />
            )}
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownMenuCustom;