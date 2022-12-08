import { DateSchedulingPost } from '../../domain/model/DateSchedulingPost'
import { WeekdaySchedulingPost } from '../../domain/model/WeekdaySchedulingPost'
import { SchedulingDto } from '../dto/SchedulingDto'
import { axiosConfig } from '../global'
import { schedulingTransformer } from '../transformer/SchedulingTransformer'

export const SchedulingAPI = (() => {
    async function getSchedulingStatus(postId: string): Promise<DateSchedulingPost | WeekdaySchedulingPost> {
        const response = await axiosConfig.get<SchedulingDto>(`/api/schedule/${postId}/status/`)
        return schedulingTransformer.fromDto(response.data)
    }
    function closeScheduling() { return }

    return Object.freeze({
        getSchedulingStatus,
        closeScheduling,
    })
})()
