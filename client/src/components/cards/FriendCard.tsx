import { Artist } from "@/utils/types";
import { cn } from "@/lib/utils";

interface FriendCardProps {
  friend: Artist;
}

const FriendCard = ({ friend }: FriendCardProps) => {
  return (
    <div
      className={cn(
        "flex items-center gap-3 p-2 rounded-md hover:bg-accent transition-colors"
      )}
    >
      <div className="flex-shrink-0">
        <img
          src={friend.image_url}
          alt={friend.name}
          className={cn("rounded-full object-cover w-12 h-12")}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="font-medium truncate">{friend.name}</h3>
        <p className="text-xs text-muted-foreground truncate">Friend</p>
      </div>
    </div>
  );
};

export default FriendCard;
