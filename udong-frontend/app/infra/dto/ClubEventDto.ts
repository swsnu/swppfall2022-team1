import { TimeDto } from './TimeDto'

export interface ClubEventDto {
    id: number
    name: string
    time?: Array<TimeDto>
    created_at: string
    updated_at: string
}

export interface ClubEventEditDto {
    name?: string
    new_time?: Array<Partial<TimeDto>>
}
