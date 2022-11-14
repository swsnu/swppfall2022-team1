import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface SchedulingState {
    isOpen: boolean
}

const initialState: SchedulingState = {
    isOpen: false,
}

export const participateInScheduling = createAsyncThunk(
    'scheduling/participateInScheduling',
    async () => { return },
)

export const getSchedulingStatus = createAsyncThunk(
    'scheduling/getSchedulingStatus',
    async () => { return },
)

export const closeScheduling = createAsyncThunk(
    'scheduling/closeScheduling',
    async () => { return },
)

const schedulingSlice = createSlice({
    name: 'scheduling',
    initialState,
    reducers: {},
})

export const schedulingActions = schedulingSlice.actions
export const schedulingReducer = schedulingSlice.reducer
