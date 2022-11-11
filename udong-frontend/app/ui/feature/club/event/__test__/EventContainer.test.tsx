import { fireEvent, render, screen } from '@testing-library/react'
import * as router from 'next/router'
import { NextRouter } from 'next/router'

import { EventContainer } from '../EventContainer'

jest.mock('../../../../components/UdongSelectableIcon', () => ({
    UdongSelectableIcon: ({ selected, onClickUnSelected }: { selected: boolean, onClickUnSelected: ()=>void }) =>
        <div
            data-testid={selected ? 'selected-icon' : 'unselected-icon'}
            onClick={onClickUnSelected}
        />,
}))

jest.mock('../../../../components/UdongLoader', () => ({
    UdongLoader: () => <div data-testid={'udong-loader'}/>,
}))

jest.mock('../list/EventListView', () => ({
    EventListView: () => <div data-testid={'event-list-view'}/>,
}))

jest.mock('../calendar/EventCalendarView', () => ({
    EventCalendarView: () => <div data-testid={'event-calendar-view'}/>,
}))

describe('<EventContainer/>', () => {
    beforeEach(()=>jest.clearAllMocks())
    it('show loader when router is not ready',  () => {
        jest.spyOn(router, 'useRouter').mockImplementation(() => ({
            isReady: false,
            query: { view: 'calendar', tab: 'event' },
        } as unknown as NextRouter))
        render(<EventContainer/>)
        const loader = screen.getByTestId('udong-loader')
        expect(loader).toBeDefined()
    })
    it('renders calendar view when router is ready', () => {
        jest.spyOn(router, 'useRouter').mockImplementation(() => ({
            isReady: true,
            query: { view: 'calendar', tab: 'event' },
        } as unknown as NextRouter))
        render(<EventContainer/>)
        const calendar = screen.getByTestId('event-calendar-view')
        expect(calendar).toBeDefined()
    })
    it('renders list view when router is ready', () => {
        jest.spyOn(router, 'useRouter').mockImplementation(() => ({
            isReady: true,
            query: { view: 'calendar', tab: 'event' },
        } as unknown as NextRouter))
        render(<EventContainer/>)
        const calendar = screen.getByTestId('event-calendar-view')
        expect(calendar).toBeDefined()
    })
    it('lick list tab', () => {
        const mockReplace = jest.fn()
        jest.spyOn(router, 'useRouter').mockImplementation(() => ({
            isReady: true,
            query: { view: 'calendar', tab: 'event' },
            replace: (url: string) => mockReplace(url),
        } as unknown as NextRouter))
        render(<EventContainer/>)
        const tabButton = screen.getByTestId('unselected-icon')
        fireEvent.click(tabButton)
        expect(mockReplace).toBeCalledWith(
            `/club/1/?tab=event&view=list`,
        )
    })
})
