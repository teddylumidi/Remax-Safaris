import React from 'react';

export const DestinationCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col animate-pulse">
      {/* Image Skeleton */}
      <div className="h-56 bg-gray-200 relative p-3 flex flex-col justify-between">
        <div className="flex gap-2">
          <div className="h-5 w-20 bg-gray-300 rounded-md" />
          <div className="h-5 w-16 bg-gray-300 rounded-md" />
        </div>
        <div className="h-7 w-2/3 bg-gray-300 rounded-md" />
      </div>

      {/* Body Content Skeleton */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          <div className="h-6 w-36 bg-gray-200 rounded-md" />
          <div className="space-y-2">
            <div className="h-3.5 w-full bg-gray-200 rounded" />
            <div className="h-3.5 w-4/5 bg-gray-200 rounded" />
          </div>

          <div className="space-y-2 pt-2">
            <div className="h-3 w-24 bg-gray-200 rounded" />
            <div className="space-y-1.5">
              <div className="h-3 w-3/4 bg-gray-200 rounded" />
              <div className="h-3 w-2/3 bg-gray-200 rounded" />
              <div className="h-3 w-5/6 bg-gray-200 rounded" />
            </div>
          </div>
        </div>

        {/* Pricing & Actions Skeleton */}
        <div className="pt-4 border-t border-gray-100 space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="h-3 w-12 bg-gray-200 rounded" />
              <div className="h-5 w-28 bg-gray-200 rounded" />
            </div>
            <div className="space-y-1 flex flex-col items-end">
              <div className="h-3 w-16 bg-gray-200 rounded" />
              <div className="h-4 w-20 bg-gray-200 rounded" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="h-9 bg-gray-200 rounded-xl" />
            <div className="h-9 bg-gray-200 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const PackageCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col animate-pulse border-t-4 border-t-gray-300">
      {/* Image Skeleton */}
      <div className="h-60 bg-gray-200 relative p-3 flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <div className="h-6 w-24 bg-gray-300 rounded-md" />
          <div className="h-6 w-20 bg-gray-300 rounded-md" />
        </div>
        <div className="h-6 w-3/4 bg-gray-300 rounded-md" />
      </div>

      {/* Body Content Skeleton */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
        {/* Price Tag Box Skeleton */}
        <div className="bg-gray-100 rounded-2xl p-4 border border-gray-200 flex items-center justify-between">
          <div className="space-y-1.5">
            <div className="h-2.5 w-24 bg-gray-200 rounded" />
            <div className="h-6 w-36 bg-gray-200 rounded" />
          </div>
          <div className="h-6 w-20 bg-gray-200 rounded-lg" />
        </div>

        {/* Inclusions Skeleton */}
        <div className="space-y-2">
          <div className="h-3 w-28 bg-gray-200 rounded" />
          <div className="space-y-2">
            <div className="h-3.5 w-full bg-gray-200 rounded" />
            <div className="h-3.5 w-5/6 bg-gray-200 rounded" />
            <div className="h-3.5 w-4/5 bg-gray-200 rounded" />
            <div className="h-3.5 w-3/4 bg-gray-200 rounded" />
          </div>
        </div>

        {/* Action Toggle Skeleton */}
        <div className="space-y-3 pt-2 border-t border-gray-100">
          <div className="h-4 w-40 bg-gray-200 rounded mx-auto" />
          <div className="grid grid-cols-2 gap-2">
            <div className="h-9 bg-gray-200 rounded-xl" />
            <div className="h-9 bg-gray-200 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const GalleryItemSkeleton: React.FC = () => {
  return (
    <div className="aspect-square rounded-2xl bg-gray-200 dark:bg-slate-800 animate-pulse border border-gray-200 dark:border-slate-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-gray-300/60 dark:from-slate-700/60 via-transparent to-transparent" />
      <div className="absolute bottom-3 left-3 right-3 space-y-1.5">
        <div className="h-3 w-2/3 bg-gray-300 dark:bg-slate-700 rounded" />
        <div className="h-2.5 w-1/3 bg-gray-300 dark:bg-slate-700 rounded" />
      </div>
    </div>
  );
};
