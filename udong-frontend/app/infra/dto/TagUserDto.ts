import { UserDto } from './UserDto'

export interface TagUserDto {
    id: number
    name: string
    is_default: boolean
    users: Array<UserDto>
    created_at: string
    updated_at: string
}
