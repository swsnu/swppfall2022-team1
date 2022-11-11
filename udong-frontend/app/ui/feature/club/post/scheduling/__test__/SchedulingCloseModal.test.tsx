import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import * as router from 'next/router'
import { NextRouter } from 'next/router'
import { act } from 'react-dom/test-utils'

import { SchedulingCloseModal } from '../SchedulingCloseModal'

describe('<SchedulingCloseModal/>', () => {
    it('renders SchedulingCloseModal', async () => {
        const mockPush = jest.fn()
        jest.spyOn(router, 'useRouter').mockImplementation(() => ({
            query: { clubId: 1, postId: 1 },
            push: mockPush,
        } as unknown as NextRouter))
        const mockSetIsOpen = jest.fn()

        await act(async () => {render(<SchedulingCloseModal
            isOpen
            setIsOpen={mockSetIsOpen}
        />)})

        const closeBtn = screen.getByText('마감하기')
        await waitFor(async () => expect(closeBtn).toBeInTheDocument())
        await act(async () => {fireEvent.click(closeBtn)})
        await waitFor(async () => expect(mockPush).toHaveBeenCalledTimes(1))
    })
})
