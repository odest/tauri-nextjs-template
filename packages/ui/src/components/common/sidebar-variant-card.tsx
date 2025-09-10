"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Label } from "@workspace/ui/components/label";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { useSidebarStore } from "@workspace/ui/stores/sidebar-store";

export const SidebarVariantCard = () => {
  const [mounted, setMounted] = useState(false);
  const { variant: sidebarVariant, setVariant: setSidebarVariant } =
    useSidebarStore();

  useEffect(() => setMounted(true), []);

  if (!mounted)
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-24 mb-2" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex flex-col gap-3">
              <Skeleton className="aspect-video rounded-lg" />
              <div className="flex items-center gap-2">
                <Skeleton className="w-4 h-4 rounded-full" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sidebar Variant</CardTitle>
        <CardDescription>
          Choose your sidebar variant preference
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div
          className="flex flex-col gap-3 cursor-pointer"
          onClick={() => setSidebarVariant("sidebar")}
        >
          <div className="relative">
            <div className="aspect-video rounded-lg border-2 border-border bg-background overflow-hidden transition-colors">
              <div className="h-5 bg-muted border-b"></div>
              <div className="absolute top-2 left-2 flex gap-1">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>

              <div className="flex h-full">
                <div className="w-12 h-[calc(100%-1.2rem)] bg-muted border-r">
                  <div className="p-1 h-full flex flex-col justify-between">
                    <div className="space-y-1">
                      <div className="h-1.5 bg-muted-foreground/30 rounded"></div>
                      <div className="h-1.5 bg-muted-foreground/30 rounded"></div>
                      <div className="h-1.5 bg-muted-foreground/30 rounded"></div>
                    </div>

                    <div className="space-y-1">
                      <div className="h-1.5 bg-muted-foreground/30 rounded"></div>
                      <div className="h-1.5 bg-muted-foreground/30 rounded"></div>
                    </div>
                  </div>
                </div>

                <div className="flex-1 p-2">
                  <div className="space-y-1">
                    <div className="h-2 bg-muted-foreground/20 rounded w-3/4"></div>
                    <div className="h-2 bg-muted-foreground/20 rounded w-1/2"></div>
                    <div className="h-2 bg-muted-foreground/20 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border-2 border-muted-foreground flex items-center justify-center transition-colors">
              {sidebarVariant === "sidebar" && (
                <div className="w-2 h-2 rounded-full bg-primary"></div>
              )}
            </div>
            <Label className="font-medium">Sidebar</Label>
          </div>
        </div>

        <div
          className="flex flex-col gap-3 cursor-pointer"
          onClick={() => setSidebarVariant("floating")}
        >
          <div className="relative">
            <div className="aspect-video rounded-lg border-2 border-border bg-background overflow-hidden transition-colors">
              <div className="h-5 bg-muted border-b"></div>
              <div className="absolute top-2 left-2 flex gap-1">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>

              <div className="flex h-full p-1">
                <div className="w-12 h-[calc(100%-1.3rem)] bg-muted rounded-md border mr-1">
                  <div className="p-1 h-full flex flex-col justify-between">
                    <div className="space-y-1">
                      <div className="h-1.5 bg-muted-foreground/30 rounded"></div>
                      <div className="h-1.5 bg-muted-foreground/30 rounded"></div>
                      <div className="h-1.5 bg-muted-foreground/30 rounded"></div>
                    </div>

                    <div className="space-y-1">
                      <div className="h-1.5 bg-muted-foreground/30 rounded"></div>
                      <div className="h-1.5 bg-muted-foreground/30 rounded"></div>
                    </div>
                  </div>
                </div>

                <div className="flex-1 bg-background rounded-md p-1">
                  <div className="space-y-1">
                    <div className="h-2 bg-muted-foreground/20 rounded w-3/4"></div>
                    <div className="h-2 bg-muted-foreground/20 rounded w-1/2"></div>
                    <div className="h-2 bg-muted-foreground/20 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border-2 border-muted-foreground flex items-center justify-center transition-colors">
              {sidebarVariant === "floating" && (
                <div className="w-2 h-2 rounded-full bg-primary"></div>
              )}
            </div>
            <Label className="font-medium">Floating</Label>
          </div>
        </div>

        <div
          className="flex flex-col gap-3 cursor-pointer"
          onClick={() => setSidebarVariant("inset")}
        >
          <div className="relative">
            <div className="aspect-video rounded-lg border-2 border-border bg-muted overflow-hidden transition-colors">
              <div className="h-5 bg-muted border-b"></div>
              <div className="absolute top-2 left-2 flex gap-1">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>

              <div className="flex h-full">
                <div className="w-12 h-[calc(100%-1.3rem)] bg-muted">
                  <div className="p-1 h-full pb-2 mt-1 flex flex-col justify-between">
                    <div className="space-y-1">
                      <div className="h-1.5 bg-muted-foreground/30 rounded"></div>
                      <div className="h-1.5 bg-muted-foreground/30 rounded"></div>
                      <div className="h-1.5 bg-muted-foreground/30 rounded"></div>
                    </div>

                    <div className="space-y-1">
                      <div className="h-1.5 bg-muted-foreground/30 rounded"></div>
                      <div className="h-1.5 bg-muted-foreground/30 rounded"></div>
                    </div>
                  </div>
                </div>

                <div className="flex-1 h-[calc(100%-1.7rem)] bg-background rounded-md border border-border p-2 mr-1 mt-1">
                  <div className="space-y-1">
                    <div className="h-2 bg-muted-foreground/20 rounded w-3/4"></div>
                    <div className="h-2 bg-muted-foreground/20 rounded w-1/2"></div>
                    <div className="h-2 bg-muted-foreground/20 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border-2 border-muted-foreground flex items-center justify-center transition-colors">
              {sidebarVariant === "inset" && (
                <div className="w-2 h-2 rounded-full bg-primary"></div>
              )}
            </div>
            <Label className="font-medium">Inset</Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
