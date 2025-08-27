import {
  Map,
  Bot,
  Home,
  Send,
  Frame,
  BookOpen,
  Settings,
  LifeBuoy,
  PieChart,
  SquareTerminal,
} from "lucide-react";

export interface UserNavItem {
  name: string;
  email: string;
  avatar: string;
}

export interface SubNavItem {
  title: string;
  url: string;
}

export interface MainNavItem {
  title: string;
  url: string;
  icon: any;
  isActive?: boolean;
  items?: SubNavItem[];
}

export interface SecondaryNavItem {
  title: string;
  url: string;
  icon: any;
}

export interface ProjectNavItem {
  name: string;
  url: string;
  icon: any;
}

export interface NavigationData {
  user: UserNavItem;
  navMain: MainNavItem[];
  navSecondary: SecondaryNavItem[];
  projects: ProjectNavItem[];
}

export const navigationData: NavigationData = {
  user: {
    name: "odest",
    email: "dest@example.com",
    avatar: "/avatar.png",
  },
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: Home,
      isActive: true,
      items: [],
    },
    {
      title: "Playground",
      url: "/playground",
      icon: SquareTerminal,
      isActive: true,
      items: [
        { title: "History", url: "/playground/history" },
        { title: "Starred", url: "/playground/starred" },
      ],
    },
    {
      title: "Models",
      url: "/models",
      icon: Bot,
      items: [
        { title: "Genesis", url: "/models/genesis" },
        { title: "Explorer", url: "/models/explorer" },
        { title: "Quantum", url: "/models/quantum" },
      ],
    },
    {
      title: "Documentation",
      url: "/docs",
      icon: BookOpen,
      items: [
        { title: "Introduction", url: "/docs/intro" },
        { title: "Tutorials", url: "/docs/tutorials" },
      ],
    },
  ],
  navSecondary: [
    { title: "Support", url: "/support", icon: LifeBuoy },
    { title: "Feedback", url: "/feedback", icon: Send },
    { title: "Settings", url: "/settings", icon: Settings },
  ],
  projects: [
    { name: "Design Engineering", url: "#", icon: Frame },
    { name: "Sales & Marketing", url: "#", icon: PieChart },
    { name: "Travel", url: "#", icon: Map },
  ],
};
