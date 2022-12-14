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
        const userDto = userTransformer.toEditDto(user)
        const response = await axiosConfig.put<UserDto>(
            `/api/user/me/`,
            userDto,
        )
        return userTransformer.fromDto(response.data)
    }

    async function deleteAccount(): Promise<void> {
        return await axiosConfig.delete(`/api/user/me/`)
    }

    async function getUser(userId: number): Promise<User> {
        const response = await axiosConfig.get<UserDto>(`/api/user/${userId}/`)
        return userTransformer.fromDto(response.data)
    }

    return Object.freeze({
        getMyProfile,
        editMyProfile,
        deleteAccount,
        getUser,
    })
})()
