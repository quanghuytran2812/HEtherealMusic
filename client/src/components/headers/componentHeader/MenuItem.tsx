import { pathname } from "@/lib/pathname";
import { useMeStore } from "@/stores/useMeStore";
import { MenuItem } from "@/utils/types";
import { ExternalLink } from "lucide-react";

const Menu: MenuItem[] = [
  {
    id: 1,
    title: "Account",
    path: pathname.users.layout + pathname.users.account,
    icon: <ExternalLink size={16} />,
  },
  {
    id: 2,
    title: "Profile",
    path: pathname.publics.layout + pathname.publics.profile,
  },
  {
    id: 3,
    title: "Setting",
    path: pathname.publics.layout + pathname.publics.setting,
  },
  {
    id: 4,
    title: "Log out",
    onClick: () => { useMeStore.getState().logout(); },
  }
];

export default Menu;