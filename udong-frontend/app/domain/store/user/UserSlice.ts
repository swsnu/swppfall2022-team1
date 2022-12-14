import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { ClubAPI } from '../../../infra/api/ClubAPI'
import { UserAPI } from '../../../infra/api/UserAPI'
import { RoleType } from '../../model/RoleType'
import { User } from '../../model/User'
import { APIError, APIErrorType } from '../ErrorHandler'

export interface UserErrorType {
    deleteAccountError?: APIErrorType
}

export interface UserState {
    me?: User
    selectedUser?: User
    isAdmin: boolean
    errors: UserErrorType
}

const initialState: UserState = {
    isAdmin: false,
    errors: {},
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

export const deleteAccount = createAsyncThunk<void, undefined, { rejectValue: APIErrorType }>(
    'user/deleteAccount',
    async (_, { rejectWithValue }) => {
        try {
            return await UserAPI.deleteAccount()
        } catch (e) {
            if (axios.isAxiosError(e)) {
                const errorType = APIError.getErrorType(e.response?.status)
                let message: string = errorType.message

                if (errorType.errorCode === 403) {
                    message = '관리자는 계정을 삭제할 수 없습니다.'
                }
                return rejectWithValue({
                    ...errorType,
                    message,
                })
            }
        }
    },
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
    reducers: {
        resetErrors: (state) => {
            state.errors = {}
        },
    },
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
        builder.addCase(deleteAccount.rejected, (state, action) => {
            state.errors.deleteAccountError = action.payload
        })
    },
})

export const userActions = {
    ...userSlice.actions,
    getUser,
    getMyProfile,
    editMyProfile,
    getMyClubProfile,
    deleteAccount,
}
export const userReducer = userSlice.reducer
