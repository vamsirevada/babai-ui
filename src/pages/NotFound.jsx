import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

const NotFound = () => {
  const location = useLocation()

  useEffect(() => {
    console.error(
      '404 Error: User attempted to access non-existent route:',
      location.pathname
    )
  }, [location.pathname])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-white to-brand-charcoal/5">
      <div className="bg-brand-white rounded-lg shadow-lg p-8 text-center max-w-md border border-brand-charcoal/10">
        <h1 className="text-6xl font-extrabold text-brand-primary mb-4 font-heading">
          404
        </h1>
        <p className="text-lg text-brand-charcoal/70 mb-6 font-body">
          Sorry, the page{' '}
          <span className="font-mono text-brand-charcoal">
            {location.pathname}
          </span>{' '}
          does not exist.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-2 bg-brand-primary text-brand-white rounded hover:bg-brand-primary/90 transition font-body"
        >
          Go to Home
        </a>
      </div>
    </div>
  )
}

export default NotFound
