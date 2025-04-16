import { NavItem } from "@/utils/types";
import { Compass, Home, ListMusic } from "lucide-react";

const navItems: NavItem[] = [
  {
    href: "/",
    icon: Home,
    text: "Home",
  },
  {
    href: "/explore",
    icon: Compass,
    text: "Explore",
  },
  {
    href: "/library",
    icon: ListMusic,
    text: "Library",
  },
];

export default navItems;