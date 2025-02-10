import { Button } from "@/components/ui/button";
import { useMeStore } from "@/stores/useMeStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Menu from "./MenuItem";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TooltipButton } from "@/components/tooltips";
import { Bell } from "lucide-react";

const UserAuthentication = () => {
  const { me, logout } = useMeStore();

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
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="size-8">
            <AvatarImage src={me?.imageUrl} />
            <AvatarFallback>{me?.name}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-48 p-1 bg-[#282828] border-none text-white">
          {Menu.map(({ id, title, path, icon }) => (
            <DropdownMenuItem key={id}>
              <Link
                className="flex w-full justify-between items-center text-start py-1 pl-2 pr-1"
                to={path}
              >
                {title}
                {icon}
              </Link>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator className="bg-[#B3B3B377] h-[0.5px]" />
          <DropdownMenuItem onClick={logout}>
            <span className="flex w-full justify-between items-center text-start py-1 pl-2 pr-1 cursor-pointer">
              Log out
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
  return (
    <div className="flex gap-2 items-center justify-end no-drag z-10">
      {!me ? renderAuthButtons() : renderUserMenu()}
    </div>
  );
};

export default UserAuthentication;
