/// <reference types="vite/client" />

declare module '@studio-freight/lenis' {
  interface LenisOptions {
    duration?: number
    easing?: (t: number) => number
    orientation?: 'vertical' | 'horizontal'
    gestureOrientation?: 'vertical' | 'horizontal' | 'both'
    smoothWheel?: boolean
    smoothTouch?: boolean
    wheelMultiplier?: number
    touchMultiplier?: number
    infinite?: boolean
  }

  export default class Lenis {
    constructor(options?: LenisOptions)
    raf(time: number): void
    on(event: string, callback: (...args: any[]) => void): void
    off(event: string, callback: (...args: any[]) => void): void
    scrollTo(target: number | string | HTMLElement, options?: any): void
    destroy(): void
    scroll: number
    velocity: number
  }
}
