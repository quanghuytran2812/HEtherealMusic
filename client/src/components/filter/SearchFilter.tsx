import { chip, filter_list, label_large } from "@/lib/classname";
import { cn } from "@/lib/utils";
import { filterItems } from "@/utils/contants";
import { SearchResult } from "@/utils/types";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

interface SearchFilterProps {
  items: SearchResult;
  type: string;
  query: string; // Add query prop
}

const SearchFilter = ({ items, type, query }: SearchFilterProps) => {
  const hasDataForFilterType = (filterType: string): boolean => {
    switch (filterType) {
      case "songs":
        return !!items.songs?.length;
      case "artists":
        return !!items.artists?.length;
      case "albums":
        return !!items.albums?.length;
      case "playlists":
        return !!items.playlists?.length;
      case "users":
        return !!items.users?.length;
      case "genres":
        return !!items.genres?.length;
      case "all":
        return true;
      default:
        return false;
    }
  };

  return (
    <div className={cn(filter_list, "filter-list")}>
      {filterItems.map(({ filterType, text }, index) => {
        if (!hasDataForFilterType(filterType)) {
          return null;
        }
        return (
          <Link
            to={`/search/${filterType}/${encodeURIComponent(query)}`}
            className={cn(
              chip,
              filterType === type ? "bg-[#364B3F] text-[#D0E8D7]" : ""
            )}
            key={index}
          >
            {filterType === type && (
              <span className="material-symbols-rounded w-4">
                <Check size={16} />
              </span>
            )}
            <span className={cn(label_large)}>{text}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default SearchFilter;