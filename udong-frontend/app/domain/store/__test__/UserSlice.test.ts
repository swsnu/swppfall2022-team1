import { configureStore, EnhancedStore } from '@reduxjs/toolkit'
import { AnyAction } from 'redux'
import { ThunkMiddleware } from 'redux-thunk'

import { axiosConfig } from '../../../infra/global'
import { new2dArray } from '../../../utility/functions'
import { getUser, userReducer, UserState } from '../user/UserSlice'

export const fakeUserDto1 = { id: 1, email: 'user@gmail.com', image: 'userImage', time_table: '0'.repeat(48 * 7), name: 'user',
    created_at: '', updated_at: '' }
export const fakeUserDto2 = { id: 2, email: 'user2@gmail.com', image: 'user2Image', time_table: '0'.repeat(48 * 7), name: 'user2',
    created_at: '', updated_at: '' }
export const fakeUser1 = { id: 1, email: 'user@gmail.com', imageUrl: 'userImage', timeTable: new2dArray(7, 48, false), name: 'user' }
export const fakeUser2 = { id: 2, email: 'user2@gmail.com', imageUrl: 'user2Image', timeTable: new2dArray(7, 48, false), name: 'user2' }

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
            isAdmin: false,
            errors: {},
        })
    })
    it('should handle getUser', async () => {
        axiosConfig.get = jest.fn().mockResolvedValue({ data: fakeUserDto1 })
        await store.dispatch(getUser(1))
        expect(store.getState().user.selectedUser).toEqual(fakeUser1)
    })
})
