import { DateSchedulingPost } from '../../domain/model/DateSchedulingPost'
import { WeekdaySchedulingPost } from '../../domain/model/WeekdaySchedulingPost'
import { boolToStr } from '../../utility/timetableFormatter'
import { SchedulingDto } from '../dto/SchedulingDto'
import { axiosConfig } from '../global'
import { schedulingTransformer } from '../transformer/SchedulingTransformer'

export const SchedulingAPI = (() => {
    async function getSchedulingStatus(postId: string): Promise<DateSchedulingPost | WeekdaySchedulingPost> {
        const response = await axiosConfig.get<SchedulingDto>(`/api/schedule/${postId}/status/`)
        return schedulingTransformer.fromDto(response.data)
    }

    async function closeScheduling(postId: string, confirmedTime: boolean[][]): Promise<void> {
        return await axiosConfig.put(
            `/api/schedule/${postId}/close/`,
            { confirmed_time: boolToStr(confirmedTime) },
        )
    }

    async function participateInScheduling(postId: string, time: boolean[][]): Promise<void> {
        return await axiosConfig.post(
            `api/schedule/${postId}/participate/`,
            { time: boolToStr(time) },
        )
    }

    return Object.freeze({
        getSchedulingStatus,
        closeScheduling,
        participateInScheduling,
    })
})()
