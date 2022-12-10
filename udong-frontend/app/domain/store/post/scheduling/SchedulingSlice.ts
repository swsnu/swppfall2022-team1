import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { SchedulingAPI } from '../../../../infra/api/SchedulingAPI'
import { DateSchedulingPost } from '../../../model/DateSchedulingPost'
import { WeekdaySchedulingPost } from '../../../model/WeekdaySchedulingPost'

export interface SchedulingState {
    isOpen: boolean
    schedulingStatus?: DateSchedulingPost | WeekdaySchedulingPost
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
    async (postId: string) => { return SchedulingAPI.getSchedulingStatus(postId) },
)

export const closeScheduling = createAsyncThunk(
    'scheduling/closeScheduling',
    async ({ postId, confirmedTime }: { postId: string, confirmedTime: boolean[][] }) => {
        return SchedulingAPI.closeScheduling(postId, confirmedTime)
    },
)

const schedulingSlice = createSlice({
    name: 'scheduling',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getSchedulingStatus.fulfilled, (state, action) => {
            state.schedulingStatus = action.payload
        })
    },
})

export const schedulingActions = { ...schedulingSlice.actions, getSchedulingStatus }
export const schedulingReducer = schedulingSlice.reducer
