import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { ClubAPI } from '../../../infra/api/ClubAPI'
import { UserAPI } from '../../../infra/api/UserAPI'
import { RoleType } from '../../model/RoleType'
import { User } from '../../model/User'

export interface UserState {
    me?: User
    selectedUser?: User
    isAdmin: boolean
}

const initialState: UserState = {
    isAdmin: false,
}

export const getMyProfile = createAsyncThunk(
    'user/getMyProfile',
    async () => {
        return UserAPI.getMyProfile()
    },
)

export const getMyClubProfile = createAsyncThunk(
    'user/getMyClubProfile',
    async (clubId: number) => {
        return ClubAPI.getMyClubProfile(clubId)
    },
)

export const editMyProfile = createAsyncThunk(
    'user/editMyProfile',
    async (user: User) => {
        return UserAPI.editMyProfile(user)
    },
)

export const deleteAccount = createAsyncThunk(
    'user/deleteAccount',
    async () => { return },
)

export const getUser = createAsyncThunk(
    'user/getUser',
    async (userId: number) => {
        return UserAPI.getUser(userId)
    },
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.selectedUser = action.payload
        })
        builder.addCase(getMyProfile.fulfilled, (state, action) => {
            state.me = action.payload
        })
        builder.addCase(editMyProfile.fulfilled, (state, action) => {
            state.me = action.payload
        })
        builder.addCase(getMyClubProfile.fulfilled, (state, action) => {
            state.isAdmin = action.payload.role === RoleType.ADMIN
        })
    },
})

export const userActions = {
    ...userSlice.actions,
    getUser,
    getMyProfile,
    editMyProfile,
    getMyClubProfile,
}
export const userReducer = userSlice.reducer
