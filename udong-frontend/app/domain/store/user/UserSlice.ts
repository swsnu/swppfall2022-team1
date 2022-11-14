import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { User } from '../../model/User'

interface UserState {
    me?: User
    selectedUser?: User
}

const initialState: UserState = {
}

export const getMyProfile = createAsyncThunk(
    'user/getMyProfile',
    async () => { return },
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
    async () => { return },
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
})

export const userActions = userSlice.actions
export const userReducer = userSlice.reducer
