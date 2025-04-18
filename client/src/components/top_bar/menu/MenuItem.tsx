import { useMeStore } from "@/stores/useMeStore";
import { MenuItem } from "@/utils/types";
import {
  DiscAlbum,
  ExternalLink,
  ListMusic,
  Plus,
  PlusCircle,
  User,
} from "lucide-react";

export const ProfileMenu = () => {
  const me = useMeStore((state) => state.me);

  return [
    {
      id: 1,
      title: "Account",
      icon: <ExternalLink size={16} />,
      path: "#",
    },
    {
      id: 2,
      title: "Profile",
      path: `/user/${me?._id}`,
    },
    {
      id: 3,
      title: "Setting",
      path: "#",
    },
    {
      id: 4,
      title: "Log out",
      onClick: () => useMeStore.getState().logout(),
    },
  ] as MenuItem[];
};

export const MenuActions = () => {
  return [
    {
      id: 1,
      title: "Add to playlist",
      icon: <Plus size={16} className="text-[#b3b3b3]" />,
    },
    {
      id: 2,
      title: "Save to your Liked Songs",
      icon: <PlusCircle size={16} className="text-[#b3b3b3]" />,
    },
    {
      id: 3,
      title: "Go to artist",
      icon: <User size={16} className="text-[#b3b3b3]" />,
    },
    {
      id: 4,
      title: "Go to album",
      icon: <DiscAlbum size={16} className="text-[#b3b3b3]" />,
    },
    {
      id: 5,
      title: "View credits",
      icon: <ListMusic size={16} className="text-[#b3b3b3]" />,
    },
  ] as MenuItem[];
};
