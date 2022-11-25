import { configureStore, EnhancedStore } from '@reduxjs/toolkit'
import axios from 'axios'
import { AnyAction } from 'redux'
import { ThunkMiddleware } from 'redux-thunk'

import { eventReducer, EventState, getEvents } from '../event/EventSlice'

describe('event reducer', () => {
    let store: EnhancedStore<{ event: EventState },
        AnyAction,
        [ThunkMiddleware<{ event: EventState }, AnyAction, undefined>]>
    const fakeEventDto = {
        selectedEvent: {
            id: 1,
            name: '단풍',
            created_at: '',
            updated_at: '',
        },
        events: [{
            id: 1,
            name: '단풍',
            created_at: '',
            updated_at: '',
        }, {
            id: 2,
            name: '은행',
            created_at: '',
            updated_at: '',
        },
        ],
    }
    const fakeEvent : EventState = {
        selectedEvent: { id: 1, name: '단풍', createdAt: '', updatedAt: '' },
        events: [{ id: 1, name: '단풍', createdAt: '', updatedAt: '' }, { id: 2, name: '은행', createdAt: '', updatedAt: '' }],
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
