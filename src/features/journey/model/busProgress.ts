/**
 * Maps a scroll position to 0..1 along the dock so that stop `i` sits at
 * `i / (n - 1)`, however tall each section is. `tops` are the section tops in
 * scroll pixels, ascending.
 */
export function busProgress(scrollY: number, tops: readonly number[]): number {
  const last = tops.length - 1
  if (last < 1 || scrollY <= tops[0]!) return 0
  for (let i = 1; i <= last; i++) {
    const from = tops[i - 1]!
    const to = tops[i]!
    if (scrollY < to) return (i - 1 + (scrollY - from) / (to - from)) / last
  }
  return 1
}

/** The stop the bus is nearest to. */
export function nearestStop(progress: number, stopCount: number): number {
  return Math.round(progress * (stopCount - 1))
}
