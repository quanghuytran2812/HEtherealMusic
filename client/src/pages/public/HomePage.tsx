import { Card } from "@/components/cards";
import { FooterMainContent } from "@/components/footers";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAlbumStore } from "@/stores/useAlbumStore";
import { dataAlums, dataArtist, dataPlaylist } from "@/utils/contants";
import { useEffect } from "react";

const HomePage = () => {
  const { albums, getAlbums } = useAlbumStore();

  useEffect(() => {
    getAlbums();
  }, [getAlbums]);
  return (
    <div className="w-[calc(100% + 0px)] overflow-hidden">
      <ScrollArea className="h-[calc(100vh-105px)] rounded-lg bg-[#121212]">
        <main className="w-full">
          <section className="contain-inline-size pt-3 isolate">
            <div className="px-4 flex flex-wrap flex-row gap-y-6 gap-x-8">
              {/* Popular artists */}
              <Card title="Popular Artists" items={dataArtist} />
              {/* Popular albums and singles */}
              <Card title="Popular albums and singles" items={dataAlums} />
              {/* Popular radio */}
              <Card title="New Releases" items={albums} link="album"/>
              {/* Featured Charts */}
              <Card title="Featured Charts" items={dataPlaylist} />
              {/* Playlists from our editors */}
              <Card title="Playlists from our editors" items={dataPlaylist} />
            </div>
          </section>
        </main>
        <FooterMainContent />
      </ScrollArea>
    </div>
  );
};

export default HomePage;
