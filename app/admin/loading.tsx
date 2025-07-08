export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="h-10 bg-gray-800 rounded animate-pulse mb-2"></div>
          <div className="h-6 bg-gray-800 rounded animate-pulse w-1/2"></div>
        </div>

        {/* Stats Overview Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="h-4 bg-gray-800 rounded animate-pulse w-20"></div>
                <div className="h-4 w-4 bg-gray-800 rounded animate-pulse"></div>
              </div>
              <div className="h-8 bg-gray-800 rounded animate-pulse mb-2"></div>
              <div className="h-3 bg-gray-800 rounded animate-pulse w-16"></div>
            </div>
          ))}
        </div>

        {/* Tabs Skeleton */}
        <div className="space-y-6">
          <div className="flex space-x-1 bg-gray-900 border border-gray-800 rounded-lg p-1">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-10 bg-gray-800 rounded animate-pulse flex-1"></div>
            ))}
          </div>

          {/* Content Skeleton */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg">
            <div className="p-6 border-b border-gray-800">
              <div className="h-6 bg-gray-800 rounded animate-pulse mb-2"></div>
              <div className="h-4 bg-gray-800 rounded animate-pulse w-2/3"></div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <div className="h-10 w-10 bg-gray-800 rounded-full animate-pulse"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-800 rounded animate-pulse"></div>
                      <div className="h-3 bg-gray-800 rounded animate-pulse w-2/3"></div>
                    </div>
                    <div className="h-8 w-20 bg-gray-800 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
