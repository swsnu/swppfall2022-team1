import { Time } from '../../domain/model/Time'
import { axiosConfig } from '../global'
import { clubEventTransformer } from '../transformer/ClubEventTransformer'

export const EventAPI = (() => {
    function getEvent() { return }

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
