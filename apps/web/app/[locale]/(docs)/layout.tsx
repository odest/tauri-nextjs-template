import { RootProvider } from "fumadocs-ui/provider/next";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { source } from "@/lib/source";
import type { ReactNode } from "react";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { Hexagon } from "lucide-react";

function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <div className="flex items-center gap-2">
          <Hexagon className="size-5" />
          <span className="font-semibold">TNTStack</span>
        </div>
      ),
    },
    githubUrl: "https://github.com/odest/tntstack",
  };
}

export default async function DocsLayoutWrapper(props: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;

  return (
    <RootProvider
      i18n={{
        locale,
        locales: [],
      }}
    >
      <DocsLayout {...baseOptions()} tree={source.getPageTree(locale)}>
        {props.children}
      </DocsLayout>
    </RootProvider>
  );
}
