import { User } from './User'

export interface Participation {
    id: number
    users: Array<User>
    enrollmentId: number
    createdAt: string
    updatedAt: string
}
