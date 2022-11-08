export interface User {
    id: number
    gmail: string
    imageUrl: string
    timeTable: string
    name: string
}

export const dummyUserMe: User = {
    id: 1,
    gmail: '',
    imageUrl: '',
    timeTable: '',
    name: '이유빈',
}

export const dummyUserNotMe: User = {
    id: 2,
    gmail: '',
    imageUrl: '',
    timeTable: '',
    name: '박지연',
}
