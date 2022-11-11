import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import { EventType } from '../../EventContainer'
import { EventCalendar } from '../EventCalendar'

jest.mock('../../../../../components/UdongButton', () => ({
    UdongButton: ({ onClick }: { onClick: () => void }) => <button
        data-testid={'udong-button'}
        onClick={onClick}
    />,
}))

jest.mock('../../../../../components/UdongLoader', () => ({
    UdongLoader: () => <div data-testid={'udong-loader'}/>,
}))

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

describe('<EventCalendar/>', () => {
    it('render event calendar',  async () => {
        await act( async () => {render(<EventCalendar
            events={dummyEvents}
            onClickEvent={()=>jest.fn()}
        />)})
        const button = screen.getAllByTestId('udong-button')
        expect(button).toBeDefined()
    })
    it('move month', async () => {
        await act( async () => {render(<EventCalendar
            events={dummyEvents}
            onClickEvent={()=>jest.fn()}
        />)})

        const today = new Date()
        const moveButtons = screen.getAllByTestId('udong-button')
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
