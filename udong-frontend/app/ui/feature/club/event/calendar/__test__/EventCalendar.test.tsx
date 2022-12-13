import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import { ClubEvent } from '../../../../../../domain/model/ClubEvent'
import { SchedulingPostType } from '../../../../../../domain/model/SchedulingPostType'
import { EventCalendar } from '../EventCalendar'

export const dummyEvents: ClubEvent[] = [{
    id: 1,
    name: 'event1',
    createdAt: '2021-01-23T22:23:22',
    updatedAt: '2022-08-12T12:11:02',
    times: [{
        type: SchedulingPostType.DATES,
        startDate: '2022-12-01',
        endDate: '2022-12-03',
        startTime: 4,
        endTime: 14,
    }],
}, {
    id: 2,
    name: 'event2',
    createdAt: '2021-01-23T22:23:22',
    updatedAt: '2022-08-12T12:11:02',
    times: [{
        type: SchedulingPostType.DAYS,
        repeatStart: '2022-11-01',
        repeatEnd: '2022-12-12',
        weekday: '1001011',
        startTime: 30,
        endTime: 40,
    }],
}, {
    id: 3,
    name: 'event3',
    createdAt: '2021-01-23',
    updatedAt: '2022-08-12',
    times: [{
        type: SchedulingPostType.DATES,
        startDate: '2022-12-11',
        endDate: '2022-12-13',
        startTime: 6,
        endTime: 20,
    }],
}, {
    id: 4,
    name: 'event4',
    createdAt: '2021-01-23T22:23:22',
    updatedAt: '2022-08-12T12:11:02',
    times: [],
}, {
    id: 5,
    name: 'event5',
    createdAt: '2021-01-23T22:23:22',
    updatedAt: '2022-08-12T12:11:02',
    times: [],
}, {
    id: 6,
    name: 'event6',
    createdAt: '2021-01-23T22:23:22',
    updatedAt: '2022-08-12T12:11:02',
    times: [],
}, {
    id: 7,
    name: 'event7',
    createdAt: '2021-01-23T22:23:22',
    updatedAt: '2022-08-12T12:11:02',
    times: [],
},
]

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
