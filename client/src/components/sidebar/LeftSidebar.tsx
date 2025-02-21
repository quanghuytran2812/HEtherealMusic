import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { dataLikeSong, dataPlaylist } from "@/utils/contants";
import {
  AnnouncementTooltip,
  InfoSection,
  LegalLinksSection,
  LibraryHeader,
  PlaylistLink,
} from "./componentleftsidebar";
import { useState } from "react";
import { useMeStore } from "@/stores/useMeStore";
import { Button } from "../ui/button";
import { List, Search } from "lucide-react";

const LeftSidebar = () => {
  const { me } = useMeStore();
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const handleCreatePlaylist = () => {
    if (me) {
      // console.log("Create playlist");
    } else {
      setTooltipVisible(true);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="rounded-lg bg-[#121212]">
          <LibraryHeader buttonAction={handleCreatePlaylist} />
          <div className="mx-4">
            {me && (
              <div className="relative overflow-hidden">
                <ScrollArea className="whitespace-nowrap">
                  <div className="flex w-max space-x-4 my-2">
                    <Button className="bg-[#FFFFFF1A] h-fit rounded-full text-white px-3 py-[6px] mr-2">
                      <span className="text-sm font-normal">Playlists</span>
                    </Button>
                    <Button className="bg-[#FFFFFF1A] h-fit rounded-full text-white px-3 py-[6px] mr-2">
                      <span className="text-sm font-normal">Artists</span>
                    </Button>
                    <Button className="bg-[#FFFFFF1A] h-fit rounded-full text-white px-3 py-[6px] mr-2">
                      <span className="text-sm font-normal">Albums</span>
                    </Button>
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>
            )}
          </div>

          {me ? (
            <ScrollArea className="h-[calc(100vh-210px)]">
              <div className="w-[360px] gap-2 px-2 pt-0 pb-2">
                {/* Search */}
                <div className="flex items-center justify-between pl-2 pr-1 pt-1">
                  <div className="flex items-center">
                    <Search size={16} />
                  </div>
                  <Button className="py-1 pl-4 pr-3 text-sm font-normal">
                    <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                      Alphabetical
                    </span>
                    <List size={16} />
                  </Button>
                </div>
                {/* List of Library */}
                <div className="space-y-2">
                  {dataLikeSong && (
                    <PlaylistLink
                      playlist={{
                        _id: 0,
                        title: "Liked Songs",
                        imageUrl:
                          "https://c4.wallpaperflare.com/wallpaper/949/806/368/artistic-love-heart-wallpaper-preview.jpg",
                        desc: `${dataLikeSong.length} song`,
                      }}
                    />
                  )}
                  {dataPlaylist.map((playlist) => (
                    <PlaylistLink key={playlist._id} playlist={playlist} />
                  ))}
                </div>
              </div>
            </ScrollArea>
          ) : (
            <ScrollArea className="h-[calc(100vh-380px)]">
              <div className="m-0 p-0">
                <div className="flex flex-col gap-2 px-2 pt-0 pb-2 justify-between">
                  <InfoSection
                    title="Create your first playlist"
                    description="It's easy, we'll help you"
                    buttonText="Create playlist"
                    buttonAction={handleCreatePlaylist}
                  />
                  <InfoSection
                    title="Let's find some podcasts to follow"
                    description="We'll keep you updated on new episodes"
                    buttonText="Browse podcasts"
                    buttonAction={() => console.log("Browse podcasts")}
                  />
                </div>
              </div>
            </ScrollArea>
          )}

          {/* left-sidebar-footer */}
          {me ? null : <LegalLinksSection />}
        </div>
        {/* left-sidebar-announcement-modal */}
        <AnnouncementTooltip
          isVisible={tooltipVisible}
          onClose={() => setTooltipVisible(false)}
        />
      </div>
    </>
  );
};

export default LeftSidebar;
