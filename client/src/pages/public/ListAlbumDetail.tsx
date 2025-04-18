import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowDown,
  ArrowUp,
  List
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Components
import { Button } from "@/components/ui/button";

// Styles
import {
  body_medium
} from "@/lib/classname";
import { cn } from "@/lib/utils";

// Store
import { useMusicStore } from "@/stores/useMusicStore";
import { useLibraryStore } from "@/stores/useLibraryStore";
import { ListAlbumItem } from "@/components/list";
type SortField = "release-date" | "name";
type SortDirection = "desc" | "asc";

const ListAlbumDetail = () => {
  const { artistId } = useParams<{ artistId: string }>();
  const { artist, albumsByArtist, getAllAlbumsByArtist, getArtistById } =
    useMusicStore();
  const {
    libraryMe,
    isLoading: isLibraryLoading,
    addToLibrary,
    removeFromLibrary,
  } = useLibraryStore();
  const [sortField, setSortField] = useState<SortField>("release-date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  // Fetch data
  const fetchData = useCallback(async () => {
    if (!artistId) return;
    await Promise.all([
      getAllAlbumsByArtist(artistId),
      getArtistById(artistId),
    ]);
  }, [artistId, getAllAlbumsByArtist, getArtistById]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Memoized artist name to prevent unnecessary re-renders
  const artistName = useMemo(() => artist?.name || "Artist", [artist]);

  // Sort albums based on selected option
  const sortedAlbums = useMemo(() => {
    return [...albumsByArtist].sort((a, b) => {
      if (sortField === "release-date") {
        const dateA = new Date(a.createdAt || 0).getTime();
        const dateB = new Date(b.createdAt || 0).getTime();
        return sortDirection === "desc" ? dateB - dateA : dateA - dateB;
      } else {
        return sortDirection === "desc"
          ? b.title.localeCompare(a.title)
          : a.title.localeCompare(b.title);
      }
    });
  }, [albumsByArtist, sortField, sortDirection]);

  const toggleSortDirection = () => {
    setSortDirection((prev) => (prev === "desc" ? "asc" : "desc"));
  };

  const handleSortFieldChange = (field: SortField) => {
    if (sortField === field) {
      toggleSortDirection();
    } else {
      setSortField(field);
      setSortDirection("desc"); // Reset to default direction when changing field
    }
  };

  const getSortIcon = () => {
    return sortDirection === "desc" ? (
      <ArrowDown size={16} />
    ) : (
      <ArrowUp size={16} />
    );
  };

  return (
    <div className="relative pt-10 md:pt-0 md:rounded-lg md:overflow-hidden">
      <div className="px-5">
        <div className="h-10 mt-16 flex items-center justify-between">
          <Link to={`/artist/`} className="text-2xl font-extrabold">
            {artistName}
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="hover:text-white gap-2">
                <span className={cn(body_medium)}>
                  {sortField === "release-date" ? "Release date" : "Name"}
                </span>
                <List size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 p-1 bg-[#282828] border-none"
            >
              <DropdownMenuLabel className="text-xs text-[#FFFFFFB2] py-3 pl-3 pr-2">
                Sort by
              </DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => handleSortFieldChange("release-date")}
                className={cn(
                  "flex items-center justify-between py-3 pl-3 pr-2 focus:bg-[#535353] focus:cursor-pointer",
                  sortField === "release-date" && "text-[#1ED760]"
                )}
              >
                Release date
                {sortField === "release-date" && getSortIcon()}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleSortFieldChange("name")}
                className={cn(
                  "flex items-center justify-between py-3 pl-3 pr-2 focus:bg-[#535353] focus:cursor-pointer",
                  sortField === "name" && "text-[#1ED760]"
                )}
              >
                Name
                {sortField === "name" && getSortIcon()}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {sortedAlbums.map((album) => (
          <ListAlbumItem
            key={album._id}
            album={album}
            libraryMe={libraryMe}
            isLibraryLoading={isLibraryLoading}
            addToLibrary={addToLibrary}
            removeFromLibrary={removeFromLibrary}
          />
        ))}
      </div>
    </div>
  );
};

export default ListAlbumDetail;