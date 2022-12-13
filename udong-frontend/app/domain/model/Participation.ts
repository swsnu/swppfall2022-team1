import { User } from './User'

export interface Participation {
    id: number
    user: User
    enrollmentId: number
    createdAt: string
    updatedAt: string
}
