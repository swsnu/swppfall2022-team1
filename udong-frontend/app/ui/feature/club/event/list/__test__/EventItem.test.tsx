import { fireEvent, render, screen } from '@testing-library/react'

import { EventType } from '../../EventContainer'
import { EventItem } from '../EventItem'

const dummyEvent: EventType =  {
    id: '1',
    title: 'title',
    created_at: new Date('2021-01-23T22:23:22'),
    updated_at: new Date('2022-12-02T12:11:02'),
    times: [{
        start: new Date('2023-12-01T10:00:00'),
        end: new Date('2023-11-04T11:00:00'),
    }],
}

describe('<EventItem/>', () => {
    beforeEach(()=>jest.clearAllMocks())
    it('render',  () => {
        render(<EventItem
            event={dummyEvent}
            onClickEvent={()=>{return}}
        />)
        const eventTitle = screen.getByText('title')
        expect(eventTitle).toBeDefined()
    })
    it('push when click list', () => {
        const mockOnClick = jest.fn()
        render(<EventItem
            event={dummyEvent}
            onClickEvent={mockOnClick}
        />)
        const eventTitle = screen.getByText('title')
        fireEvent.click(eventTitle)
        expect(mockOnClick).toHaveBeenCalledWith('1')
    })
})
