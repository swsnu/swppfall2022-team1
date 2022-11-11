import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import * as router from 'next/router'
import { NextRouter } from 'next/router'
import { act } from 'react-dom/test-utils'

import { SchedulingStatusContainer } from '../SchedulingStatusContainer'

describe('<SchedulingStatusContainer/>', () => {
    it('renders SchedulingStatusContainer', async () => {
        const mockBack = jest.fn()
        jest.spyOn(router, 'useRouter').mockImplementation(() => ({
            query: { clubId: 1, postId: 1 },
            back: mockBack,
        } as unknown as NextRouter))

        await act(async () => {render(<SchedulingStatusContainer/>)})

        const backBtn = screen.getAllByRole('img')[0]
        await waitFor(() => expect(backBtn).toBeInTheDocument())
        await act(async () => {fireEvent.click(backBtn)})
        await waitFor(() => expect(mockBack).toHaveBeenCalledTimes(1))

        const cell = screen.getAllByText('7')[0]
        await waitFor(() => expect(cell).toBeInTheDocument())
        await act(async () => {fireEvent.mouseOver(cell)})
    })
    it('click scheduler', async () => {
        const mockBack = jest.fn()
        jest.spyOn(router, 'useRouter').mockImplementation(() => ({
            query: { clubId: 1, postId: 1 },
            back: mockBack,
        } as unknown as NextRouter))

        await act(async () => {render(<SchedulingStatusContainer/>)})

        const cell = screen.getAllByText('7')[0]
        await waitFor(() => expect(cell).toBeInTheDocument())
        await act(async () => {fireEvent.click(cell)})
    })
})
