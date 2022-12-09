import { UserDto } from './UserDto'

export interface AvailableTimeDto {
    id: number
    user: UserDto
    time: string
}
