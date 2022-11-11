import { fireEvent, render, screen } from '@testing-library/react'
import * as router from 'next/router'
import { NextRouter } from 'next/router'

import { EventType } from '../../EventContainer'
import { EventListView } from '../EventListView'

const dummyEvents: EventType[] = [
    {
        id: '1',
        title: 'test event 1',
        created_at: new Date('2021-01-23T22:23:22'),
        updated_at: new Date('2021-08-12T12:11:02'),
        times: [{
            start: new Date('2021-11-01T10:00:00'),
            end: new Date('2021-11-03T11:00:00'),
        }],
    },
    {
        id: '2',
        title: 'test event 2',
        created_at: new Date('2022-03-22T22:23:22'),
        updated_at: new Date('2022-09-15T12:11:02'),
        times: [{
            start: new Date('2022-11-01T10:00:00'),
            end: new Date('2022-11-03T11:00:00'),
        }],
    }]

jest.mock('../EventList', () => ({
    EventList: ({ onClickEvent }: { onClickEvent: (id: string) => void }) => <div
        data-testid={'event-list'}
        onClick={() => onClickEvent('1')}
    />,
}))

describe('<EventListView/>', () => {
    beforeEach(()=>jest.clearAllMocks())
    it('render',  () => {
        jest.spyOn(router, 'useRouter').mockImplementation(() => ({
            query: { clubId: 1 },
        } as unknown as NextRouter))
        render(<EventListView events={dummyEvents}/>)
        const eventList = screen.getByTestId('event-list')
        expect(eventList).toBeDefined()
    })
    it('push when click list', () => {
        const mockPush = jest.fn()
        jest.spyOn(router, 'useRouter').mockImplementation(() => ({
            query: { clubId: 1 },
            push: (url: string) => mockPush(url),
        } as unknown as NextRouter))
        render(<EventListView events={dummyEvents}/>)
        const eventList = screen.getByTestId('event-list')
        fireEvent.click(eventList)
        expect(mockPush).toHaveBeenCalledWith('/club/1/event/1')
    })
})
