import { Enrollment } from '../../domain/model/Enrollment'
import { User } from '../../domain/model/User'
import { EnrollmentDto } from '../dto/EnrollmentDto'
import { UserDto } from '../dto/UserDto'
import { axiosConfig } from '../global'
import { enrollmentTransformer } from '../transformer/EnrollmentTransformer'
import { userTransformer } from '../transformer/UserTransformer'

export const EnrollmentAPI = (() => {
    async function getEnrollmentStatus(postId: string): Promise<Array<User>> {
        const response = await axiosConfig.get<Array<UserDto>>(`/api/enroll/${postId}/status/`)
        return response.data.map(userTransformer.fromDto)
    }

    async function closeEnrollment(postId: number): Promise<Enrollment> {
        const response = await axiosConfig.put<EnrollmentDto>(`/api/enroll/${postId}/close/`)
        return enrollmentTransformer.fromDto(response.data)
    }

    return Object.freeze({
        getEnrollmentStatus,
        closeEnrollment,
    })
})()
