import { configureStore, EnhancedStore } from '@reduxjs/toolkit'
import { AnyAction } from 'redux'
import { ThunkMiddleware } from 'redux-thunk'

import { axiosConfig } from '../../../infra/global'
import { getUser, userReducer, UserState } from '../user/UserSlice'

export const fakeUserDto1 = { id: 1, google: 'user@gmail.com', image: 'userImage', time_table: 'userTable', name: 'user',
    created_at: '', updated_at: '' }
export const fakeUserDto2 = { id: 2, google: 'user2@gmail.com', image: 'user2Image', time_table: 'user2Table', name: 'user2',
    created_at: '', updated_at: '' }
export const fakeUser1 = { id: 1, email: 'user@gmail.com', imageUrl: 'userImage', timeTable: 'userTable', name: 'user' }
export const fakeUser2 = { id: 2, email: 'user2@gmail.com', imageUrl: 'user2Image', timeTable: 'user2Table', name: 'user2' }

jest.mock('next/config', () => () => ({
    publicRuntimeConfig: {
        backendUrl: '',
    },
}))

describe('user reducer', () => {
    let store: EnhancedStore<{ user: UserState },
        AnyAction,
        [ThunkMiddleware<{ user: UserState }, AnyAction, undefined>]>

    beforeAll(() => {
        store = configureStore({ reducer: { user: userReducer } })
    })
    it('should handle initial state', () => {
        expect(userReducer(undefined, { type: 'unknown' })).toEqual({
        })
    })
    it('should handle getUser', async () => {
        axiosConfig.get = jest.fn().mockResolvedValue({ data: fakeUserDto1 })
        await store.dispatch(getUser(1))
        expect(store.getState().user.selectedUser).toEqual(fakeUser1)
    })
})
