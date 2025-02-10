import { pathname } from "@/lib/pathname";
import { ExternalLink } from "lucide-react";

interface MenuItem {
  id: number;
  title: string;
  path: string;
  icon?: React.ReactNode; // Optional icon
}

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
];

export default Menu;