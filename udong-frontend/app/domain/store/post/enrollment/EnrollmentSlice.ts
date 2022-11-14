import { createSlice } from '@reduxjs/toolkit'

interface EnrollmentState {
    isOpen: boolean
}

const initialState: EnrollmentState = {
    isOpen: false,
}

// TODO: actions
//        participateInEnrollment,
//        unParticipateInEnrollment,
//         getEnrollmentStatus,
//         closeEnrollment,

const enrollmentSlice = createSlice({
    name: 'enrollment',
    initialState,
    reducers: {},
})

export const enrollmentActions = enrollmentSlice.actions
export const enrollmentReducer = enrollmentSlice.reducer
