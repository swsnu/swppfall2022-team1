import { Club } from '../../domain/model/Club'
import { ClubEvent } from '../../domain/model/ClubEvent'
import { ClubUser } from '../../domain/model/ClubUser'
import { ClubTag } from '../../domain/model/Tag'
import { ClubDto } from '../dto/ClubDto'
import { ClubEventDto } from '../dto/ClubEventDto'
import { ClubTagDto } from '../dto/ClubTagDto'
import { ClubUserDto } from '../dto/ClubUserDto'
import { axiosConfig } from '../global'
import { clubEventTransformer } from '../transformer/ClubEventTransformer'
import { clubTagTransformer } from '../transformer/ClubTagTransformer'
import { clubTransformer } from '../transformer/ClubTransformer'
import { clubUserTransformer } from '../transformer/ClubUserTransformer'

export const ClubAPI = (() => {
    async function getClubs(): Promise<Array<Club>> {
        const response = await axiosConfig.get<Array<ClubDto>>(`/api/club/`)
        return response.data.map(clubTransformer.fromDto)
    }

    async function getClub(clubId: number): Promise<Club> {
        const response = await axiosConfig.get<ClubDto>(`/api/club/${clubId}/`)
        return clubTransformer.fromDto(response.data)
    }

    async function registerClub(code: string): Promise<Club> {
        const response = await axiosConfig.post<ClubDto>(`/api/club/register/`, { code })
        return clubTransformer.fromDto(response.data)
    }

    function createClub() { return } // /club (POST)
    function editClub() { return }
    function deleteClub() { return }

    async function getClubMembers(clubId: number): Promise<Array<ClubUser>> {
        const response = await axiosConfig.get<Array<ClubUserDto>>(`/api/club/${clubId}/user/`)
        return response.data.map(clubUserTransformer.fromDto)
    }

    async function getMyClubProfile(clubId: number): Promise<ClubUser> {
        const response = await axiosConfig.get<ClubUserDto>(`/api/club/${clubId}/user/me/`)
        return clubUserTransformer.fromDto(response.data)
    }

    function removeClubMember() { return }
    function assignClubMemberRole() { return }

    async function getClubEvents(clubId: number): Promise<Array<ClubEvent>> {
        const response = await axiosConfig.get<Array<ClubEventDto>>(`/api/club/${clubId}/event/`)
        return response.data.map(clubEventTransformer.fromDto)
    }

    function createClubEvent() { return }

    async function getClubTags(clubId: number): Promise<Array<ClubTag>> {
        const response = await axiosConfig.get<Array<ClubTagDto>>(`/api/club/${clubId}/tag/`)
        return response.data.map(clubTagTransformer.fromDto)
    }
    function createClubTag() { return }

    return Object.freeze({
        getClubs,
        getClub,
        registerClub,
        createClub,
        editClub,
        deleteClub,
        getClubMembers,
        getMyClubProfile,
        removeClubMember,
        assignClubMemberRole,
        getClubEvents,
        createClubEvent,
        getClubTags,
        createClubTag,
    })
})()
