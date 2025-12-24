interface LoaderProps {
  fullScreen?: boolean
  message?: string
  size?: 'sm' | 'md' | 'lg'
}

export function Loader({ fullScreen = false, message = 'Loading...', size = 'md' }: LoaderProps) {
  const spinnerSizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  }

  const loaderContent = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className={`${spinnerSizes[size]} rounded-full border-4 border-gray-200 border-t-blue-600 animate-spin`} />
      {message && <p className="text-gray-600 font-medium text-sm">{message}</p>}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 shadow-lg">{loaderContent}</div>
      </div>
    )
  }

  return <div className="flex items-center justify-center py-8">{loaderContent}</div>
}

export function PageLoader({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50 flex items-center justify-center px-4">
      <Loader fullScreen={false} message={message} size="lg" />
    </div>
  )
}

export function InlineLoader({ message = 'Processing...' }: { message?: string }) {
  return <Loader fullScreen={false} message={message} size="md" />
}

export function ModalLoader({ message = 'Please wait...' }: { message?: string }) {
  return <Loader fullScreen={true} message={message} size="md" />
}
