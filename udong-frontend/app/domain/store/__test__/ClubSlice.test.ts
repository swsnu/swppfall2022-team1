import { configureStore, EnhancedStore } from '@reduxjs/toolkit'
import { AxiosError, AxiosResponse } from 'axios'
import { AnyAction } from 'redux'
import { ThunkMiddleware } from 'redux-thunk'

import { axiosConfig } from '../../../infra/global'
import { RoleType } from '../../model/RoleType'
import {
    changeMemberRole,
    clubReducer,
    ClubState,
    createClub,
    createClubTag,
    deleteClub,
    editClub,
    getClub,
    getClubMembers,
    getMyClubs,
    leaveClub,
    refreshClubCode,
    registerClub,
    removeClubMember,
} from '../club/ClubSlice'
import { fakeTagDto1 } from './TagSlice.test'
import { fakeUser1, fakeUser2, fakeUserDto1, fakeUserDto2 } from './UserSlice.test'

export const fakeClub1 = { id: 1, name: '단풍', code: '1234', image: '', createdAt: '', updatedAt: '' }
export const fakeClubDto1 = { id: 1, name: '단풍', code: '1234', image: '', created_at: '', updated_at: '' }
export const fakeClub2 = { id: 2, name: '은행', code: '4321', image: '', createdAt: '', updatedAt: '' }
export const fakeClubDto2 = { id: 2, name: '은행', code: '4321', image: '', created_at: '', updated_at: '' }

jest.mock('next/config', () => () => ({
    publicRuntimeConfig: {
        backendUrl: '',
    },
}))

