import { fireEvent, render, screen } from '@testing-library/react'

import { UnsettledEventList } from '../UnsettledEventList'
import { dummyEvents } from './EventCalendar.test'

jest.mock('next/config', () => () => ({
    publicRuntimeConfig: {
        backendUrl: '',
    },
}))

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
