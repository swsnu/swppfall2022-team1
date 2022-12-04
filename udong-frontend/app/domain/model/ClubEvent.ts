import { Time } from './Time'

interface Club {
    id: number
    name: string
    times?: Array<Time>
    createdAt: string
    updatedAt: string
}

export type ClubEvent = Club

export type EventName = Pick<Club, 'id' | 'name'>
