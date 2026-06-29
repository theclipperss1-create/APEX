'use client'

interface SkeletonLoaderProps {
  type: 'card' | 'table' | 'kanban' | 'admin' | 'dashboard'
  count?: number
}

export default function SkeletonLoader({ type, count = 3 }: SkeletonLoaderProps) {
  if (type === 'dashboard') {
    return (
      <div className="space-y-6 w-full animate-pulse">
        {/* Banner Skeleton */}
        <div className="h-14 bg-gray-150 bg-gray-200/60 rounded-lg w-full" />
        
        {/* Title Skeleton */}
        <div className="space-y-2">
          <div className="h-8 bg-gray-250 bg-gray-200 rounded-md w-48" />
          <div className="h-4 bg-gray-150 bg-gray-200/60 rounded-md w-72" />
        </div>

        {/* Bento Grid Skeletons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-36 border border-gray-200 rounded-lg p-6 bg-white flex flex-col justify-between">
              <div className="h-4 bg-gray-200 rounded-md w-24" />
              <div className="h-8 bg-gray-200 rounded-md w-16 mt-2" />
              <div className="h-4 bg-gray-100 rounded-md w-32 mt-4" />
            </div>
          ))}
        </div>

        {/* System Details Box Skeleton */}
        <div className="h-48 border border-gray-200 rounded-lg p-6 bg-white space-y-4">
          <div className="h-4 bg-gray-200 rounded-md w-36" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="h-4 bg-gray-150 bg-gray-200/60 rounded-md w-full" />
              <div className="h-4 bg-gray-150 bg-gray-200/60 rounded-md w-5/6" />
              <div className="h-4 bg-gray-150 bg-gray-200/60 rounded-md w-4/5" />
            </div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-150 bg-gray-200/60 rounded-md w-full" />
              <div className="h-4 bg-gray-150 bg-gray-200/60 rounded-md w-5/6" />
              <div className="h-4 bg-gray-150 bg-gray-200/60 rounded-md w-4/5" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (type === 'kanban') {
    return (
      <div className="space-y-6 w-full animate-pulse">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <div className="h-8 bg-gray-200 rounded-md w-36" />
            <div className="h-4 bg-gray-200/60 rounded-md w-64" />
          </div>
          <div className="h-10 bg-gray-200 rounded-md w-28" />
        </div>

        {/* Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((col) => (
            <div key={col} className="border border-gray-200 rounded-lg p-4 bg-white space-y-4 min-h-[400px]">
              <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                <div className="h-4 bg-gray-200 rounded-md w-16" />
                <div className="h-5 bg-gray-200/60 rounded-full w-8" />
              </div>
              <div className="space-y-3">
                {[1, 2].map((card) => (
                  <div key={card} className="p-3 border border-gray-100 rounded-lg space-y-3 bg-gray-50/50">
                    <div className="h-4 bg-gray-200 rounded-md w-5/6" />
                    <div className="h-3 bg-gray-200/60 rounded-md w-full" />
                    <div className="flex justify-between items-center pt-2 border-t border-gray-100/50">
                      <div className="h-3 bg-gray-200/60 rounded-md w-16" />
                      <div className="h-4 bg-gray-200/60 rounded-md w-10" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (type === 'table') {
    return (
      <div className="space-y-6 w-full animate-pulse">
        {/* Header Skeleton */}
        <div className="space-y-2">
          <div className="h-8 bg-gray-200 rounded-md w-44" />
          <div className="h-4 bg-gray-200/60 rounded-md w-72" />
        </div>

        {/* Layout Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left panel skeleton */}
          <div className="lg:col-span-4 border border-gray-200 rounded-lg p-6 bg-white space-y-6">
            <div className="h-4 bg-gray-200 rounded-md w-32 pb-2 border-b border-gray-100" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-150 bg-gray-200/60 rounded-md w-24" />
              <div className="h-9 bg-gray-150 bg-gray-200/60 rounded-md w-full" />
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-150 bg-gray-200/60 rounded-md w-24" />
              <div className="h-28 bg-gray-150 bg-gray-200/60 rounded-md w-full" />
            </div>
          </div>

          {/* Right table skeleton */}
          <div className="lg:col-span-8 border border-gray-200 rounded-lg p-6 bg-white space-y-4">
            <div className="h-4 bg-gray-200 rounded-md w-48 pb-2 border-b border-gray-100" />
            <div className="space-y-3 mt-4">
              <div className="grid grid-cols-5 gap-4 pb-2 border-b border-gray-100">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-4 bg-gray-200 rounded-md w-16" />
                ))}
              </div>
              {[1, 2, 3, 4, 5].map((row) => (
                <div key={row} className="grid grid-cols-5 gap-4 py-2 border-b border-gray-50">
                  <div className="h-4 bg-gray-150 bg-gray-200/60 rounded-md w-24" />
                  <div className="h-4 bg-gray-150 bg-gray-200/60 rounded-md w-16" />
                  <div className="h-4 bg-gray-150 bg-gray-200/60 rounded-md w-16" />
                  <div className="h-4 bg-gray-150 bg-gray-200/60 rounded-md w-16" />
                  <div className="h-4 bg-gray-150 bg-gray-200/60 rounded-md w-12" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (type === 'admin') {
    return (
      <div className="space-y-6 w-full animate-pulse">
        {/* Header Skeleton */}
        <div className="space-y-2">
          <div className="h-8 bg-gray-200 rounded-md w-36" />
          <div className="h-4 bg-gray-200/60 rounded-md w-72" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left panel skeleton */}
          <div className="lg:col-span-4 space-y-6">
            <div className="border border-gray-200 rounded-lg p-6 bg-white space-y-4">
              <div className="h-4 bg-gray-200 rounded-md w-32 pb-2 border-b border-gray-100" />
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-12 bg-gray-100 rounded-md w-full" />
                ))}
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-6 bg-white space-y-4">
              <div className="h-4 bg-gray-200 rounded-md w-36 pb-2 border-b border-gray-100" />
              <div className="h-10 bg-gray-100 rounded-md w-full" />
            </div>
          </div>

          {/* Right users panel skeleton */}
          <div className="lg:col-span-8 border border-gray-200 rounded-lg p-6 bg-white space-y-4">
            <div className="h-4 bg-gray-200 rounded-md w-48 pb-2 border-b border-gray-100" />
            <div className="space-y-4 mt-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-gray-50">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded-md w-28" />
                    <div className="h-3 bg-gray-200/60 rounded-md w-36" />
                  </div>
                  <div className="h-7 bg-gray-200 rounded-md w-20" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 animate-pulse">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="h-16 bg-gray-200/60 rounded-md w-full" />
      ))}
    </div>
  )
}
