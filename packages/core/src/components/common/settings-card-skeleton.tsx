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
      <CardHeader>
        <Skeleton className="h-6 w-24 mb-2" />
        <Skeleton className="h-4 w-64" />
      </CardHeader>
      <CardContent className={gridClasses}>
        {[...Array(itemCount)].map((_, i) => (
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
};
