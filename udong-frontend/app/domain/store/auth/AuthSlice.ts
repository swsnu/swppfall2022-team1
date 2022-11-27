import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { AuthAPI } from '../../../infra/api/AuthAPI'

export interface AuthState {
    isLoggedIn: boolean
}

const initialState: AuthState = {
    isLoggedIn: false,
}

export const login = createAsyncThunk(
    'user/login',
    async (loginRequest: { email: string, token: string, name: string }) => {
        const { email, token, name } = loginRequest
        return AuthAPI.signIn(email, token, name)
    },
)

export const logout = createAsyncThunk(
    'user/logout',
    async () => {
        return AuthAPI.signOut()
    },
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state) => {
            state.isLoggedIn = true
        })
        builder.addCase(logout.fulfilled, (state) => {
            state.isLoggedIn = false
        })
    },
})

export const authActions = {
    ...authSlice.actions,
    login,
    logout,
}
export const authReducer = authSlice.reducer
