import { ScrollArea } from "../ui/scroll-area";
import { dataLikeSong, dataPlaylist } from "@/utils/contants";
import {
  AnnouncementTooltip,
  InfoSection,
  LegalLinksSection,
  LibraryHeader,
  PlaylistLink,
} from "./componentleftsidebar";
import { useState } from "react";

const LeftSidebar = () => {
  const isData = false;
  const isLoggedIn = false;
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const handleCreatePlaylist = () => {
    if (isLoggedIn) {
      console.log("Create playlist");
    } else {
      setTooltipVisible(true);
    }
  };

  return (
    <>
      <div className="h-full flex flex-col gap-2">
        <div className="rounded-lg bg-[#121212]">
          <LibraryHeader buttonAction={handleCreatePlaylist} />
          <div className="flex items-center gap-2 mx-4 my-2"></div>

          {isData ? (
            <ScrollArea className="h-[calc(100vh-300px)]">
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
          {isData ? null : <LegalLinksSection />}
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
