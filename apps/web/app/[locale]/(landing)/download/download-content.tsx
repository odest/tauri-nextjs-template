"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { Logo } from "@workspace/ui/components/landing/logo";
import { AnimatedGroup } from "@workspace/ui/components/landing/animated-group";
import { TextEffect } from "@workspace/ui/components/landing/text-effect";
import { transitionVariants } from "@/lib/animations";
import { detectPlatform, type Platform } from "@/lib/detect-platform";
import { platformConfig } from "./platform-mappings";
import { type ReleaseData } from "@/lib/github-releases";
import PlatformCards from "../components/platform-cards";

interface DownloadContentProps {
  release: ReleaseData | null;
}

export default function DownloadContent({ release }: DownloadContentProps) {
  const [platform, setPlatform] = useState<Platform>("unknown");

  useEffect(() => {
    setPlatform(detectPlatform());
  }, []);

  const scrollToPlatforms = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    document
      .getElementById("platforms")
      ?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const { label, icon, primaryAssetKey } = platformConfig[platform];

  const primaryUrl =
    (release?.assets && primaryAssetKey && release.assets[primaryAssetKey]) ||
    "#";

  return (
    <main className="overflow-hidden">
      <div
        className="absolute inset-0 z-0 text-stone-200 dark:text-white/10"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 0",
          maskImage: `
            repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
          `,
          WebkitMaskImage: `
            repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
          `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />
      <section className="pt-24 md:pt-36">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <AnimatedGroup variants={transitionVariants}>
            <Logo className="mx-auto size-20" />
          </AnimatedGroup>

          <TextEffect
            preset="fade-in-blur"
            speedSegment={0.3}
            as="h1"
            className="mx-auto mt-8 max-w-4xl text-5xl text-balance max-md:font-semibold md:text-7xl lg:mt-16 xl:text-[5.25rem]"
          >
            Download TNTStack
          </TextEffect>
          <TextEffect
            per="line"
            preset="fade-in-blur"
            speedSegment={0.3}
            delay={0.5}
            as="p"
            className="mx-auto mt-8 max-w-3xl [font-size:var(--comp-text-lg)] [line-height:var(--comp-lh-lg)] text-balance"
          >
            Get the latest version for your platform. One codebase for Web,
            Desktop, and Mobile.
          </TextEffect>

          {release?.version && (
            <AnimatedGroup variants={transitionVariants}>
              <p className="text-muted-foreground mt-4 [font-size:var(--comp-text-sm)] [line-height:var(--comp-lh-sm)]">
                Latest release: v{release.version}
              </p>
            </AnimatedGroup>
          )}

          <AnimatedGroup
            variants={{
              container: {
                visible: {
                  transition: {
                    staggerChildren: 0.05,
                    delayChildren: 0.75,
                  },
                },
              },
              ...transitionVariants,
            }}
            className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row"
          >
            <Button
              asChild
              size="lg"
              className="cursor-pointer [font-size:var(--comp-text-base)] [line-height:var(--comp-lh-base)]"
            >
              <Link href={primaryUrl}>
                {icon}
                <span className="text-nowrap">{label}</span>
              </Link>
            </Button>
            <Button
              key={2}
              size="lg"
              variant="outline"
              className="cursor-pointer [font-size:var(--comp-text-base)] [line-height:var(--comp-lh-base)]"
              onClick={scrollToPlatforms}
            >
              <ArrowDown />
              <span className="text-nowrap">Other Platforms</span>
            </Button>
          </AnimatedGroup>
        </div>

        <AnimatedGroup
          variants={{
            container: {
              visible: {
                transition: {
                  staggerChildren: 0.05,
                  delayChildren: 0.75,
                },
              },
            },
            ...transitionVariants,
          }}
        >
          <div id="platforms">
            <PlatformCards assets={release?.assets || {}} />
          </div>
        </AnimatedGroup>
      </section>
    </main>
  );
}
