import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import * as router from 'next/router'
import { NextRouter } from 'next/router'
import { act } from 'react-dom/test-utils'

import { SchedulingStatusTableView } from '../SchedulingStatusTableView'

describe('<SchedulingStatusTableView/>', () => {
    it('renders SchedulingStatusTableView', async () => {
        const mockBack = jest.fn()
        jest.spyOn(router, 'useRouter').mockImplementation(() => ({
            query: { clubId: 1, postId: 1 },
            back: mockBack,
        } as unknown as NextRouter))
        const mockSetSelected = jest.fn()
        const mockSetHover = jest.fn()

        await act(async () => {render(<SchedulingStatusTableView
            data={{
                startTime: 14,
                endTime: 15,
                dates: null,
                weekdays: [false, false, true, true, false, false, false],
                availableTime: [],
            }}
            selected={{ col: 0, row: 0 }}
            setSelected={mockSetSelected}
            setHover={mockSetHover}
            cnt={[[0], [1]]}
        />)})

        const cell = screen.getAllByText('7')[0]
        await waitFor(() => expect(cell).toBeInTheDocument())
        await act(async () => {fireEvent.click(cell)})
    })
})
