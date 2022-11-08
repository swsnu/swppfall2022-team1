export const new2dArray = <T>(d1: number, d2: number, x: T): T[][] => Array(d1).fill(0).map(() => Array(d2).fill(x))

export const timeToStr = (x: number) => (x % 2 === 0 ? `${x / 2}:00` : `${(x - 1) / 2}:30`)

