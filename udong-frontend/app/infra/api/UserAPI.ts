import axios from 'axios'

import { User } from '../../domain/model/User'
import { UserDto } from '../dto/UserDto'
import { userTransformer } from '../transformer/UserTransformer'

export const UserAPI = (() => {
    function getMyProfile() { return }
    function editMyProfile() { return }
    function deleteAccount() { return }

    async function getUser(userId: number): Promise<User> {
        const response = await axios.get<UserDto>(`/api/user/${userId}`)
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
