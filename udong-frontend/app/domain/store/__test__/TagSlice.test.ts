import { configureStore, EnhancedStore } from '@reduxjs/toolkit'
import { AnyAction } from 'redux'
import { ThunkMiddleware } from 'redux-thunk'

import { axiosConfig } from '../../../infra/global'
import { Tag } from '../../model/Tag'
import { getTags, tagReducer, TagState } from '../tag/TagSlice'
import { fakeUser1, fakeUser2 } from './UserSlice.test'

export const fakeTag1: Tag = { id: 1, name: 'tag1', users: [fakeUser1, fakeUser2], createdAt: '', updatedAt: '' }
export const fakeClubTag1: Tag = { id: 1, name: 'tag1', createdAt: '', updatedAt: '', users: [fakeUser1, fakeUser2] }
export const fakeClubTag2: Tag = { id: 2, name: 'tag2', createdAt: '', updatedAt: '', users: [fakeUser1, fakeUser2] }

jest.mock('next/config', () => () => ({
    publicRuntimeConfig: {
        backendUrl: '',
    },
}))

const fakeTagDto = {
    selectedTag: fakeTag1,
    tags: [fakeClubTag1, fakeClubTag2],
}

// eslint-disable-next-line
const fakeTag = {
    selectedTag: fakeTag1,
    tags: [fakeClubTag1, fakeClubTag2],
}

describe('tag reducer', () => {
    let store: EnhancedStore<{ tag: TagState },
        AnyAction,
        [ThunkMiddleware<{ tag: TagState }, AnyAction, undefined>]>

    beforeAll(() => {
        store = configureStore({ reducer: { tag: tagReducer } })
    })
    it('should handle initial state', () => {
        expect(tagReducer(undefined, { type: 'unknown' })).toEqual({
            tags: [],
        })
    })
    it('should handle getTags', async () => {
        axiosConfig.get = jest.fn().mockResolvedValue({ data: fakeTagDto.tags })
        await store.dispatch(getTags(1))
        expect(store.getState().tag.tags).toEqual([])
    })
})
