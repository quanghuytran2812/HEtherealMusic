import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FolderOpen, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { icon_btn, search_bar } from "@/lib/classname";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import IconButton from "@/components/top_bar/icon_btn/IconButton";
import { MenuDropdown } from "@/components/menu";
import SearchInput from "@/components/top_bar/search_bar/SearchInput";
import { ProfileMenu } from "@/components/top_bar/menu/MenuItem";

const DEBOUNCE_DELAY = 500;

interface SearchBarProps {
  display_name: string;
  images: string;
}

export const SearchBar = ({ display_name, images }: SearchBarProps) => {
  const navigate = useNavigate();
  const [localQuery, setLocalQuery] = useState("");
  const { type } = useParams();
  const menuItems = ProfileMenu();

  const handleSearchNavigation = useCallback(() => {
    if (localQuery.trim()) {
      navigate(`/search/${type || "all"}/${encodeURIComponent(localQuery)}`);
    }
  }, [localQuery, navigate, type]);

  useEffect(() => {
    const timer = setTimeout(handleSearchNavigation, DEBOUNCE_DELAY);
    return () => clearTimeout(timer);
  }, [handleSearchNavigation]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalQuery(e.target.value);
  }, []);

  const clearSearch = useCallback(() => {
    setLocalQuery("");
  }, []);

  return (
    <div className={cn(search_bar, "search_bar")}>
      <IconButton
        icon={<Search size={24} />}
        variant="p-0 h-12 w-fit hover:text-white hover:scale-105 pointer-events-none"
        aria-label="Search"
      />

      <SearchInput
        value={localQuery}
        onChange={handleChange}
        onClear={clearSearch}
      />

      <IconButton
        href="/explore"
        icon={<FolderOpen size={24} />}
        variant="hidden md:flex p-0 hover:scale-105 hover:text-white"
        classSpan="border-l border-[#7c7c7c] pl-3"
        aria-label="Explore"
      />

      <div className="menu_wrapper relative md:absolute md:right-4 lg:right-6">
        <MenuDropdown
          items={menuItems}
          itemsPerGroup={3}
          itemMenuTrigger={
            <Button
              className={cn(icon_btn, "p-0 flex items-center gap-0")}
              aria-label="Profile menu"
            >
              <Avatar className="size-8 md:size-9 object-cover object-center cursor-pointer">
                <AvatarImage src={images} alt={`${display_name}'s avatar`} />
                <AvatarFallback>
                  {display_name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Button>
          }
        />
      </div>
    </div>
  );
};

export default SearchBar;
