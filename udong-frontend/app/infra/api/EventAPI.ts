import { Time } from '../../domain/model/Time'
import { axiosConfig } from '../global'
import { clubEventTransformer } from '../transformer/ClubEventTransformer'

export const EventAPI = (() => {
    async function getEvent(eventId: string) {
        const response = await axiosConfig.get(`/api/event/${eventId}/`)
        return clubEventTransformer.fromDto(response.data)
    }

    function editEvent(eventId: number, name: string | null, time: Time[] | null): Promise<void> {
        return axiosConfig.put(`/api/event/${eventId}/`, clubEventTransformer.toEditDto(name, time))
    }

    function deleteEvent() { return }

    return Object.freeze({
        getEvent,
        editEvent,
        deleteEvent,
    })
})()
