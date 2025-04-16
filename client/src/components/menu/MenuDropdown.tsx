import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MenuItem } from "@/utils/types";
import { Link } from "react-router-dom";

interface MenuDropdownProps {
  items: MenuItem[]; // Array of menu items
  classItems?: string; // Class for the menu items
  itemsPerGroup?: number; // Number of items before a separator
  itemMenuTrigger: React.ReactNode;
}
const MenuDropdown = ({
  items,
  classItems,
  itemsPerGroup = 2,
  itemMenuTrigger,
}: MenuDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{itemMenuTrigger}</DropdownMenuTrigger>
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

export default MenuDropdown;
