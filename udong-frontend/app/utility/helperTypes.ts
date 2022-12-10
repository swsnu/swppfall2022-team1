// set one type to optional
export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>

// eslint-disable-next-line
export const isAllObjectFieldsUndefined = (obj: Object): boolean => {
    return Object.values(obj).every(val => val === undefined)
}
