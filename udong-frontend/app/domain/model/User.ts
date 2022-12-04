export interface User {
    id: number
    email: string
    imageUrl: string
    timeTable?: string
    name: string
}

export const dummyUserMe: User = {
    id: 1,
    email: '',
    imageUrl: '',
    timeTable: '',
    name: '이유빈',
}

export const dummyUserNotMe: User = {
    id: 2,
    email: '',
    imageUrl: '',
    timeTable: '',
    name: '박지연',
}
