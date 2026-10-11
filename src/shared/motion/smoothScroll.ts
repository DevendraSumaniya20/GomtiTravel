import Lenis from 'lenis'
import { gsap, motionAllowed, ScrollTrigger, useGSAP } from './gsap.ts'

let lenis: Lenis | null = null

/** Starts Lenis for the lifetime of the calling component and drives it from the GSAP ticker. */
export function useSmoothScroll(): void {
  useGSAP(() => {
    if (!motionAllowed()) return
    const instance = new Lenis()
    lenis = instance
    instance.on('scroll', ScrollTrigger.update)
    const raf = (time: number) => instance.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(raf)
      instance.destroy()
      lenis = null
    }
  })
}

/** Scrolls to the element with this id, smoothly when Lenis is running, and moves keyboard focus there. */
export function scrollToElement(id: string): void {
  const element = document.getElementById(id)
  if (!element) return
  // A section is not focusable by itself; without this the next Tab starts from the link that was clicked.
  if (!element.hasAttribute('tabindex')) element.tabIndex = -1
  element.focus({ preventScroll: true })
  if (lenis) lenis.scrollTo(element)
  else element.scrollIntoView()
}
