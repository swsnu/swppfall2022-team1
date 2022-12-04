import { configureStore, EnhancedStore } from '@reduxjs/toolkit'
import { AnyAction } from 'redux'
import { ThunkMiddleware } from 'redux-thunk'

import { CommentDto } from '../../../infra/dto/CommentDto'
import { axiosConfig } from '../../../infra/global'
import { Comment } from '../../model/Comment'
import { commentReducer, CommentState, getComments } from '../comment/CommentSlice'
import { fakeUser1, fakeUserDto1 } from './UserSlice.test'

export const fakeCommentDto: CommentDto = { id: 1, user: fakeUserDto1, post_id: 1, content: 'content' }
export const fakeComment: Comment = { id: 1, user: fakeUser1, postId: 1, content: 'content' }

jest.mock('next/config', () => () => ({
    publicRuntimeConfig: {
        backendUrl: '',
    },
}))

describe('comment reducer', () => {
    let store: EnhancedStore<{ comment: CommentState },
        AnyAction,
        [ThunkMiddleware<{ comment: CommentState }, AnyAction, undefined>]>

    beforeAll(() => {
        store = configureStore({ reducer: { comment: commentReducer } })
    })
    it('should handle initial state', () => {
        expect(commentReducer(undefined, { type: 'unknown' })).toEqual({
            postComments: [],
        })
    })

    it('should handle getComments', async () => {
        axiosConfig.get = jest.fn().mockResolvedValue({ data: [] })
        await store.dispatch(getComments(1))
        expect(store.getState().comment.postComments).toEqual([])
    })
})
