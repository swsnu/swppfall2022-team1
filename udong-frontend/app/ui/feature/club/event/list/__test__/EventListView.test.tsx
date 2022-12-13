import { fireEvent, render, screen } from '@testing-library/react'
import * as router from 'next/router'
import { NextRouter } from 'next/router'

import { dummyEvents } from '../../calendar/__test__/EventCalendar.test'
import { EventListView } from '../EventListView'

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
