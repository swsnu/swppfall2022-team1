import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { EnrollmentAPI } from '../../../../infra/api/EnrollmentAPI'
import { EnrollmentStatus } from '../../../model/EnrollmentStatus'

export interface EnrollmentState {
    isOpen: boolean
    selectedEnrollmentStatus?: EnrollmentStatus
}

const initialState: EnrollmentState = {
    isOpen: true,
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
    async (postId: number) => {
        return EnrollmentAPI.getEnrollmentStatus(postId.toString())
    },
)

export const closeEnrollment = createAsyncThunk(
    'enrollment/closeEnrollment',
    async (postId: number) => {
        return EnrollmentAPI.closeEnrollment(postId)
    },
)

const enrollmentSlice = createSlice({
    name: 'enrollment',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getEnrollmentStatus.fulfilled, (state, action) => {
            state.selectedEnrollmentStatus = action.payload
        })
        builder.addCase(closeEnrollment.fulfilled, (state) => {
            state.isOpen = false
        })
    },
})

export const enrollmentActions = {
    ...enrollmentSlice.actions,
    getEnrollmentStatus,
    closeEnrollment,
}
export const enrollmentReducer = enrollmentSlice.reducer
