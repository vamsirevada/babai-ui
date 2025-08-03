import { useState, useEffect } from 'react'

/**
 * Custom hook for responsive media queries
 * Follows mobile-first approach with standard breakpoints
 */
export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }

    const listener = () => setMatches(media.matches)
    window.addEventListener('resize', listener)
    media.addEventListener('change', listener)

    return () => {
      window.removeEventListener('resize', listener)
      media.removeEventListener('change', listener)
    }
  }, [matches, query])

  return matches
}

// Predefined breakpoint hooks for common use cases
export const useIsMobile = () => useMediaQuery('(max-width: 767px)')
export const useIsTablet = () =>
  useMediaQuery('(min-width: 768px) and (max-width: 1023px)')
export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)')
export const useIsLargeScreen = () => useMediaQuery('(min-width: 1280px)')

// Responsive breakpoints
export const breakpoints = {
  mobile: '(max-width: 767px)',
  tablet: '(min-width: 768px) and (max-width: 1023px)',
  desktop: '(min-width: 1024px)',
  large: '(min-width: 1280px)',
}
