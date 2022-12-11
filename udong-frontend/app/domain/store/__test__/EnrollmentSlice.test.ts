import { configureStore, EnhancedStore } from '@reduxjs/toolkit'
import { AnyAction } from 'redux'
import { ThunkMiddleware } from 'redux-thunk'

import { enrollmentReducer, EnrollmentState } from '../post/enrollment/EnrollmentSlice'

jest.mock('next/config', () => () => ({
    publicRuntimeConfig: {
        backendUrl: '',
    },
}))

describe('enrollment reducer', () => {
    // eslint-disable-next-line
    let store: EnhancedStore<{ enrollment: EnrollmentState },
        AnyAction,
        [ThunkMiddleware<{ enrollment: EnrollmentState }, AnyAction, undefined>]>
    beforeAll(() => {
        store = configureStore({ reducer: { enrollment: enrollmentReducer } })
    })
    it('should handle initial state', () => {
        expect(enrollmentReducer(undefined, { type: 'unknown' })).toEqual({})
    })
})
