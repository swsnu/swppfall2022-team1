import { Time } from './Time'

export interface ClubEvent {
    id: number
    name: string
    times: Array<Time>
    createdAt: string
    updatedAt: string
}

export type EventName = Pick<ClubEvent, 'id' | 'name'>
