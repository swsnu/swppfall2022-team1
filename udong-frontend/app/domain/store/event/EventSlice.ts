import { createSlice } from '@reduxjs/toolkit'

import { Event } from '../../model/Event'

interface EventState {
    selectedEvent?: Event
}

const initialState: EventState = {
}

// TODO: actions
//         getEvents,
//         getEvent,
//         createEvent,
//         editEvent,
//         deleteEvent,

const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {},
})

export const eventActions = eventSlice.actions
export const eventReducer = eventSlice.reducer
