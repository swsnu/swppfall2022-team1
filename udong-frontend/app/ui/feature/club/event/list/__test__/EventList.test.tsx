import { fireEvent, render, screen } from '@testing-library/react'

import { dummyEvents } from '../../EventContainer'
import { EventList } from '../EventList'

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
