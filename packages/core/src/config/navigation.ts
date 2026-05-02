import {
  Home,
  Send,
  User,
  Bell,
  LogOut,
  Search,
  Github,
  Sparkles,
  Settings,
  PieChart,
  BadgeCheck,
  CreditCard,
  LucideIcon,
  LayoutDashboard,
} from "lucide-react";
import { siteConfig } from "@workspace/core/config/site";

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
  href?: string;
  icon: LucideIcon;
  isActive?: boolean;
  items?: SubNavItem[];
  translationKey: string;
}

export interface MobileNavItem {
  title: string;
  url: string;
  href?: string;
  icon: LucideIcon;
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

export interface ProfileNavItem {
  title: string;
  url: string;
  icon: LucideIcon;
  translationKey: string;
}

export interface ProfileNavGroup {
  id: string;
  items: ProfileNavItem[];
}

export interface NavigationData {
  user: UserNavItem;
  navMain: MainNavItem[];
  navMobile: MobileNavItem[];
  navSecondary: SecondaryNavItem[];
  projects: ProjectNavItem[];
  navProfile: ProfileNavGroup[];
}

export const navigationData: NavigationData = {
  user: {
    name: siteConfig.owner,
    email: "user@example.com",
    avatar: "/avatar.svg",
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
      href: "/dashboard/overview",
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
        {
          title: "Reports",
          url: "/dashboard/reports",
          translationKey: "reports",
        },
      ],
    },
  ],
  navMobile: [
    { title: "Home", url: "/home", icon: Home, translationKey: "home" },
    {
      title: "Search",
      url: "#search",
      icon: Search,
      translationKey: "search",
    },
    {
      title: "Dashboard",
      url: "/dashboard",
      href: "/dashboard/overview",
      icon: LayoutDashboard,
      translationKey: "dashboard",
    },
    {
      title: "Profile",
      url: "#profile",
      icon: User,
      translationKey: "profile",
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
      translationKey: "settings",
    },
  ],
  navSecondary: [
    {
      title: "Feedback",
      url: siteConfig.links.issues,
      icon: Send,
      translationKey: "feedback",
      external: true,
    },
    {
      title: "Github",
      url: siteConfig.links.github,
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
  navProfile: [
    {
      id: "group-1",
      items: [
        {
          title: "Upgrade to Pro",
          url: "#upgrade",
          icon: Sparkles,
          translationKey: "upgradeToPro",
        },
      ],
    },
    {
      id: "group-2",
      items: [
        {
          title: "Account",
          url: "#account",
          icon: BadgeCheck,
          translationKey: "account",
        },
        {
          title: "Billing",
          url: "#billing",
          icon: CreditCard,
          translationKey: "billing",
        },
        {
          title: "Notifications",
          url: "#notifications",
          icon: Bell,
          translationKey: "notifications",
        },
      ],
    },
    {
      id: "group-3",
      items: [
        {
          title: "Log Out",
          url: "#logout",
          icon: LogOut,
          translationKey: "logOut",
        },
      ],
    },
  ],
};
