import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { EnrollmentAPI } from '../../../../infra/api/EnrollmentAPI'
import { Enrollment } from '../../../model/Enrollment'
import { User } from '../../../model/User'

export interface EnrollmentState {
    selectedEnrollment?: Enrollment
    selectedEnrollmentUsers?: Array<User>
    myEnrollmentStatus?: boolean
}

const initialState: EnrollmentState = {}

export const participateInEnrollment = createAsyncThunk(
    'enrollment/participateInEnrollment',
    async () => { return },
)

export const unparticipateInEnrollment = createAsyncThunk(
    'enrollment/unparticipateInEnrollment',
    async () => { return },
)

export const getMyEnrollmentStatus = createAsyncThunk(
    'enrollment/getMyEnrollmentStatus',
    async (postId: number) => {
        return await EnrollmentAPI.getMyEnrollmentStatus(postId)
    },
)

export const getEnrollmentUsers = createAsyncThunk(
    'enrollment/getEnrollmentStatus',
    async (postId: number) => {
        return EnrollmentAPI.getEnrollmentUsers(postId.toString())
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
    reducers: {
        resetSelectedEnrollment: (state) => {
            state.selectedEnrollment = undefined
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getEnrollmentUsers.fulfilled, (state, action) => {
            state.selectedEnrollmentUsers = action.payload
        })
        builder.addCase(closeEnrollment.fulfilled, (state, action) => {
            state.selectedEnrollment = action.payload
        })
        builder.addCase(closeEnrollment.rejected, (state) => {
            state.selectedEnrollment = undefined
        })
        builder.addCase(getMyEnrollmentStatus.fulfilled, (state, action) => {
            if (action.payload) {
                state.myEnrollmentStatus = true
            }
        })
        builder.addCase(getMyEnrollmentStatus.rejected, (state) => {
            state.myEnrollmentStatus = false
        })
    },
})

export const enrollmentActions = {
    ...enrollmentSlice.actions,
    getEnrollmentUsers,
    closeEnrollment,
    getMyEnrollmentStatus,
}
export const enrollmentReducer = enrollmentSlice.reducer
