import { EnrollmentStatus } from '../../domain/model/EnrollmentStatus'
import { ParticipationDto } from '../dto/ParticipationDto'
import { axiosConfig } from '../global'
import { participationTransformer } from '../transformer/ParticipationTransformer'

export const EnrollmentAPI = (() => {
    async function getEnrollmentStatus(postId: string): Promise<EnrollmentStatus> {
        const response = await axiosConfig.get<ParticipationDto>(`/api/enroll/${postId}/status/`)
        return participationTransformer.fromDto(response.data)
    }

    function closeEnrollment() { return }

    return Object.freeze({
        getEnrollmentStatus,
        closeEnrollment,
    })
})()
