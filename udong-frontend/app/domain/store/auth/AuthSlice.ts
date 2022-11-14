import { createSlice } from '@reduxjs/toolkit'

interface AuthState {
    // TODO: 나중에 바꾸기
    isLoggedIn: boolean
}

const initialState: AuthState = {
    isLoggedIn: false,
}

// TODO: actions
// signUp,
// login,
// logout,

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
})

export const authActions = authSlice.actions
export const authReducer = authSlice.reducer
