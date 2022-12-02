import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import { dummyEvents } from '../../EventContainer'
import { EventCalendar } from '../EventCalendar'

jest.mock('../../../../../components/UdongLoader', () => ({
    UdongLoader: () => <div data-testid={'udong-loader'}/>,
}))

jest.mock('next/config', () => () => ({
    publicRuntimeConfig: {
        backendUrl: '',
    },
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
        // click previous month (-1)
        await act( async () => {
            fireEvent.click(moveButtons[1])
        })
        if (today.getMonth() === 0){
            await waitFor(() => expect(screen.getByText(`${today.getFullYear() - 1}.12`)).toBeDefined())
        } else {
            await waitFor(() => expect(screen.getByText(`${today.getFullYear()}.${today.getMonth()}`)).toBeDefined())
        }
        //click next month (-1 + 1 = 0)
        await act( async () => {
            fireEvent.click(moveButtons[0])
        })
        await waitFor(() => expect(screen.getByText(`${today.getFullYear()}.${today.getMonth() + 1}`)).toBeDefined())
        await act( async () => {
            fireEvent.click(moveButtons[2])
        })
        //click next month again (-1 + 1 + 1 = 1)
        if (today.getMonth() === 11){
            await waitFor(() => expect(screen.getByText(`${today.getFullYear() + 1}.1`)).toBeDefined())
        } else {
            await waitFor(() => expect(screen.getByText(`${today.getFullYear()}.${today.getMonth() + 2}`)).toBeDefined())
        }
    })
})
