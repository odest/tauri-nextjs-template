import Link from "next/link";
import { Card, CardContent, CardHeader } from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import { ReactNode } from "react";
import {
  platformCards,
  type PlatformCardData,
} from "../download/platform-mappings";

interface PlatformCardsProps {
  assets: Record<string, string>;
}

function DownloadButton({
  href,
  label,
  ext,
}: {
  href: string | undefined;
  label: string;
  ext: string;
}) {
  if (!href) return null;
  return (
    <Button
      asChild
      variant="outline"
      className="w-full cursor-pointer justify-between"
    >
      <Link href={href}>
        <span className="[font-size:var(--comp-text-sm)] [line-height:var(--comp-lh-sm)]">
          {label}
        </span>
        <span className="text-muted-foreground [font-size:var(--comp-text-xs)] [line-height:var(--comp-lh-xs)] font-mono">
          {ext}
        </span>
      </Link>
    </Button>
  );
}

const colSpanClass = {
  2: "lg:col-span-2",
  3: "lg:col-span-3",
} as const;

function PlatformCard({
  platform,
  assets,
}: {
  platform: PlatformCardData;
  assets: Record<string, string>;
}) {
  return (
    <Card
      className={`group overflow-hidden bg-background shadow-foreground/5 text-center ${colSpanClass[platform.colSpan]}`}
    >
      <CardHeader className="pb-3">
        <CardDecorator>{platform.icon}</CardDecorator>
        <h3 className="mt-6 font-medium">{platform.name}</h3>
      </CardHeader>
      <CardContent className="space-y-3">
        {platform.downloads.length > 0 ? (
          platform.downloads.map((dl) => (
            <DownloadButton
              key={dl.assetKey}
              href={assets[dl.assetKey]}
              label={dl.label}
              ext={dl.ext}
            />
          ))
        ) : (
          <p className="[font-size:var(--comp-text-sm)] [line-height:var(--comp-lh-sm)] text-muted-foreground py-2">
            Coming soon
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export default function PlatformCards({ assets }: PlatformCardsProps) {
  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
            Available Platforms
          </h2>
          <p className="mt-4 text-muted-foreground">
            Download TNTStack for your platform.
          </p>
        </div>
        <div className="mx-auto mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6 md:mt-16">
          {platformCards.map((platform) => (
            <PlatformCard
              key={platform.name}
              platform={platform}
              assets={assets}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
  <div className="mask-radial-from-40% mask-radial-to-60% relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-foreground)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-foreground)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-foreground)15%,transparent)] dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-foreground)20%,transparent)]">
    <div
      aria-hidden
      className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-size-[24px_24px] dark:opacity-50"
    />

    <div className="bg-background absolute inset-0 m-auto flex size-(--comp-h-12) items-center justify-center border-l border-t">
      {children}
    </div>
  </div>
);
