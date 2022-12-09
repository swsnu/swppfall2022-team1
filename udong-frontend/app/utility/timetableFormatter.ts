export const strToBool = (a: string, d1 = 7, d2 = 48) =>
    Array(d1).fill(0).map((_, i) => Array(d2).fill(0).map((_, j) => a[(i * d2) + j] === '1'))

export const boolToStr = (a: boolean[][]) =>
    a.map(b => b.reduce((s, x) => s + (x ? '1' : '0'), '')).reduce((s, t) => s + t, '')
