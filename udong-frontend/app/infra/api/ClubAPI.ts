import { BoardPost, PostDisplayType } from '../../domain/model/BoardPost'
import { Club } from '../../domain/model/Club'
import { ClubEvent } from '../../domain/model/ClubEvent'
import { ClubUser } from '../../domain/model/ClubUser'
import { CreatePost } from '../../domain/model/CreatePost'
import { ClubTag } from '../../domain/model/Tag'
import { BoardPostDto } from '../dto/BoardPostDto'
import { ClubDto } from '../dto/ClubDto'
import { ClubEventDto } from '../dto/ClubEventDto'
import { ClubTagDto } from '../dto/ClubTagDto'
import { ClubUserDto } from '../dto/ClubUserDto'
import { axiosConfig } from '../global'
import { boardPostTransformer } from '../transformer/BoardPostTransformer'
import { clubEventTransformer } from '../transformer/ClubEventTransformer'
import { clubTagTransformer } from '../transformer/ClubTagTransformer'
import { clubTransformer } from '../transformer/ClubTransformer'
import { clubUserTransformer } from '../transformer/ClubUserTransformer'
import { createPostTransformer } from '../transformer/CreatePostTransformer'

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

    async function getClubPosts(clubId: number): Promise<Array<BoardPost>> {
        const response = await axiosConfig.get<Array<BoardPostDto>>(`/api/club/${clubId}/post/`)
        return response.data.map(dto => boardPostTransformer.fromDto(dto, PostDisplayType.CLUB))
    }

    async function createClubPost(clubId: number, post: CreatePost): Promise<BoardPost> {
        const postDto = await createPostTransformer.toDto(post)
        const response = await axiosConfig.post<BoardPostDto>(
            `/api/club/${clubId}/post/`,
            postDto,
        )
        return boardPostTransformer.fromDto(response.data, PostDisplayType.CLUB)
    }

    async function getClubEvents(clubId: number): Promise<Array<ClubEvent>> {
        const response = await axiosConfig.get<Array<ClubEventDto>>(`/api/club/${clubId}/event/`)
        return response.data.map(clubEventTransformer.fromDto)
    }

    function createClubEvent() { return }

    async function getClubTags(clubId: number): Promise<Array<ClubTag>> {
        const response = await axiosConfig.get<Array<ClubTagDto>>(`/api/club/${clubId}/tag/`)
        return response.data.map(clubTagTransformer.fromDto)
    }

    function createClubTag(clubId: number, tagName: string, userIds: number[]): Promise<void> {
        return axiosConfig.post(`/api/club/${clubId}/tag/`, { name: tagName, users: userIds })
    }

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
        getClubPosts,
        createClubPost,
        getClubEvents,
        createClubEvent,
        getClubTags,
        createClubTag,
    })
})()
