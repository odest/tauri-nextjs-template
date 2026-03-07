import {
  Bot,
  Home,
  Send,
  Github,
  BookOpen,
  Settings,
  PieChart,
  LucideIcon,
  SquareTerminal,
  LayoutDashboard,
} from "lucide-react";

export interface UserNavItem {
  name: string;
  email: string;
  avatar: string;
}

export interface SubNavItem {
  title: string;
  url: string;
  translationKey: string;
}

export interface MainNavItem {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive?: boolean;
  items?: SubNavItem[];
  translationKey: string;
}

export interface SecondaryNavItem {
  title: string;
  url: string;
  icon: LucideIcon;
  translationKey: string;
  external?: boolean;
}

export interface ProjectNavItem {
  name: string;
  url: string;
  icon: LucideIcon;
  translationKey: string;
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
    email: "odest@example.com",
    avatar: "/avatar.png",
  },
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: Home,
      isActive: true,
      items: [],
      translationKey: "home",
    },
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
      translationKey: "dashboard",
      items: [
        {
          title: "Overview",
          url: "/dashboard/overview",
          translationKey: "overview",
        },
        {
          title: "Analytics",
          url: "/dashboard/analytics",
          translationKey: "analytics",
        },
      ],
    },
    {
      title: "Playground",
      url: "/playground",
      icon: SquareTerminal,
      isActive: true,
      translationKey: "playground",
      items: [
        {
          title: "History",
          url: "/playground/history",
          translationKey: "history",
        },
        {
          title: "Starred",
          url: "/playground/starred",
          translationKey: "starred",
        },
      ],
    },
    {
      title: "Models",
      url: "/models",
      icon: Bot,
      translationKey: "models",
      items: [
        { title: "Genesis", url: "/models/genesis", translationKey: "genesis" },
        {
          title: "Explorer",
          url: "/models/explorer",
          translationKey: "explorer",
        },
        { title: "Quantum", url: "/models/quantum", translationKey: "quantum" },
      ],
    },
    {
      title: "Documentation",
      url: "/docs",
      icon: BookOpen,
      translationKey: "docs",
      items: [
        {
          title: "Introduction",
          url: "/docs/intro",
          translationKey: "intro",
        },
        {
          title: "Tutorials",
          url: "/docs/tutorials",
          translationKey: "tutorials",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Feedback",
      url: "https://github.com/odest/tauri-nextjs-template/issues",
      icon: Send,
      translationKey: "feedback",
      external: true,
    },
    {
      title: "Github",
      url: "https://github.com/odest/tauri-nextjs-template",
      icon: Github,
      translationKey: "github",
      external: true,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
      translationKey: "settings",
    },
  ],
  projects: [
    {
      name: "Project Alpha",
      url: "#",
      icon: PieChart,
      translationKey: "projectAlpha",
    },
  ],
};
