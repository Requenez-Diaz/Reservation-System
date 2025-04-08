import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <Skeleton className="h-10 w-3/4 mx-auto mb-4" />
        <Skeleton className="h-4 w-2/3 mx-auto" />
        <Skeleton className="h-4 w-1/2 mx-auto mt-2" />
      </div>

      <Skeleton className="h-24 w-full mb-8 rounded-lg" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="rounded-lg overflow-hidden border border-border"
          >
            <Skeleton className="h-48 w-full" />
            <div className="p-4">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-4" />
              <div className="flex gap-2 mb-4">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/4" />
              </div>
              <div className="flex gap-2 mb-4">
                <Skeleton className="h-6 w-1/3 rounded-full" />
                <Skeleton className="h-6 w-1/3 rounded-full" />
              </div>
              <div className="flex justify-between mt-4">
                <Skeleton className="h-10 w-2/5" />
                <Skeleton className="h-10 w-2/5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
