import { UserDto } from './UserDto'

export interface AvailableTime {
    id: number
    user: UserDto
    time: boolean[][]
}
