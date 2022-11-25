import { schedulingReducer } from '../post/scheduling/SchedulingSlice'

jest.mock('next/config', () => () => ({
    publicRuntimeConfig: {
        backendUrl: '',
    },
}))

describe('scheduling reducer', () => {
    // let store: EnhancedStore<{ enrollment: EnrollmentState },
    //     AnyAction,
    //     [ThunkMiddleware<{ enrollment: EnrollmentState }, AnyAction, undefined>]>
    // const fakeEnrollmentDto = {
    //     isOpen: true,
    // }
    // const fakeEnrollment: EnrollmentState = {
    //     isOpen: true,
    // }

    beforeAll(() => {
        // store = configureStore({ reducer: { club: clubReducer } })
    })
    it('should handle initial state', () => {
        expect(schedulingReducer(undefined, { type: 'unknown' })).toEqual({
            isOpen: false,
        })
    })
})
