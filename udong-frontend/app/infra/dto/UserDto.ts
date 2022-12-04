import { Optional } from '../../utility/helperTypes'

export interface UserDto {
    id: number
    email: string
    image: string
    time_table?: string
    name: string
    created_at: string //Date-time
    updated_at: string //Date-time
}

export interface UserEditDto {
    email?: string
    image?: string
    time_table?: string
    name?: string
}

type required = Required<UserEditDto>
export type UserCommentDto = Optional<required, 'time_table'>
