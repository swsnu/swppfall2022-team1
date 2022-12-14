import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { ClubAPI } from '../../../infra/api/ClubAPI'
import { EventAPI } from '../../../infra/api/EventAPI'
import { ClubEvent } from '../../model/ClubEvent'
import { Time } from '../../model/Time'
import { APIError, APIErrorType } from '../ErrorHandler'

export interface EventErrorType {
    createEventError?: APIErrorType
    editEventError?: APIErrorType
}

export interface EventState {
    selectedEvent?: ClubEvent
    events: Array<ClubEvent>
    errors: EventErrorType
}

const initialState: EventState = {
    events: [],
    errors: {},
}

export const getEvents = createAsyncThunk(
    'event/getEvents',
    async (clubId: number) => {
        return await ClubAPI.getClubEvents(clubId)
    },
)

export const getEvent = createAsyncThunk(
    'event/getEvent',
    (eventId: number) => {
        return EventAPI.getEvent(eventId)
    },
)

export const createEvent = createAsyncThunk<ClubEvent | undefined,
    { clubId: number, name: string, time: Array<Time> }, { rejectValue: APIErrorType }>(
        'event/createEvent',
        async ({ clubId, name, time } : { clubId: number, name: string, time: Array<Time> }, { rejectWithValue }) => {
            try{
                return await ClubAPI.createClubEvent(clubId, name, time)
            } catch (e) {
                if (axios.isAxiosError(e)) {
                    const errorType = APIError.getErrorType(e.response?.status)
                    let message: string = errorType.message
                    if (errorType.errorCode === 400) {
                        message = '모든 필드를 알맞게 입력해주세요.'
                    }
                    return rejectWithValue({
                        ...errorType,
                        message,
                    })
                }
            }
        },
    )

export const editEvent = createAsyncThunk<ClubEvent | undefined,
    { eventId: number, name: string, time: Array<Time> }, { rejectValue: APIErrorType }>(
        'event/editEvent',
        async ({ eventId, name, time } : { eventId: number, name: string, time: Array<Time> }, { rejectWithValue }) => {
            try{
                return await EventAPI.editEvent(eventId, name, time)
            } catch (e) {
                if (axios.isAxiosError(e)) {
                    const errorType = APIError.getErrorType(e.response?.status)
                    let message: string = errorType.message
                    if (errorType.errorCode === 400) {
                        message = '모든 필드를 알맞게 입력해주세요.'
                    }
                    return rejectWithValue({
                        ...errorType,
                        message,
                    })
                }
            }
        },
    )

export const deleteEvent = createAsyncThunk(
    'event/deleteEvent',
    async (eventId: number) => {
        return await EventAPI.deleteEvent(eventId)
    },
)

const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        resetErrors: (state)=>{
            state.errors = {}
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getEvents.fulfilled, (state, action) => {
            state.events = action.payload
        })
        builder.addCase(getEvent.fulfilled, (state, action) => {
            state.selectedEvent = action.payload
        })
        builder.addCase(createEvent.fulfilled, (state, action) => {
            state.selectedEvent = action.payload
        })
        builder.addCase(createEvent.rejected, (state, action) => {
            state.selectedEvent = undefined
            state.errors.createEventError = action.payload
        })
        builder.addCase(editEvent.fulfilled, (state, action) => {
            state.selectedEvent = action.payload
        })
        builder.addCase(editEvent.rejected, (state, action) => {
            state.errors.editEventError = action.payload
        })
    },
})

export const eventActions = {
    ...eventSlice.actions,
    getEvents,
    getEvent,
    createEvent,
    editEvent,
    deleteEvent,
}
export const eventReducer = eventSlice.reducer
