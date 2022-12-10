import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import * as router from 'next/router'
import { NextRouter } from 'next/router'
import { act } from 'react-dom/test-utils'

import { SchedulingPostType } from '../../../../../../domain/model/SchedulingPostType'
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
                type: SchedulingPostType.DAYS,
                startTime: 14,
                endTime: 15,
                closed: false,
                confirmedTime: null,
                availableTime: [],
                weekdays: [false, false, true, true, false, false, false],
                repeatStart: new Date('2022-12-9').toLocaleDateString(),
                repeatEnd: new Date('2022-12-25').toLocaleDateString(),
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
