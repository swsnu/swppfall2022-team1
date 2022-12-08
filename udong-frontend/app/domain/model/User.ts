import { new2dArray } from '../../utility/functions'

export interface User {
    id: number
    email: string
    imageUrl: string
    timeTable: boolean[][]
    name: string
}

export const dummyUserMe: User = {
    id: 1,
    email: '',
    imageUrl: '',
    timeTable: new2dArray(48, 7, false),
    name: '이유빈',
}

export const dummyUserNotMe: User = {
    id: 2,
    email: '',
    imageUrl: '',
    timeTable: new2dArray(48, 7, false),
    name: '박지연',
}
