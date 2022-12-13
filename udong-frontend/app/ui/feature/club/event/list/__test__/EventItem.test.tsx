import { fireEvent, render, screen } from '@testing-library/react'

import { ClubEvent } from '../../../../../../domain/model/ClubEvent'
import { EventItem } from '../EventItem'

export const dummyEvent: ClubEvent =  {
    id: 1,
    name: 'title',
    createdAt: '',
    updatedAt: '',
    times: [],
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
        expect(mockOnClick).toHaveBeenCalledWith(1)
    })
})
