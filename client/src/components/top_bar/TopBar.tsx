import IconButton from "@/components/top_bar/icon_btn/IconButton";
import SearchBar from "@/components/top_bar/search_bar/SearchBar";
import { bottom_nav_item, icon_wrapper, top_bar } from "@/lib/classname";
import { cn } from "@/lib/utils";
import { useMeStore } from "@/stores/useMeStore";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

const TopBar = () => {
  const { me } = useMeStore();
  // Safely get the last image URL or empty string as fallback
  const lastImageUrl = me?.imageUrl?.slice(-1)[0] || "";
  const displayName = me?.name || "User";

  return (
    <div className={cn(top_bar, "top_bar")}>
      <Link 
        to="/"
        className={cn(bottom_nav_item, "hidden bottom-nav-item md:block")}
      >
        <div className={cn(icon_wrapper)}>
          <img
            src="/logo.svg"
            alt="HEthereal"
            className={cn("size-8 bg-white rounded-full")}
            loading="lazy"
            decoding="async"
          />
        </div>
      </Link>
      <IconButton href="/" icon={<Home size={24} />} variant="bg-[#272b28] p-0 hover:text-white hover:scale-105" aria-label="Home"/>

      <SearchBar
        display_name={displayName}
        images={lastImageUrl}
      />
    </div>
  );
};

export default TopBar;
