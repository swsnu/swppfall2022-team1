import { Optional } from '../../utility/helperTypes'

export interface ClubDto {
    id: number
    name: string
    image: string
    code: string
    created_at: string
    updated_at: string
}

type ClubDtoWithOptionalImage = Optional<ClubDto, 'image'>
export type ClubEditDto = Pick<ClubDtoWithOptionalImage, 'name' | 'image'>
