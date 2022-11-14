import { createSlice } from '@reduxjs/toolkit'

interface SchedulingState {
    isOpen: boolean
}

const initialState: SchedulingState = {
    isOpen: false,
}

// TODO: actions

const schedulingSlice = createSlice({
    name: 'scheduling',
    initialState,
    reducers: {},
})

export const schedulingActions = schedulingSlice.actions
export const schedulingReducer = schedulingSlice.reducer
