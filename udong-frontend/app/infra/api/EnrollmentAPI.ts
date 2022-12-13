import { Enrollment } from '../../domain/model/Enrollment'
import { Participation } from '../../domain/model/Participation'
import { User } from '../../domain/model/User'
import { EnrollmentDto } from '../dto/EnrollmentDto'
import { ParticipationDto } from '../dto/ParticipationDto'
import { UserDto } from '../dto/UserDto'
import { axiosConfig } from '../global'
import { enrollmentTransformer } from '../transformer/EnrollmentTransformer'
import { participationTransformer } from '../transformer/ParticipationTransformer'
import { userTransformer } from '../transformer/UserTransformer'

export const EnrollmentAPI = (() => {
    async function getEnrollmentUsers(postId: string): Promise<Array<User>> {
        const response = await axiosConfig.get<Array<UserDto>>(`/api/enroll/${postId}/status/`)
        return response.data.map(userTransformer.fromDto)
    }

    async function closeEnrollment(postId: number): Promise<Enrollment> {
        const response = await axiosConfig.put<EnrollmentDto>(`/api/enroll/${postId}/close/`)
        return enrollmentTransformer.fromDto(response.data)
    }

    async function participateInEnrollment(postId: number): Promise<Participation> {
        const response = await axiosConfig.post<ParticipationDto>(`/api/enroll/${postId}/participate/`)
        return participationTransformer.fromDto(response.data)
    }
    function unparticipateInEnrollment() { return }

    async function getMyEnrollmentStatus(postId: number): Promise<Participation | void> {
        const response = await axiosConfig.get<ParticipationDto>(`/api/enroll/${postId}/me/`)
        return participationTransformer.fromDto(response.data)
    }

    return Object.freeze({
        getEnrollmentUsers,
        closeEnrollment,
        participateInEnrollment,
        unparticipateInEnrollment,
        getMyEnrollmentStatus,
    })
})()
