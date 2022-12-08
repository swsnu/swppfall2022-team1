import { SchedulingPost } from '../../domain/model/SchedulingPost'
import { SchedulingDto } from '../dto/SchedulingDto'
import { axiosConfig } from '../global'
import { schedulingTransformer } from '../transformer/SchedulingTransformer'

export const SchedulingAPI = (() => {
    async function getSchedulingStatus(postId: number): Promise<SchedulingPost> {
        const response = await axiosConfig.get<SchedulingDto>(`/api/schedule/${postId}/status/`)
        return schedulingTransformer.fromDto(response.data)
    }
    function closeScheduling() { return }

    return Object.freeze({
        getSchedulingStatus,
        closeScheduling,
    })
})()
