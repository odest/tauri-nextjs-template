import { Card, CardContent, CardHeader } from "@workspace/ui/components/card";
import { Skeleton } from "@workspace/ui/components/skeleton";

interface SettingsCardSkeletonProps {
  gridClasses: string;
  itemCount?: number;
}

export const SettingsCardSkeleton = ({
  gridClasses,
  itemCount = 3,
}: SettingsCardSkeletonProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
        <div className="w-full space-y-2">
          <Skeleton className="h-(--comp-h-6) w-24" />
          <Skeleton className="h-4 w-48 max-w-full" />
        </div>

        <div className="shrink-0 md:hidden">
          <Skeleton className="h-(--comp-h-9) w-[130px] rounded-md" />
        </div>
      </CardHeader>

      <CardContent className="hidden md:block">
        <div className={gridClasses}>
          {[...Array(itemCount)].map((_, i) => (
            <div key={i} className="flex flex-col gap-3">
              <Skeleton className="aspect-video rounded-lg" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
