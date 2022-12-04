import { User } from '../../domain/model/User'
import { UserDto } from '../dto/UserDto'
import { axiosConfig } from '../global'
import { userTransformer } from '../transformer/UserTransformer'

export const UserAPI = (() => {
    async function getMyProfile(): Promise<User> {
        const response = await axiosConfig.get<UserDto>(`/api/user/me/`)
        return userTransformer.fromDto(response.data)
    }
    async function editMyProfile(user: User): Promise<User> {
        const response = await axiosConfig.put<UserDto>(
            `/api/user/me/`,
            { user },
        )
        return userTransformer.fromDto(response.data)
    }
    function deleteAccount() { return }

    async function getUser(userId: number): Promise<User> {
        const response = await axiosConfig.get<UserDto>(`/api/user/${userId}/`)
        return userTransformer.fromDto(response.data)
    }

    function participateInEnrollment() { return }
    function unparticipateInEnrollment() { return }
    function participateInScheduling() { return }

    function registerNewClub() { return }
    function leaveClub() { return }

    return Object.freeze({
        getMyProfile,
        editMyProfile,
        deleteAccount,
        getUser,
        participateInEnrollment,
        unparticipateInEnrollment,
        participateInScheduling,
        registerNewClub,
        leaveClub,
    })
})()
