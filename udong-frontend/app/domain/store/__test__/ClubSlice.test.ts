import { configureStore, EnhancedStore } from '@reduxjs/toolkit'
import axios from 'axios'
import { AnyAction } from 'redux'
import { ThunkMiddleware } from 'redux-thunk'

import { RoleType } from '../../model/RoleType'
import { clubReducer, ClubState, getClub, getClubMembers, getMyClubs } from '../club/ClubSlice'

describe('club reducer', () => {
    let store: EnhancedStore<{ club: ClubState },
        AnyAction,
        [ThunkMiddleware<{ club: ClubState }, AnyAction, undefined>]>
    const fakeClubDto = {
        selectedClub: { id: 1, name: '단풍', code: '1234' },
        myClubs: [{ id: 1, name: '단풍', code: '1234' }, { id: 2, name: '계란', code: '4321' }],
        members: [{
            user: { id: 1, google: 'user@gmail.com', image: 'userImage', time_table: 'userTable', name: 'user',
                created_at: '', updated_at: '' },
            auth: RoleType.ADMIN,
        },
        {
            user: { id: 2, google: 'user2@gmail.com', image: 'user2Image', time_table: 'user2Table', name: 'user2',
                created_at: '', updated_at: '' },
            auth: RoleType.MEMBER,
        }],
    }
    const fakeClub: ClubState = {
        selectedClub: { id: 1, name: '단풍', code: '1234' },
        myClubs: [{ id: 1, name: '단풍', code: '1234' }, { id: 2, name: '계란', code: '4321' }],
        members: [{
            user: { id: 1, gmail: 'user@gmail.com', imageUrl: 'userImage', timeTable: 'userTable', name: 'user' },
            role: RoleType.ADMIN,
        },
        {
            user: { id: 2, gmail: 'user2@gmail.com', imageUrl: 'user2Image', timeTable: 'user2Table', name: 'user2' },
            role: RoleType.MEMBER,
        }],
    }

    beforeAll(() => {
        store = configureStore({ reducer: { club: clubReducer } })
    })
    it('should handle initial state', () => {
        expect(clubReducer(undefined, { type: 'unknown' })).toEqual({
            myClubs: [],
            members: [],
        })
    })
    it('should handle getMyClubs', async () => {
        axios.get = jest.fn().mockResolvedValue({ data: fakeClubDto.myClubs })
        await store.dispatch(getMyClubs())
        expect(store.getState().club.myClubs).toEqual(fakeClub.myClubs)
    })
    it('should handle getClub', async () => {
        axios.get = jest.fn().mockResolvedValue({ data: fakeClubDto.myClubs[0] })
        await store.dispatch(getClub(1))
        expect(store.getState().club.selectedClub).toEqual(fakeClub.myClubs[0])
    })
    it('should handle getClubMembers', async () => {
        axios.get = jest.fn().mockResolvedValue({ data: fakeClubDto.members })
        await store.dispatch(getClubMembers(1))
        expect(store.getState().club.members).toEqual(fakeClub.members)
    })
})
