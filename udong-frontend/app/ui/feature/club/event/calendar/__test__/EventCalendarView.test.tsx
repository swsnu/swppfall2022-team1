import { fireEvent, render, screen } from '@testing-library/react'
import * as router from 'next/router'
import { NextRouter } from 'next/router'

import { dummyEvents } from '../../EventContainer'
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

jest.mock('next/config', () => () => ({
    publicRuntimeConfig: {
        backendUrl: '',
    },
}))

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
