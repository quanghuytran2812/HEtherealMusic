import { Card } from "@/components/cards";
import { ScrollArea } from "@/components/ui/scroll-area";
import { dataAlums, dataArtist, dataPlaylist } from "@/utils/contants";

const HomePage = () => {
  return (
    <div className="w-[calc(100% + 0px)] h-full right-auto mx-0 mb-0 top-0 left-0 p-0 overflow-hidden">
      <ScrollArea className="h-[calc(100vh-105px)] isolate pb-8 rounded-lg bg-[#121212]">
        <main className="w-full">
          <section className="contain-inline-size pt-3 isolate">
            <div className="px-4 flex flex-wrap flex-row gap-y-6 gap-x-8">
              {/* Popular artists */}
              <Card title="Popular Artists" items={dataArtist} />
              {/* Popular albums and singles */}
              <Card title="Popular albums and singles" items={dataAlums} />
              {/* Popular radio */}
              <Card title="Popular radio" items={dataAlums} />
              {/* Featured Charts */}
              <Card title="Featured Charts" items={dataPlaylist} />
              {/* Playlists from our editors */}
              <Card title="Playlists from our editors" items={dataPlaylist} />
            </div>
          </section>
        </main>
      </ScrollArea>
    </div>
  );
};

export default HomePage;
