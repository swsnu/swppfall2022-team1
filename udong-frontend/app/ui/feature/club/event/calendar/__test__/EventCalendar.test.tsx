import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import { dummyEvents } from '../../EventContainer'
import { EventCalendar } from '../EventCalendar'

jest.mock('../../../../../components/UdongLoader', () => ({
    UdongLoader: () => <div data-testid={'udong-loader'}/>,
}))

describe('<EventCalendar/>', () => {
    it('render event calendar',  async () => {
        await act( async () => {render(<EventCalendar
            events={dummyEvents}
            onClickEvent={()=>jest.fn()}
        />)})
        const button = screen.getByText('Today')
        expect(button).toBeDefined()
    })
    it('move month', async () => {
        await act( async () => {render(<EventCalendar
            events={dummyEvents}
            onClickEvent={()=>jest.fn()}
        />)})

        const today = new Date()
        const moveButtons = screen.getAllByRole('button')
        await act( async () => {
            fireEvent.click(moveButtons[1])
        })
        await waitFor(() => expect(screen.getByText(`${today.getFullYear()}.${today.getMonth()}`)).toBeDefined())
        await act( async () => {
            fireEvent.click(moveButtons[0])
        })
        await waitFor(() => expect(screen.getByText(`${today.getFullYear()}.${today.getMonth() + 1}`)).toBeDefined())
        await act( async () => {
            fireEvent.click(moveButtons[2])
        })
        await waitFor(() => expect(screen.getByText(`${today.getFullYear()}.${today.getMonth() + 2}`)).toBeDefined())
    })
})
