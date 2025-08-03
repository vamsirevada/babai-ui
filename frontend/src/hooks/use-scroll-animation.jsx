import { useEffect, useState } from 'react'

export function useScrollAnimation() {
  const [elementRef, setElementRef] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!elementRef) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Once element is animated, no need to observe anymore
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -10% 0px', // Slightly delay the animation until more of the element is in view
      }
    )

    observer.observe(elementRef)

    return () => {
      if (elementRef) {
        observer.unobserve(elementRef)
      }
    }
  }, [elementRef])

  return [setElementRef, isVisible]
}
