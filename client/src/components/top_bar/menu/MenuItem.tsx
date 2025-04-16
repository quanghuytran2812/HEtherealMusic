import { pathname } from "@/lib/pathname";
import { useMeStore } from "@/stores/useMeStore";
import { MenuItem } from "@/utils/types";
import { DiscAlbum, ExternalLink, ListMusic, Plus, PlusCircle, User } from "lucide-react";

export const MenuProfile: MenuItem[] = [
  {
    id: 1,
    title: "Account",
    path: pathname.users.account,
    icon: <ExternalLink size={16} />,
  },
  {
    id: 2,
    title: "Profile",
    path: pathname.users.profile,
  },
  {
    id: 3,
    title: "Setting",
    path: pathname.users.setting,
  },
  {
    id: 4,
    title: "Log out",
    onClick: () => { useMeStore.getState().logout(); },
  }
];

export const MenuActions: MenuItem[] = [
  { id: 1, title: 'Add to playlist', icon: <Plus size={16} className="text-[#b3b3b3]" /> },
  { id: 2, title: 'Save to your Liked Songs', icon: <PlusCircle size={16} className="text-[#b3b3b3]" /> },
  { id: 3, title: 'Go to artist', icon: <User size={16} className="text-[#b3b3b3]" /> },
  { id: 4, title: 'Go to album', icon: <DiscAlbum size={16} className="text-[#b3b3b3]" /> },
  { id: 5, title: 'View credits', icon: <ListMusic size={16} className="text-[#b3b3b3]" /> },
];