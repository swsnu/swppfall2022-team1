import { commentReducer } from '../comment/CommentSlice'

describe('comment reducer', () => {
    // let store: EnhancedStore<{ comment: CommentState },
    //     AnyAction,
    //     [ThunkMiddleware<{ comment: CommentState }, AnyAction, undefined>]>
    // const fakeCommentDto = {
    // }
    // const fakeComment: CommentState = {
    //     selectedComment: {
    //         id: 1,
    //         userId: 1,
    //         postId: 1,
    //         content: 'content',
    //     },
    // }

    beforeAll(() => {
        // store = configureStore({ reducer: { club: clubReducer } })
    })
    it('should handle initial state', () => {
        expect(commentReducer(undefined, { type: 'unknown' })).toEqual({

        })
    })
})
