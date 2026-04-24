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
      <CardHeader className="flex flex-row items-center justify-between space-y-0 gap-4">
        <div className="space-y-2 w-full">
          <Skeleton className="h-(--comp-h-6) w-24" />
          <Skeleton className="h-4 w-48 max-w-full" />
        </div>

        <div className="md:hidden shrink-0">
          <Skeleton className="h-(--comp-h-9) w-[130px] rounded-md" />
        </div>
      </CardHeader>

      <CardContent className="hidden md:block">
        <div className={gridClasses}>
          {[...Array(itemCount)].map((_, i) => (
            <div key={i} className="flex flex-col gap-3">
              <Skeleton className="aspect-video rounded-lg" />
              <div className="flex items-center gap-2">
                <Skeleton className="w-4 h-4 rounded-full" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
