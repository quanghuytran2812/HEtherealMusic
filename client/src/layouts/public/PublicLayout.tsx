import { lazy, Suspense, useState } from "react";
import { Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";
import { page, page_responsive } from "@/lib/classname";
import { FooterSkeleton } from "@/components/skeletons";
import { PlayerLarge, PlayerSmall } from "@/components/playingbar";
import { AudioPlayer } from "@/components/audio";
import { TopBar } from "@/components/top_bar";
import { BottomNav } from "@/components/bottom_nav";

// Lazy load components that are not immediately needed"));
const Footer = lazy(() => import("@/components/footers/Footer"));
const RightLayout = lazy(() => import("@/layouts/public/RightLayout"));
const PublicLayout = () => {
  const [modal, setModal] = useState(false);

  return (
    <article className={cn(page, page_responsive, "page custom-scrollbar")}>
      {/* AUDIO PLAYER */}
      <AudioPlayer />

      {/* TOP BAR */}
      <TopBar />

      {/* BOTTOM NAV */}
      <BottomNav />

      {/* Main content */}
      <main className="main-view custom-scrollbar md:ml-1">
        <Outlet />
        {/* FOOTER */}
        <Suspense fallback={<FooterSkeleton />}>
          <Footer />
        </Suspense>
      </main>

      <Suspense fallback={<div>Loading...</div>}>
        <RightLayout />
      </Suspense>

      {/* PLAYER SMALL */}
      <PlayerSmall onViewToggle={() => setModal(!modal)} />

      {/* PLAYER LARGE - Only loaded when needed */}
      <PlayerLarge open={modal} setOpen={setModal} />
    </article>
  );
};

export default PublicLayout;
