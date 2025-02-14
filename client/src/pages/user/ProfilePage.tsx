import { Card } from "@/components/cards";
import { dataArtist, dataPlaylist, dataSong } from "@/utils/contants";
import {
  Copy,
  Ellipsis,
  Pen,
} from "lucide-react";
import ListCard from "@/components/cards/ListCard";
import { DropdownMenuCustom } from "@/components/menu";
import { ProfileHeader } from "@/components/headers";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FooterMainContent } from "@/components/footers";
import { useMeStore } from "@/stores/useMeStore";

const ProfilePage = () => {
  const { me } = useMeStore();

  return (
    <main className="w-full h-full p-0 overflow-hidden">
      <ScrollArea className="h-[calc(100vh-105px)]">
        <div className="w-full">
          <ProfileHeader />
          <div className="px-5 pb-5 pt-8">
          <DropdownMenuCustom
              tooltip={{
                tooltipContent: `More options for ${me?.name}`,
                triggerIcon: <Ellipsis size={32} />,
              }}
              items={[
                { id: 1, title: 'Edit profile', icon: <Pen size={16} /> },
                { id: 2, title: 'Copy link to profile', icon: <Copy size={16} /> },
              ]}
              classItems="flex-row-reverse justify-end"
            />
          </div>
          <div className="px-5 w-full">
            {/* Top artists this month */}
            <Card title="Top artists this month" description="Only visible to you" items={dataArtist} />
            {/* Top tracks this month */}
            <ListCard tracks={dataSong} classSection="mt-10" title="Top tracks this month" description="Only visible to you"/>
            {/* Public Playlists */}
            <Card title="Public Playlists" classSection="mt-10" items={dataPlaylist.slice(0, 1)} />
            {/* Following */}
            <Card title="Following" classSection="mt-10" items={dataArtist.slice(0, 1)} />
          </div>
        </div>
        <FooterMainContent />
      </ScrollArea>
    </main>
  );
};

export default ProfilePage;
