import { lazy, Suspense } from "react";
import { useRightSidebarStore } from "@/stores/useRightSidebarStore";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load the sidebar components
const FriendList = lazy(() => import("@/components/sidebar/FriendList"));
const SongQueue = lazy(() => import("@/components/sidebar/SongQueue"));

const RightLayout = () => {
  const { view, isOpen } = useRightSidebarStore();

  return (
    <div
      className={cn(
        "hidden md:flex right-sidebar rounded-lg absolute right-0 top-0 w-80 h-full z-40 transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "translate-x-96"
      )}
    >      
      <div className="w-80 h-full bg-[#1D201E]">
        {/* Content */}
        <div className="h-full pt-4 pb-4 px-4 overflow-y-auto slider">
          <Suspense
            fallback={
              <div className="space-y-4">
                {Array(8)
                  .fill(0)
                  .map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full rounded" />
                  ))}
              </div>
            }
          >
            {view === "users" && <FriendList />}
            {view === "queue" && <SongQueue />}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default RightLayout;
