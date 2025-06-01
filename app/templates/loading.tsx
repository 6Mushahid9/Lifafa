import { ComponentLoader } from "@/components/loading/component-loader"
import { SkeletonLoader } from "@/components/loading/skeleton-loader"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="h-16 mb-8">
        <SkeletonLoader type="custom" className="h-8 w-48" />
      </div>

      <div className="flex">
        {/* Sidebar skeleton */}
        <div className="w-80 bg-white border-r border-gray-200 h-screen">
          <div className="p-6">
            <SkeletonLoader type="text" lines={1} className="h-8 w-1/2 mb-6" />
            <SkeletonLoader type="custom" className="h-10 w-full mb-6" />

            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <SkeletonLoader key={i} type="template" className="h-48" />
              ))}
            </div>
          </div>
        </div>

        {/* Main content skeleton */}
        <div className="flex-1 p-8">
          <div className="space-y-8">
            <div className="flex justify-center py-12">
              <ComponentLoader size="lg" text="Loading template" />
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <SkeletonLoader type="card" className="h-96" />
              <div className="space-y-4">
                <SkeletonLoader type="text" lines={1} className="h-8 w-3/4" />
                <SkeletonLoader type="text" lines={4} />
                <SkeletonLoader type="custom" className="h-12 w-full mt-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
