import { UserDto } from './UserDto'

export interface ParticipationDto {
    id: number
    user: Array<UserDto>
    enrollment_id: number
    created_at?: string
    updated_at?: string
}
