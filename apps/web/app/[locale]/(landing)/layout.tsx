import { ThemeProvider } from "@workspace/core/providers/theme-provider";
import { HeroHeader } from "./components/header";

interface LandingLayoutProps {
  children: React.ReactNode;
}

export default function LandingLayout({ children }: LandingLayoutProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      <HeroHeader />
      {children}
    </ThemeProvider>
  );
}
