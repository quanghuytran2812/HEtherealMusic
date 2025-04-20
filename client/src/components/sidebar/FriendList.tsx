import { useFollowStore } from "@/stores/useFollowStore";
import { useEffect } from "react";
import { FriendCard } from "@/components/cards";
import { EmptyState } from "@/components/alerts";
import IconButton from "@/components/top_bar/icon_btn/IconButton";
import { X } from "lucide-react";
import { useRightSidebarStore } from "@/stores/useRightSidebarStore";

const FriendList = () => {
  const { friendsFollowed, fetchFriendsFollowedByUser } = useFollowStore();
  const { closeSidebar } = useRightSidebarStore();

  useEffect(() => {
    fetchFriendsFollowedByUser();
  }, [fetchFriendsFollowedByUser]);

  if (!friendsFollowed || friendsFollowed.items.length === 0) {
    return (
      <EmptyState
        title="See What Friends Are Listening To"
        description="Find out what music your friends are currently loving by following them"
      />
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold px-2">Following</h2>
        {/* Close button */}
        <IconButton icon={<X size={20} />} onClick={closeSidebar} />
      </div>

      {friendsFollowed?.items && friendsFollowed.items.length > 0 && (
        <div className="space-y-2">
          {friendsFollowed.items.map((friend) => (
            <FriendCard key={friend._id} friend={friend} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FriendList;
