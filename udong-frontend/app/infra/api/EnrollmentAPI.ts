import { Enrollment } from '../../domain/model/Enrollment'
import { EnrollmentStatus } from '../../domain/model/EnrollmentStatus'
import { EnrollmentDto } from '../dto/EnrollmentDto'
import { ParticipationDto } from '../dto/ParticipationDto'
import { axiosConfig } from '../global'
import { enrollmentTransformer } from '../transformer/EnrollmentTransformer'
import { participationTransformer } from '../transformer/ParticipationTransformer'

export const EnrollmentAPI = (() => {
    async function getEnrollmentStatus(postId: string): Promise<EnrollmentStatus> {
        const response = await axiosConfig.get<ParticipationDto>(`/api/enroll/${postId}/status/`)
        return participationTransformer.fromDto(response.data)
    }

    async function closeEnrollment(postId: number): Promise<Enrollment> {
        const response = await axiosConfig.put<EnrollmentDto>(`/api/enroll/${postId}/close/`)
        return enrollmentTransformer.toDto(response.data)
    }

    return Object.freeze({
        getEnrollmentStatus,
        closeEnrollment,
    })
})()
