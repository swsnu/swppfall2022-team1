import { createSlice } from '@reduxjs/toolkit'

import { User } from '../../model/User'

interface UserState {
    me?: User
    selectedUser?: User
}

const initialState: UserState = {
}

// TODO: actions
// getMyProfile,
// editMyProfile,
// deleteAccount,
// getUser,

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
})

export const userActions = userSlice.actions
export const userReducer = userSlice.reducer
