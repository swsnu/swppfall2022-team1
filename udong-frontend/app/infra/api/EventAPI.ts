import { PostDisplayType } from '../../domain/model/BoardPost'
import { Time } from '../../domain/model/Time'
import { BoardPostDto } from '../dto/BoardPostDto'
import { axiosConfig } from '../global'
import { boardPostTransformer } from '../transformer/BoardPostTransformer'
import { clubEventTransformer } from '../transformer/ClubEventTransformer'

export const EventAPI = (() => {
    async function getEvent(eventId: number) {
        const response = await axiosConfig.get(`/api/event/${eventId}/`)
        return clubEventTransformer.fromDto(response.data)
    }

    function editEvent(eventId: number, name: string | null, time: Time[] | null): Promise<void> {
        return axiosConfig.put(`/api/event/${eventId}/`, clubEventTransformer.toEditDto(name, time))
    }

    function deleteEvent() { return }

    async function getEventPosts(eventId: number) {
        const response = await axiosConfig.get<Array<BoardPostDto>>(`/api/event/${eventId}/post/`)
        return response.data.map(dto => boardPostTransformer.fromDto(dto, PostDisplayType.EVENT))
    }

    return Object.freeze({
        getEvent,
        editEvent,
        deleteEvent,
        getEventPosts,
    })
})()
