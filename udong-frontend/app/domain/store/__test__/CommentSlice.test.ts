import { commentReducer } from '../comment/CommentSlice'

export const fakeComment1 = { id: 1, userId: 1, postId: 1, content: 'content' }
export const fakeComment2 = { id: 1, userId: 1, postId: 1, content: 'content' }

jest.mock('next/config', () => () => ({
    publicRuntimeConfig: {
        backendUrl: '',
    },
}))

describe('comment reducer', () => {
    // let store: EnhancedStore<{ comment: CommentState },
    //     AnyAction,
    //     [ThunkMiddleware<{ comment: CommentState }, AnyAction, undefined>]>

    beforeAll(() => {
        // store = configureStore({ reducer: { club: clubReducer } })
    })
    it('should handle initial state', () => {
        expect(commentReducer(undefined, { type: 'unknown' })).toEqual({

        })
    })
})
