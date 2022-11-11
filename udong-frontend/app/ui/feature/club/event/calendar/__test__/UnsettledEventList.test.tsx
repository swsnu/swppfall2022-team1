import { fireEvent, render, screen } from '@testing-library/react'

import { EventType } from '../../EventContainer'
import { UnsettledEventList } from '../UnsettledEventList'

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

describe('<UnsettledEventList/>', () => {
    it('render unsettled event list',  () => {
        render(<UnsettledEventList
            events={dummyEvents}
            onClickEvent={()=>jest.fn()}
        />)
        const button = screen.getByText('행사 시간 미정')
        expect(button).toBeDefined()
    })
    it('trigger on click event',  () => {
        const mockOnClick = jest.fn()
        render(<UnsettledEventList
            events={dummyEvents}
            onClickEvent={mockOnClick}
        />)
        const buttons = screen.getAllByRole('button')
        fireEvent.click(buttons[0])
        expect(mockOnClick).toHaveBeenCalledTimes(1)
    })
})
