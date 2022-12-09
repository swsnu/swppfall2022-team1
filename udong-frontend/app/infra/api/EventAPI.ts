import { ClubEvent } from '../../domain/model/ClubEvent'
import { axiosConfig } from '../global'

export const EventAPI = (() => {
    function getEvent() { return }

    function editEvent(eventId: number, content: Partial<ClubEvent>): Promise<void> {
        return axiosConfig.put(`/api/event/${eventId}/`, content)
    }

    function deleteEvent() { return }

    return Object.freeze({
        getEvent,
        editEvent,
        deleteEvent,
    })
})()
