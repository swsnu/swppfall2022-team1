import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface EnrollmentState {
    isOpen: boolean
}

const initialState: EnrollmentState = {
    isOpen: false,
}

export const participateInEnrollment = createAsyncThunk(
    'enrollment/participateInEnrollment',
    async () => { return },
)

export const unparticipateInEnrollment = createAsyncThunk(
    'enrollment/unparticipateInEnrollment',
    async () => { return },
)

export const getEnrollmentStatus = createAsyncThunk(
    'enrollment/getEnrollmentStatus',
    async () => { return },
)

export const closeEnrollment = createAsyncThunk(
    'enrollment/closeEnrollment',
    async () => { return },
)

const enrollmentSlice = createSlice({
    name: 'enrollment',
    initialState,
    reducers: {},
})

export const enrollmentActions = enrollmentSlice.actions
export const enrollmentReducer = enrollmentSlice.reducer
