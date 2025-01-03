import { Playlist } from "@/utils/types";
import { Link } from "react-router-dom";

interface PlaylistLinkProps {
  playlist: Playlist;
}
const PlaylistLink = ({ playlist }: PlaylistLinkProps) => {
  return (
    <Link
      to={`/albums/${playlist._id}`}
      className="p-2 hover:bg-zinc-800 rounded-md flex items-center gap-3 group cursor-pointer"
    >
      <img
        src={playlist.imageUrl}
        className="size-12 rounded-md flex-shrink-0 object-cover"
        alt={`Cover image for ${playlist.title}`}
      />
      <div className="flex-1 min-w-0 hidden md:block">
        <p className="font-medium truncate">{playlist.title}</p>
        <p className="text-sm text-zinc-400 truncate">
          Playlist • {playlist.desc}
        </p>
      </div>
    </Link>
  );
};

export default PlaylistLink;