const fakeClubDto = {
    selectedClub: fakeClubDto1,
    myClubs: [fakeClubDto1, fakeClubDto2],
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

const fakeClub = {
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

    beforeEach(() => {
        jest.clearAllMocks()
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
    it('should handle registerClub fail with 400', async () => {
        axiosConfig.post = jest.fn().mockRejectedValue(new AxiosError('', '', {}, {}, ({ data: '', status: 400 } as AxiosResponse)))
        await store.dispatch(registerClub(''))
        expect(store.getState().club.errors.registerError).toEqual({ errorCode: 400, message: '이미 가입된 동아리입니다.' })
    })
    it('should handle registerClub fail with 404', async () => {
        axiosConfig.post = jest.fn().mockRejectedValue(new AxiosError('', '', {}, {}, ({ data: '', status: 404 } as AxiosResponse)))
        await store.dispatch(registerClub(''))
        expect(store.getState().club.errors.registerError).toEqual({ errorCode: 404, message: '유효하지 않은 코드입니다.' })
    })
    it('should handle registerClub success', async () => {
        axiosConfig.post = jest.fn().mockResolvedValue({ data: fakeClubDto.selectedClub })
        await store.dispatch(registerClub(''))
        expect(store.getState().club.selectedClub).toEqual(fakeClub.selectedClub)
    })
    it('should handle createClub', async () => {
        axiosConfig.post = jest.fn().mockResolvedValue({ data: fakeClubDto.selectedClub })
        await store.dispatch(createClub(''))
        expect(store.getState().club.selectedClub).toEqual(fakeClub.selectedClub)
    })
    it('should handle editClub fail', async () => {
        axiosConfig.put = jest.fn().mockRejectedValue(new AxiosError('', '', {}, {}, ({ data: '', status: 400 } as AxiosResponse)))
        axiosConfig.delete = jest.fn().mockRejectedValue(Promise.reject({ response: { status: 400 } }))
        await store.dispatch(editClub({ clubId: 1, club: fakeClub.selectedClub }))
        expect(store.getState().club.errors.editError).toEqual({ errorCode: 400, message: '모든 필드를 알맞게 입력해주세요.' })
    })
    it('should handle editClub success', async () => {
        axiosConfig.put = jest.fn().mockResolvedValue({ data: fakeClubDto.selectedClub })
        await store.dispatch(editClub({ clubId: 1, club: fakeClub.selectedClub }))
        expect(store.getState().club.selectedClub).toEqual(fakeClub.selectedClub)
    })
    it('should handle leaveClub fail with 403', async () => {
        axiosConfig.delete = jest.fn().mockRejectedValue(new AxiosError('', '', {}, {}, ({ data: '', status: 403 } as AxiosResponse)))
        await store.dispatch(leaveClub(1))
        expect(store.getState().club.errors.leaveClubError).toEqual({ errorCode: 403, message: '유일한 관리자는 동아리를 탈퇴할 수 없습니다.' })
    })
    it('should handle leaveClub fail with 404', async () => {
        axiosConfig.delete = jest.fn().mockRejectedValue(new AxiosError('', '', {}, {}, ({ data: '', status: 404 } as AxiosResponse)))
        await store.dispatch(leaveClub(1))
        expect(store.getState().club.errors.leaveClubError).toEqual({ errorCode: 404, message: '동아리에 가입되지 않았습니다.' })
    })
    it('should handle leaveClub success', async () => {
        axiosConfig.delete = jest.fn().mockResolvedValue({ data: fakeClubDto.members })
        await store.dispatch(leaveClub(1))
        expect(store.getState().club.selectedClub).toEqual(undefined)
    })
    it('should handle deleteClub fail', async () => {
        axiosConfig.delete = jest.fn().mockRejectedValue(new AxiosError('', '', {}, {}, ({ data: '', status: 400 } as AxiosResponse)))
        await store.dispatch(deleteClub(1))
        expect(store.getState().club.errors.deleteError).toEqual({ errorCode: 400, message: '오류가 발생했습니다.' })
    })
    it('should handle deleteClub success', async () => {
        axiosConfig.delete = jest.fn().mockResolvedValue({})
        await store.dispatch(deleteClub(1))
        expect(store.getState().club.selectedClub).toEqual(undefined)
    })
    it('should handle getClubMembers', async () => {
        axiosConfig.get = jest.fn().mockResolvedValue({ data: fakeClubDto.members })
        await store.dispatch(getClubMembers(1))
        expect(store.getState().club.members).toEqual(fakeClub.members)
    })
    it('should handle remove club member fail with 404', async () => {
        axiosConfig.delete = jest.fn().mockRejectedValue(new AxiosError('', '', {}, {}, ({ data: '', status: 404 } as AxiosResponse)))
        await store.dispatch(removeClubMember({ clubId: 1, userId: 1 }))
        expect(store.getState().club.errors.removeMemberError).toEqual({ errorCode: 404, message: '존재하지 않는 동아리입니다.' })
    })
    it('should handle remove club member fail with 400', async () => {
        axiosConfig.delete = jest.fn().mockRejectedValue(new AxiosError('', '', {}, {}, ({ data: '', status: 400 } as AxiosResponse)))
        await store.dispatch(removeClubMember({ clubId: 1, userId: 1 }))
        expect(store.getState().club.errors.removeMemberError).toEqual({ errorCode: 400, message: '관리자인 멤버는 내보낼 수 없습니다.' })
    })
    it('should handle remove club member success', async () => {
        axiosConfig.delete = jest.fn().mockResolvedValue({})
        await store.dispatch(removeClubMember({ clubId: 1, userId: 1 }))
        expect(store.getState().club.selectedMember).toEqual(undefined)
    })
    it('should handle change member role fail with 404', async () => {
        axiosConfig.put = jest.fn().mockRejectedValue(new AxiosError('', '', {}, {}, ({ data: '', status: 404 } as AxiosResponse)))
        await store.dispatch(changeMemberRole({ clubId: 1, userId: 1 }))
        expect(store.getState().club.errors.changeMemberRoleError).toEqual({ errorCode: 404, message: '존재하지 않는 동아리입니다.' })
    })
    it('should handle remove club member fail with 400', async () => {
        axiosConfig.put = jest.fn().mockRejectedValue(new AxiosError('', '', {}, {}, ({ data: '', status: 400 } as AxiosResponse)))
        await store.dispatch(changeMemberRole({ clubId: 1, userId: 1 }))
        expect(store.getState().club.errors.changeMemberRoleError).toEqual({ errorCode: 400, message: '유일한 관리자는 일반 멤버로 전환할 수 없습니다.' })
    })
    it('should handle remove club member success', async () => {
        axiosConfig.put = jest.fn().mockResolvedValue({})
        await store.dispatch(changeMemberRole({ clubId: 1, userId: 1 }))
        expect(store.getState().club.selectedMember).toEqual(undefined)
    })
    it('should handle create club tag', async () => {
        axiosConfig.post = jest.fn().mockResolvedValue(fakeTagDto1)
        await store.dispatch(createClubTag({ clubId: 1, tagName: '', userIds: [] }))
        expect(store.getState().club.selectedClub).toEqual(undefined)
    })
    it('should handle refresh club code', async () => {
        axiosConfig.delete = jest.fn().mockResolvedValue('7777')
        await store.dispatch(refreshClubCode(1))
        expect(store.getState().club.selectedClub).toEqual(undefined)
    })

})
