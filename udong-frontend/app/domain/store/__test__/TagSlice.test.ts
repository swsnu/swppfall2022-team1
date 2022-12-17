import { configureStore, EnhancedStore } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { AnyAction } from 'redux'
import { ThunkMiddleware } from 'redux-thunk'

import { TagUserDto } from '../../../infra/dto/TagUserDto'
import { axiosConfig } from '../../../infra/global'
import { Tag } from '../../model/Tag'
import { createTag, deleteTag, editTag, getTag, getTags, tagReducer, TagState } from '../tag/TagSlice'
import { fakeUser1, fakeUser2, fakeUserDto1, fakeUserDto2 } from './UserSlice.test'

export const fakeTag1: Tag = { id: 1, name: 'tag1', users: [fakeUser1, fakeUser2], createdAt: '', updatedAt: '', isDefault: false }
export const fakeTagDto1: TagUserDto = {
    id: 1,
    name: 'tag1',
    users: [fakeUserDto1, fakeUserDto2],
    created_at: '',
    updated_at: '',
    is_default: false }
export const fakeClubTag1: Tag = { id: 1, name: 'tag1', createdAt: '', updatedAt: '', users: [fakeUser1, fakeUser2], isDefault: false }
export const fakeClubTagDto1: TagUserDto = {
    id: 1, name: 'tag1',
    created_at: '',
    updated_at: '',
    users: [fakeUserDto1, fakeUserDto2],
    is_default: false }
export const fakeClubTag2: Tag = { id: 2, name: 'tag2', createdAt: '', updatedAt: '', users: [fakeUser1, fakeUser2], isDefault: false }
export const fakeClubTagDto2: TagUserDto = {
    id: 2,
    name: 'tag2',
    created_at: '',
    updated_at: '',
    users: [fakeUserDto1, fakeUserDto2],
    is_default: false }

jest.mock('next/config', () => () => ({
    publicRuntimeConfig: {
        backendUrl: '',
    },
}))

const fakeTagDto = {
    selectedTag: fakeTagDto1,
    tags: [fakeClubTagDto1, fakeClubTagDto2],
}

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
            createPostTags: [],
            selectedUserIds: [],
            errors: {},
        })
    })
    it('should handle getTags', async () => {
        axiosConfig.get = jest.fn().mockResolvedValue({ data: fakeTagDto.tags })
        await store.dispatch(getTags(1))
        expect(store.getState().tag.tags).toEqual([])
    })
    it('should handle getTag', async () => {
        axiosConfig.get = jest.fn().mockResolvedValue({ data: fakeTagDto.selectedTag })
        await store.dispatch(getTag(1))
        expect(store.getState().tag.selectedTag).toEqual(fakeTag.selectedTag)
    })
    it('should handle createTag', async () => {
        axiosConfig.post = jest.fn().mockResolvedValue({ data: fakeTagDto.selectedTag })
        await store.dispatch(createTag({ clubId: 1, name: 'name', userIdList: [] }))
        expect(store.getState().tag.selectedTag).toEqual(fakeTag.selectedTag)
    })
    it('should handle editTag', async () => {
        axiosConfig.put = jest.fn().mockResolvedValue({ data: fakeTagDto.selectedTag })
        await store.dispatch(editTag({ tagId: 1, tag: { name: '', newUsers: [] } }))
        expect(store.getState().tag.selectedTag).toEqual(fakeTag.selectedTag)
    })
    it('should handle deleteTag failed', async () => {
        axiosConfig.delete = jest.fn().mockRejectedValue(new AxiosError())
        await store.dispatch(deleteTag(1))
        expect(store.getState().tag.errors.deleteTagError).toEqual({ errorCode: 400, message: '오류가 발생했습니다.' })
    })
    it('should handle deleteTag success', async () => {
        axiosConfig.delete = jest.fn().mockResolvedValue({} )
        await store.dispatch(deleteTag(1))
        expect(store.getState().tag.selectedTag).toEqual(undefined)
    })

})
