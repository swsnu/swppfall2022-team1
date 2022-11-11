import { fireEvent, render, screen } from '@testing-library/react'

import { EventType } from '../../EventContainer'
import { EventList } from '../EventList'

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

jest.mock('../EventItem', () => ({
    EventItem: ({ onClickEvent }: { onClickEvent: (id: string) => void }) => <div
        data-testid={'event-item'}
        onClick={() => onClickEvent('1')}
    />,
}))

describe('<EventList/>', () => {
    beforeEach(()=>jest.clearAllMocks())
    it('render',  () => {
        render(<EventList
            events={dummyEvents}
            onClickEvent={()=>{return}}
        />)
        const eventList = screen.getAllByTestId('event-item')
        expect(eventList).toBeDefined()
    })
    it('push when click list', () => {
        const mockOnClick = jest.fn()
        render(<EventList
            events={dummyEvents}
            onClickEvent={mockOnClick}
        />)
        const eventItems = screen.getAllByTestId('event-item')
        fireEvent.click(eventItems[0])
        expect(mockOnClick).toHaveBeenCalledWith('1')
    })
})
