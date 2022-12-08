export const strToBool = (a: string) =>
    Array(7).fill(0).map((_, i) => Array(48).fill(0).map((_, j) => a[(i * 48) + j] === '1'))

export const boolToStr = (a: boolean[][]) =>
    a.map(b => b.reduce((s, x) => s + (x ? '1' : '0'), '')).reduce((s, t) => s + t, '')
