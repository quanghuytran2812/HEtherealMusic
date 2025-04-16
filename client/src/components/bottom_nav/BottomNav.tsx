import {
  bottom_nav,
  bottom_nav_item,
  bottom_nav_responsive,
  icon_wrapper,
  label_medium,
} from "@/lib/classname";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import navItems from "@/components/bottom_nav/nav/NavItems";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useLibraryStore } from "@/stores/useLibraryStore";
import { useEffect, useMemo, useState } from "react";
import { ListLibrary } from "@/components/list";
import IconButton from "@/components/top_bar/icon_btn/IconButton";
import { ArrowLeft, ArrowRight, Library, Plus, X } from "lucide-react";
import { FilterButton } from "@/components/play_button";
import { Button } from "@/components/ui/button";
import { ListLibrarySkeleton, FilterButtonsSkeleton } from "@/components/skeletons";

const BottomNav = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { libraryMe, fetchLibraryMe, isLoading, error } = useLibraryStore();
  const location = useLocation();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [showAllFilters, setShowAllFilters] = useState(true);

  useEffect(() => {
    fetchLibraryMe();
  }, [fetchLibraryMe]);

  // Memoize the current route to avoid recalculating on every render
  const currentRoute = useMemo(() => location.pathname, [location.pathname]);

  // Extract unique types from libraryMe.items
  const uniqueTypes = useMemo(() => {
    if (!libraryMe || !libraryMe.items) return [];
    const types = libraryMe.items.map((item) => item.type);
    return [...new Set(types)]; // Remove duplicates
  }, [libraryMe]);

  // Filter library items based on active filter
  const filteredItems = useMemo(() => {
    if (!libraryMe?.items) return [];
    return activeFilter
      ? libraryMe.items.filter((item) => item.type === activeFilter)
      : libraryMe.items;
  }, [libraryMe, activeFilter]);

  const handleFilterClick = (type: string) => {
    setActiveFilter(type);
    setShowAllFilters(false);
  };

  const handleClearFilter = () => {
    setActiveFilter(null);
    setShowAllFilters(true);
  };

  return (
    <nav
      className={cn(
        bottom_nav,
        bottom_nav_responsive,
        "bottom-nav md:overflow-hidden transition-all duration-500 ease-in-out",
        isCollapsed ? "md:w-20" : "md:w-[290px]"
      )}
    >
      {navItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(bottom_nav_item, "bottom-nav-item md:hidden")}
        >
          <div
            className={cn(
              icon_wrapper,
              "ease-in-out duration-200 transition-all",
              currentRoute === item.href && "bg-[#364B3F] rounded-full"
            )}
            style={{ "--state-layer-bg": "#C5C7C3" } as React.CSSProperties}
          >
            <span className="material-symbols-rounded">
              <item.icon
                className={cn(currentRoute === item.href && "text-white")}
              />
            </span>

            <div className="state-layer"></div>
          </div>

          <p
            className={cn(
              label_medium,
              "bottom-nav-text lg:text-base",
              currentRoute === item.href && "text-white"
            )}
          >
            {item.text}
          </p>
        </Link>
      ))}
      <div className="hidden md:block">
        {/* Library Header */}
        <div
          className={cn(
            "flex items-center justify-between px-2 pt-1 pb-2",
            isCollapsed && "flex-col"
          )}
        >
          <div className="flex items-center justify-start text-sm font-bold">
            <IconButton icon={<Library />} />
            {!isCollapsed && "Your Library"}
          </div>
          <div className="flex items-center">
            {!isCollapsed && (
              <IconButton icon={<Plus size={18} />} variant="size-9" />
            )}
            <IconButton
              icon={
                isCollapsed ? <ArrowRight size={18} /> : <ArrowLeft size={18} />
              }
              variant="size-9 bg-[#2A2A2A]"
              onClick={() => setIsCollapsed(!isCollapsed)}
            />
          </div>
        </div>
        {/* Filter Buttons */}
        {!isCollapsed && (
          <div className="relative overflow-hidden mx-4 mb-2">
            <ScrollArea className="whitespace-nowrap">
              {isLoading ? (
                <FilterButtonsSkeleton />
              ) : (
                <div className="flex w-max space-x-2 my-2">
                  {showAllFilters ? (
                    uniqueTypes.map((type) => {
                      let label = "";
                      switch (type) {
                        case "Album":
                          label = "Albums";
                          break;
                        case "Playlist":
                          label = "Playlists";
                          break;
                        case "User":
                          label = "Artists";
                          break;
                        default:
                          return null;
                      }
                      return (
                        <FilterButton
                          key={type}
                          label={label}
                          isActive={activeFilter === type}
                          onClick={() => handleFilterClick(type)}
                        />
                      );
                    })
                  ) : (
                    <div className="flex w-max space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-7 rounded-full bg-[#FFFFFF1A] hover:bg-[#FFFFFF2A]"
                        onClick={handleClearFilter}
                      >
                        <X size={16} />
                      </Button>
                      <FilterButton
                        label={
                          activeFilter === "Album"
                            ? "Albums"
                            : activeFilter === "Playlist"
                            ? "Playlists"
                            : activeFilter === "User"
                            ? "Artists"
                            : ""
                        }
                        isActive={true}
                      />
                    </div>
                  )}
                </div>
              )}
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        )}
        <ScrollArea className="h-[300px]">
          {isLoading ? (
            <ListLibrarySkeleton />
          ) : error ? (
            <div className="text-center p-4 text-red-500">
              Error loading library
            </div>
          ) : (
            filteredItems.map((item, index) => (
              <ListLibrary key={index} index={index} item={item} />
            ))
          )}
        </ScrollArea>
      </div>
    </nav>
  );
};

export default BottomNav;
