import { enrollmentReducer } from '../post/enrollment/EnrollmentSlice'

describe('enrollment reducer', () => {
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
        expect(enrollmentReducer(undefined, { type: 'unknown' })).toEqual({
            isOpen: false,
        })
    })
})
