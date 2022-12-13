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
    async ({ postId, time }:{ postId: string, time: boolean[][] }) => {
        await SchedulingAPI.participateInScheduling(postId, time)
    },
)

export const getSchedulingStatus = createAsyncThunk(
    'scheduling/getSchedulingStatus',
    (postId: string) => { return SchedulingAPI.getSchedulingStatus(postId) },
)

export const closeScheduling = createAsyncThunk(
    'scheduling/closeScheduling',
    async ({ postId, confirmedTime }: { postId: string, confirmedTime: boolean[][] }) => {
        await SchedulingAPI.closeScheduling(postId, confirmedTime)
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

export const schedulingActions = { ...schedulingSlice.actions, getSchedulingStatus, participateInScheduling }
export const schedulingReducer = schedulingSlice.reducer
