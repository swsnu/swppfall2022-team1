import { RoleType } from '../../domain/model/RoleType'
import { UserDto } from './UserDto'

export interface ClubUserDto {
    user: UserDto
    auth: RoleType
}
