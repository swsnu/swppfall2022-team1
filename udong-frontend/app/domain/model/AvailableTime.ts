import { User } from './User'

export interface AvailableTime {
    id: number
    user: User
    time: boolean[][]
}
