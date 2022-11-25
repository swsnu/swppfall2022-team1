import { configureStore, EnhancedStore } from '@reduxjs/toolkit'
import axios from 'axios'
import { AnyAction } from 'redux'
import { ThunkMiddleware } from 'redux-thunk'

import { eventReducer, EventState, getEvents } from '../event/EventSlice'

export const fakeEventDto1 = { id: 1, name: '단풍', created_at: '', updated_at: '' }
export const fakeEventDto2 = { id: 2, name: '은행', created_at: '', updated_at: '' }
export const fakeEvent1 = { id: 1, name: '단풍', createdAt: '', updatedAt: '' }
export const fakeEvent2 = { id: 2, name: '은행', createdAt: '', updatedAt: '' }

describe('event reducer', () => {
    let store: EnhancedStore<{ event: EventState },
        AnyAction,
        [ThunkMiddleware<{ event: EventState }, AnyAction, undefined>]>
    const fakeEventDto = {
        selectedEvent: fakeEventDto1,
        events: [fakeEventDto1, fakeEventDto2],
    }
    const fakeEvent : EventState = {
        selectedEvent: fakeEvent1,
        events: [fakeEvent1, fakeEvent2],
    }

    beforeAll(() => {
        store = configureStore({ reducer: { event: eventReducer } })
    })
    it('should handle initial state', () => {
        expect(eventReducer(undefined, { type: 'unknown' })).toEqual({
            events: [],
        })
    })
    it('should handle getEvents', async () => {
        axios.get = jest.fn().mockResolvedValue({ data: fakeEventDto.events })
        await store.dispatch(getEvents(1))
        expect(store.getState().event.events).toEqual(fakeEvent.events)
    })
})
