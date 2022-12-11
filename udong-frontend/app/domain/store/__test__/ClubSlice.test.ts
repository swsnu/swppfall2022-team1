import { configureStore, EnhancedStore } from '@reduxjs/toolkit'
import { AnyAction } from 'redux'
import { ThunkMiddleware } from 'redux-thunk'

import { axiosConfig } from '../../../infra/global'
import { RoleType } from '../../model/RoleType'
import { clubReducer, ClubState, getClub, getClubMembers, getMyClubs } from '../club/ClubSlice'
import { fakeUser1, fakeUser2, fakeUserDto1, fakeUserDto2 } from './UserSlice.test'

export const fakeClub1 = { id: 1, name: '단풍', code: '1234' }
export const fakeClub2 = { id: 2, name: '은행', code: '4321' }

jest.mock('next/config', () => () => ({
    publicRuntimeConfig: {
        backendUrl: '',
    },
}))

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
    errors: {},
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
    errors: {},
}

describe('club reducer', () => {
    let store: EnhancedStore<{ club: ClubState },
        AnyAction,
        [ThunkMiddleware<{ club: ClubState }, AnyAction, undefined>]>

    beforeAll(() => {
        store = configureStore({ reducer: { club: clubReducer } })
    })
    it('should handle initial state', () => {
        expect(clubReducer(undefined, { type: 'unknown' })).toEqual({
            myClubs: [],
            members: [],
            errors: {},
        })
    })
    it('should handle getMyClubs', async () => {
        axiosConfig.get = jest.fn().mockResolvedValue({ data: fakeClubDto.myClubs })
        await store.dispatch(getMyClubs())
        expect(store.getState().club.myClubs).toEqual(fakeClub.myClubs)
    })
    it('should handle getClub', async () => {
        axiosConfig.get = jest.fn().mockResolvedValue({ data: fakeClubDto.myClubs[0] })
        await store.dispatch(getClub(1))
        expect(store.getState().club.selectedClub).toEqual(fakeClub.myClubs[0])
    })
    it('should handle getClubMembers', async () => {
        axiosConfig.get = jest.fn().mockResolvedValue({ data: fakeClubDto.members })
        await store.dispatch(getClubMembers(1))
        expect(store.getState().club.members).toEqual(fakeClub.members)
    })
})
