import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { UserAPI } from '../../../infra/api/UserAPI'
import { User } from '../../model/User'

export interface UserState {
    me?: User
    selectedUser?: User
}

const initialState: UserState = {
}

export const getMyProfile = createAsyncThunk(
    'user/getMyProfile',
    async () => {
        return UserAPI.getMyProfile()
    },
)

export const editMyProfile = createAsyncThunk(
    'user/editMyProfile',
    async () => { return },
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
    },
})

export const userActions = {
    ...userSlice.actions,
    getUser,
    getMyProfile,
}
export const userReducer = userSlice.reducer
