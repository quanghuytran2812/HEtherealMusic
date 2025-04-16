import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import IconButton from "@/components/top_bar/icon_btn/IconButton";
import { FolderOpen, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  body_large,
  icon_btn,
  input,
  search_bar,
  search_field,
} from "@/lib/classname";
import { useEffect, useState } from "react";
import { MenuDropdown } from "@/components/menu";
import { MenuProfile } from "@/components/top_bar/menu/MenuItem";
import { useNavigate, useParams } from "react-router-dom";

interface SearchBarProps {
  display_name: string;
  images: string;
}

const SearchBar = ({ display_name, images }: SearchBarProps) => {
  const navigate = useNavigate();
  const [localQuery, setLocalQuery] = useState("");
  const { type } = useParams();

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localQuery.trim()) {
        navigate(`/search/${type || "all"}/${encodeURIComponent(localQuery)}`)
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [localQuery, navigate, type]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalQuery(e.target.value);
  };

  return (
    <div className={cn(search_bar, "search_bar")}>
      <IconButton
        icon={<Search size={24} />}
        variant="p-0 h-12 w-fit hover:text-white hover:scale-105 pointer-events-none"
        aria-label="Search"
      />

      <form action="/search" method="post" className="search_form flex-grow">
        <label htmlFor="search" className="sr-only">
          What do you want to listen to?
        </label>

        <input
          type="search"
          value={localQuery}
          onChange={handleChange}
          placeholder="What do you want to listen to?"
          className={cn(body_large, input, search_field, "search_field")}
          required
        />
      </form>

      <IconButton
        href="/explore"
        icon={<FolderOpen size={24} />}
        variant="hidden md:flex p-0 hover:scale-105 hover:text-white"
        classSpan="border-l border-[#7c7c7c] pl-3"
      />

      <div className="menu_wrapper relative md:absolute md:right-4 lg:right-6">
        <MenuDropdown
          items={MenuProfile}
          itemsPerGroup={3}
          itemMenuTrigger={
            <Button
              className={cn(icon_btn, "p-0 flex items-center gap-0")}
              aria-label="My profile"
            >
              <Avatar className="size-8 md:size-9 object-cover object-center cursor-pointer">
                <AvatarImage src={images} />
                <AvatarFallback>{display_name}</AvatarFallback>
              </Avatar>

              <div className="state_layer"></div>
            </Button>
          }
        />
      </div>

      <IconButton icon={<X />} variant="clear" onClick={() => setLocalQuery("")} />
    </div>
  );
};

export default SearchBar;
