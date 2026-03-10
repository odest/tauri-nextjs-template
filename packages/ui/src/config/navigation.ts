import {
  Home,
  Send,
  Github,
  Settings,
  PieChart,
  LucideIcon,
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
      url: "/home",
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
