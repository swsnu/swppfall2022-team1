import { SchedulingPostType } from '../../domain/model/SchedulingPostType'

export interface TimeDto {
    type: SchedulingPostType
    start_date: string
    end_date: string
    repeat_start?: string
    repeat_end?: string
    weekday?: number
    start_time: number
    end_time: number
    created_at: string
    updated_at: string
}
