import axios from 'axios'

import { Club } from '../../domain/model/Club'
import { ClubEvent } from '../../domain/model/ClubEvent'
import { ClubTag } from '../../domain/model/Tag'
import { ClubDto } from '../dto/ClubDto'
import { ClubEventDto } from '../dto/ClubEventDto'
import { ClubTagDto } from '../dto/ClubTagDto'
import { clubEventTransformer } from '../transformer/ClubEventTransformer'
import { clubTagTransformer } from '../transformer/ClubTagTransformer'
import { clubTransformer } from '../transformer/ClubTransformer'

export const ClubAPI = (() => {
    async function getClubs(): Promise<Array<Club>> {
        const response = await axios.get<Array<ClubDto>>(`/api/club/`)
        return response.data.map(clubTransformer.fromDto)
    }

    async function getClub(clubId: number): Promise<Club> {
        const response = await axios.get<ClubDto>(`/api/club/${clubId}/`)
        return clubTransformer.fromDto(response.data)
    }

    function createClub() { return } // /club (POST)
    function editClub() { return }
    function deleteClub() { return }

    function getClubMembers() { return }
    function removeClubMember() { return }
    function assignClubMemberRole() { return }

    async function getClubEvents(clubId: number): Promise<Array<ClubEvent>> {
        const response = await axios.get<Array<ClubEventDto>>(`/api/club/${clubId}/event/`)
        return response.data.map(clubEventTransformer.fromDto)
    }

    function createClubEvent() { return }

    async function getClubTags(clubId: number): Promise<Array<ClubTag>> {
        const response = await axios.get<Array<ClubTagDto>>(`/api/club/${clubId}/tag/`)
        return response.data.map(clubTagTransformer.fromDto)
    }
    function createClubTag() { return }

    return Object.freeze({
        getClubs,
        getClub,
        createClub,
        editClub,
        deleteClub,
        getClubMembers,
        removeClubMember,
        assignClubMemberRole,
        getClubEvents,
        createClubEvent,
        getClubTags,
        createClubTag,
    })
})()
