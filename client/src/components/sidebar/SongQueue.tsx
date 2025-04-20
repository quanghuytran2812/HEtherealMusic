import { usePlayerStore } from "@/stores/usePlayerStore";
import { SongCard } from "@/components/cards";
import { EmptyState } from "@/components/alerts";
import IconButton from "../top_bar/icon_btn/IconButton";
import { X } from "lucide-react";
import { useRightSidebarStore } from "@/stores/useRightSidebarStore";

const SongQueue = () => {
  const { queue, currentIndex, currentSong } = usePlayerStore();
  const { closeSidebar } = useRightSidebarStore();

  if (!queue || queue.length === 0) {
    return (
      <EmptyState
        title="Queue is empty"
        description="Songs you play will appear here"
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold px-2">Queue</h2>

        {/* Close button */}
        <IconButton
          icon={<X size={20} />}
          onClick={closeSidebar}
        />
      </div>
      {/* Now Playing section */}
      {currentSong && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground px-2">
            Now Playing
          </h3>
          <SongCard
            song={currentSong}
            variant="now-playing"
          />
        </div>
      )}

      {/* Upcoming section */}
      {queue.length > currentIndex + 1 && (
        <div className="space-y-2 pt-6">
          <h3 className="text-sm font-medium text-muted-foreground px-2">
            Upcoming
          </h3>
          <div className="space-y-2">
            {queue.slice(currentIndex + 1).map((song, index) => (
              <SongCard
                key={`${song._id}-${index}`}
                song={song}
                variant="queue"
                arrSongs={queue}
              />
            ))}            
          </div>
        </div>
      )}
    </div>
  );
};

export default SongQueue;
