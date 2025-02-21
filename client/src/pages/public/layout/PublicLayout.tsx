import { Header } from "@/components/headers";
import { NowPlayingBar } from "@/components/playingbar";
import { LeftSidebar } from "@/components/sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  
  return (
    <div className="h-full dark:bg-[#000000] flex flex-col p-2 gap-2">
      <Header />
      <ResizablePanelGroup
        direction="horizontal"
        className="flex flex-1 h-full overflow-hidden gap-1"
      >
        <ResizablePanel
          defaultSize={24}
          minSize={isMobile ? 0 : 24}
          maxSize={30}
        >
          <LeftSidebar />
        </ResizablePanel>
        <ResizableHandle
          className="bg-transparent
             active:bg-[#b3b3b3] hover:bg-[#b3b3b3]"
        />
        {/* Main Content  */}
        <ResizablePanel defaultSize={isMobile ? 80 : 60}>
          <Outlet />
        </ResizablePanel>

        {/* <ResizableHandle
          className="bg-transparent
             active:bg-[#b3b3b3] hover:bg-[#b3b3b3]"
        />
        right side
        <ResizablePanel
          defaultSize={20}
          minSize={0}
          maxSize={25}
          collapsedSize={0}
        /> */}
      </ResizablePanelGroup>
      <NowPlayingBar />
    </div>
  );
};

export default PublicLayout;
