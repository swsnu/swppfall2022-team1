import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ClubAPI } from '../../../infra/api/ClubAPI'
import { EventAPI } from '../../../infra/api/EventAPI'
import { ClubEvent } from '../../model/ClubEvent'
import { Time } from '../../model/Time'
import { APIErrorType } from '../ErrorHandler'
import { createPost } from '../post/PostSlice'

export interface EventErrorType {
    createEventError?: APIErrorType
}

export interface EventState {
    selectedEvent?: ClubEvent
    events: Array<ClubEvent>
    createPostEvent?: ClubEvent
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

export const createEvent = createAsyncThunk(
    'event/createEvent',
    async ({ clubId, name, time } : { clubId: number, name: string, time: Array<Time> }) => {
        return await ClubAPI.createClubEvent(clubId, name, time)
    },
)

export const editEvent = createAsyncThunk(
    'event/editEvent',
    async ({ eventId, name, time }: { eventId: number, name: string | null, time: Time[] | null }) => {
        return await EventAPI.editEvent(eventId, name, time)
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
        setCreatePostEvent: (state, action: PayloadAction<ClubEvent | undefined>) => {
            state.createPostEvent = action.payload
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
        builder.addCase(createPost.rejected, (state, action) => {
            state.selectedEvent = undefined
            state.errors.createEventError = action.payload
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
