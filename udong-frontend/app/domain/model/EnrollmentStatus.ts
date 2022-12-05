import { User } from './User'

export interface EnrollmentStatus {
    id: number
    users: Array<User>
    enrollmentId: number
    createdAt?: string
    updatedAt?: string
}
