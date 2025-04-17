import { NavItem } from "@/utils/types";
import { Compass, Home } from "lucide-react";

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
  }
];

export default navItems;