import { Button } from "@/components/ui/button";
import { useMeStore } from "@/stores/useMeStore";
import { Link } from "react-router-dom";
import { TooltipButton } from "@/components/tooltips";
import { Bell } from "lucide-react";
import { DropdownMenuCustom } from "@/components/menu";
import Menu from "./MenuItem";

const UserAuthentication = () => {
  const { me } = useMeStore();

  const renderAuthButtons = () => (
    <>
      <Button className="h-12 font-bold text-base py-2 pl-2 pr-8 hover:scale-105 transition-colors">
        <Link to="/signup">Sign up</Link>
      </Button>
      <Button className="h-12 p-0 font-bold text-base bg-white text-black rounded-full hover:bg-white/80 hover:text-black hover:scale-105">
        <Link to="/login" className="py-2 px-8 items-center justify-center">
          Log in
        </Link>
      </Button>
    </>
  );

  const renderUserMenu = () => (
    <div className="flex gap-2">
      <TooltipButton
        tooltipContent="What's New"
        icon={<Bell size={16} />}
        href="/"
        classLink="flex"
        className="ms-2 bg-[#1f1f1f] rounded-full flex-shrink-0 hover:scale-105 px-2"
        sizeButton="icon"
      />
      <DropdownMenuCustom
        avatar={{
          imageUrl: me?.imageUrl || "",
          name: me?.name || "User",
        }}
        items={Menu}
        itemsPerGroup={3}
      />
    </div>
  );
  return (
    <div className="flex gap-2 items-center justify-end no-drag z-10">
      {!me ? renderAuthButtons() : renderUserMenu()}
    </div>
  );
};

export default UserAuthentication;
