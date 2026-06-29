'use client'

import SkeletonLoader from '@/components/shared/SkeletonLoader'

export default function TenantLoading() {
  return (
    <div className="max-w-5xl mx-auto py-4">
      <SkeletonLoader type="dashboard" />
    </div>
  )
}
