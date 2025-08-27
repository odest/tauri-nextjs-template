import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppLayout } from "../components/AppLayout";
import "@workspace/ui/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tauri + Next.js Template",
  description: "Tauri + Next.js Template",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const raw = localStorage.getItem("accent-color-storage");
                  if (raw) {
                    const parsed = JSON.parse(raw);
                    const accent = parsed?.state?.selectedColor || "zinc";
                    document.documentElement.setAttribute("data-theme", accent);
                  } else {
                    document.documentElement.setAttribute("data-theme", "zinc");
                  }
                } catch (e) {
                  document.documentElement.setAttribute("data-theme", "zinc");
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-hidden`}
      >
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
