import { BoardPost, PostDisplayType } from '../../domain/model/BoardPost'
import { Club } from '../../domain/model/Club'
import { ClubEvent } from '../../domain/model/ClubEvent'
import { ClubUser } from '../../domain/model/ClubUser'
import { CreatePost } from '../../domain/model/CreatePost'
import { ClubTag } from '../../domain/model/Tag'
import { Time } from '../../domain/model/Time'
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

    async function createClub(name: string): Promise<Club> {
        const response = await axiosConfig.post<ClubDto>(
            `/api/club/`,
            { name },
        )
        return clubTransformer.fromDto(response.data)
    }

    async function editClub(clubId: number, club: Club): Promise<Club> {
        const response = await axiosConfig.put<ClubDto>(
            `/api/club/${clubId}/`,
            clubTransformer.toEditDto(club),
        )
        return clubTransformer.fromDto(response.data)
    }

    async function deleteClub(clubId: number): Promise<void> {
        return axiosConfig.delete(`/api/club/${clubId}/`)
    }

    async function getClubMembers(clubId: number): Promise<Array<ClubUser>> {
        const response = await axiosConfig.get<Array<ClubUserDto>>(`/api/club/${clubId}/user/`)
        return response.data.map(clubUserTransformer.fromDto)
    }

    async function getMyClubProfile(clubId: number): Promise<ClubUser> {
        const response = await axiosConfig.get<ClubUserDto>(`/api/club/${clubId}/user/me/`)
        return clubUserTransformer.fromDto(response.data)
    }

    function removeClubMember() { return }
    async function changeClubMemberRole(clubId: number, userId: number): Promise<ClubUser> {
        const response = await axiosConfig.put<ClubUserDto>(`/api/club/${clubId}/user/${userId}/role/`)
        return clubUserTransformer.fromDto(response.data)
    }

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

    async function createClubEvent(clubId: number, name: string, times: Array<Time>) {
        const response = await axiosConfig.post<ClubEventDto>(`/api/club/${clubId}/event/`, { name: name, new_time: times })
        return clubEventTransformer.fromDto(response.data)
    }

    async function getClubTags(clubId: number): Promise<Array<ClubTag>> {
        const response = await axiosConfig.get<Array<ClubTagDto>>(`/api/club/${clubId}/tag/`)
        return response.data.map(clubTagTransformer.fromDto)
    }

    function createClubTag(clubId: number, tagName: string, userIds: number[]): Promise<void> {
        return axiosConfig.post(`/api/club/${clubId}/tag/`, { name: tagName, user_list: userIds })
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
        changeClubMemberRole,
        getClubPosts,
        createClubPost,
        getClubEvents,
        createClubEvent,
        getClubTags,
        createClubTag,
    })
})()
