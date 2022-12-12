import { configureStore, EnhancedStore } from '@reduxjs/toolkit'
import { AnyAction } from 'redux'
import { ThunkMiddleware } from 'redux-thunk'

import { BoardPostDto } from '../../../infra/dto/BoardPostDto'
import { PostTypeDto } from '../../../infra/dto/PostTypeDto'
import { axiosConfig } from '../../../infra/global'
import { BoardPost, PostDisplayType } from '../../model/BoardPost'
import { PostType } from '../../model/PostType'
import { getClubPosts, postReducer, PostState } from '../post/PostSlice'

const fakeListItemPost1: BoardPost = { displayType: PostDisplayType.CLUB, id: 1, author: '',
    title: '', content: '', type: PostType.ANNOUNCEMENT }
const fakeBoardPost1: BoardPost = { displayType: PostDisplayType.CLUB, id: 1, title: '', content: '', type: PostType.ANNOUNCEMENT,
    eventName: { id: 1, name: '' }, closed: undefined, createdAt: '', excludedTags: undefined, includedTags: undefined, updatedAt: '',
    eventId: 1 }
const fakeBoardPost2: BoardPost = { displayType: PostDisplayType.CLUB, id: 2, title: '', content: '', type: PostType.ENROLLMENT,
    eventName: { id: 1, name: '' }, closed: true, createdAt: '', excludedTags: undefined, includedTags: undefined, updatedAt: '',
    eventId: 1 }
const fakeBoardPostDto1 :BoardPostDto = { id: 1, title: '', content: '', type: PostTypeDto.ANNOUNCEMENT,
    event: { id: 1, name: '' }, created_at: '', updated_at: '' }
const fakeBoardPostDto2 :BoardPostDto = { id: 2, title: '', content: '', type: PostTypeDto.ENROLLMENT, closed: true,
    event: { id: 1, name: '' }, created_at: '', updated_at: '' }

const fakePostState = {
    selectedPost: fakeBoardPostDto1,
    feedPosts: [],
    clubPosts: [fakeBoardPostDto1, fakeBoardPostDto2],
}
const fakePost: PostState = {
    selectedPost: fakeListItemPost1,
    feedPosts: [],
    clubPosts: [fakeBoardPost1, fakeBoardPost2],
}

jest.mock('next/config', () => () => ({
    publicRuntimeConfig: {
        backendUrl: '',
    },
}))

describe('post reducer', () => {
    let store: EnhancedStore<{ post: PostState },
        AnyAction,
        [ThunkMiddleware<{ post: PostState }, AnyAction, undefined>]>

    beforeAll(() => {
        store = configureStore({ reducer: { post: postReducer } })
    })
    it('should handle initial state', () => {
        expect(postReducer(undefined, { type: 'unknown' })).toEqual({
            feedPosts: [],
            clubPosts: [],
        })
    })
    it('should handle getClubPosts', async () => {
        axiosConfig.get = jest.fn().mockResolvedValue({ data: fakePostState.clubPosts } )
        await store.dispatch(getClubPosts(1))
        expect(store.getState().post.clubPosts).toEqual(fakePost.clubPosts)
    })

})
