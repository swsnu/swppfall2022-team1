import { Enrollment } from '../../domain/model/Enrollment'
import { EnrollmentDto } from '../dto/EnrollmentDto'
import { axiosConfig } from '../global'
import { enrollmentTransformer } from '../transformer/EnrollmentTransformer'

export const EnrollmentAPI = (() => {
    function getEnrollmentStatus() { return }
    async function closeEnrollment(postId: number): Promise<Enrollment> {
        const response = await axiosConfig.put<EnrollmentDto>(`/api/enroll/${postId}/close/`)
        return enrollmentTransformer.toDto(response.data)
    }

    return Object.freeze({
        getEnrollmentStatus,
        closeEnrollment,
    })
})()
