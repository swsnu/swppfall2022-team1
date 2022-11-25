import { authReducer } from '../auth/AuthSlice'

jest.mock('next/config', () => () => ({
    publicRuntimeConfig: {
        backendUrl: '',
    },
}))

describe('auth slice', () => {
    // let store: EnhancedStore<{ isLoggedIn: AuthState },
    //     AnyAction,
    //     [ThunkMiddleware<{ isLoggedIn: AuthState }, AnyAction, undefined>]>
    // const fakeAuth = {
    //     isLoggedIn: true,
    // }

    beforeAll(() => {
        // store = configureStore({ reducer: { isLoggedIn: authReducer } })
    })
    it('should handle initial state', () => {
        expect(authReducer(undefined, { type: 'unknown' })).toEqual({
            isLoggedIn: false,
        })
    })

    //should be implemented later
})
