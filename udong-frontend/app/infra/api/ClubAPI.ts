import axios from 'axios'

import { Club } from '../../domain/model/Club'
import { ClubDto } from '../dto/ClubDto'
import { clubTransformer } from '../transformer/ClubTransformer'

export const ClubAPI = (() => {
    async function getClubs(): Promise<Array<Club>> {
        const response = await axios.get<Array<ClubDto>>(`/api/club/`)
        return response.data.map(clubTransformer.fromDto)
    }

    function getClub() { return }
    function createClub() { return } // /club (POST)
    function editClub() { return }
    function deleteClub() { return }

    function getClubMembers() { return }
    function removeClubMember() { return }
    function assignClubMemberRole() { return }

    function getClubEvents() { return }
    function createClubEvent() { return }

    function getClubTags() { return }
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
