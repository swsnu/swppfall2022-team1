import { configureStore, EnhancedStore } from '@reduxjs/toolkit'
import axios from 'axios'
import { AnyAction } from 'redux'
import { ThunkMiddleware } from 'redux-thunk'

import { RoleType } from '../../model/RoleType'
import { clubReducer, ClubState, getClub, getClubMembers, getMyClubs } from '../club/ClubSlice'

export const fakeClub1 = { id: 1, name: '단풍', code: '1234' }
export const fakeClub2 = { id: 2, name: '은행', code: '4321' }
export const fakeUserDto1 = { id: 1, google: 'user@gmail.com', image: 'userImage', time_table: 'userTable', name: 'user',
    created_at: '', updated_at: '' }
export const fakeUserDto2 = { id: 2, google: 'user2@gmail.com', image: 'user2Image', time_table: 'user2Table', name: 'user2',
    created_at: '', updated_at: '' }
export const fakeUser1 = { id: 1, gmail: 'user@gmail.com', imageUrl: 'userImage', timeTable: 'userTable', name: 'user' }
export const fakeUser2 = { id: 2, gmail: 'user2@gmail.com', imageUrl: 'user2Image', timeTable: 'user2Table', name: 'user2' }

describe('club reducer', () => {
    let store: EnhancedStore<{ club: ClubState },
        AnyAction,
        [ThunkMiddleware<{ club: ClubState }, AnyAction, undefined>]>

    const fakeClubDto = {
        selectedClub: fakeClub1,
        myClubs: [fakeClub1, fakeClub2],
        members: [{
            user: fakeUserDto1,
            auth: RoleType.ADMIN,
        },
        {
            user: fakeUserDto2,
            auth: RoleType.MEMBER,
        }],
    }
    const fakeClub: ClubState = {
        selectedClub: fakeClub1,
        myClubs: [fakeClub1, fakeClub2],
        members: [{
            user: fakeUser1,
            role: RoleType.ADMIN,
        },
        {
            user: fakeUser2,
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
