import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface AuthState {
    isLoggedIn: boolean
}

const initialState: AuthState = {
    isLoggedIn: false,
}

export const signUp = createAsyncThunk(
    'user/signUp',
    async () => { return },
)

export const login = createAsyncThunk(
    'user/login',
    async () => { return },
)

export const logout = createAsyncThunk(
    'user/logout',
    async () => { return },
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
})

export const authActions = authSlice.actions
export const authReducer = authSlice.reducer
