import {
  BookOpen,
  FolderOpen,
  LayoutDashboard,
  PlugZap,
  Search,
  Settings,
  Tag,
} from "lucide-react";

export const INITIAL_AUTH_ERRORS = {
  name: "",
  email: "",
  password: "",
  server: "",
};

export const SIDEBAR_LINKS = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Library",
    href: "/library",
    icon: BookOpen,
  },
  {
    name: "Collections",
    href: "/collections",
    icon: FolderOpen,
  },
  {
    name: "Tags",
    href: "/tags",
    icon: Tag,
  },
  {
    name: "Search",
    href: "/search",
    icon: Search,
  },
  {
    name: "Integrations",
    href: "/integrations",
    icon: PlugZap,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];
