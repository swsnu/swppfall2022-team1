import { fireEvent, render, screen } from '@testing-library/react'
import * as router from 'next/router'
import { NextRouter } from 'next/router'

import { EventType } from '../../EventContainer'
import { EventCalendarView } from '../EventCalendarView'

jest.mock('../EventCalendar', () => ({
    EventCalendar: ({ onClickEvent }: { onClickEvent: (id: string) => void }) => <div
        data-testid={'event-calendar'}
        onClick={() => onClickEvent('1')}
    />,
}))

jest.mock('../UnsettledEventList', () => ({
    UnsettledEventList: () => <div data-testid={'unsettled-event-list'}/>,
}))

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

describe('<EventCalendarView/>', () => {
    it('render event calendar view',  () => {
        jest.spyOn(router, 'useRouter').mockImplementation(() => ({
            query: { clubId: 1 },
        } as unknown as NextRouter))
        render(<EventCalendarView events={dummyEvents}/>)
        const eventCalendar = screen.getAllByTestId('event-calendar')
        const unsettledEventList = screen.getAllByTestId('unsettled-event-list')
        expect(eventCalendar).toBeDefined()
        expect(unsettledEventList).toBeDefined()
    })
    it('push to event detail', () => {
        const mockPush = jest.fn()
        jest.spyOn(router, 'useRouter').mockImplementation(() => ({
            query: { clubId: 1 },
            push: (url: string) => mockPush(url),
        } as unknown as NextRouter))
        render(<EventCalendarView events={dummyEvents}/>)
        const eventCalendar = screen.getAllByTestId('event-calendar')
        fireEvent.click(eventCalendar[0])
        expect(mockPush).toHaveBeenCalledWith('/club/1/event/1')
    })
})
