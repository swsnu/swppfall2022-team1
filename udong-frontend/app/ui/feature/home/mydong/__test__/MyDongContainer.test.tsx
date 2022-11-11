import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'

import { MyDongContainer } from '../MyDongContainer'

jest.mock('../AddClubModal', () => ({
    AddClubModal: ({ isOpen }: { isOpen: boolean }) =>
        <div data-testid={'add-club-modal'}>{isOpen ? 'open' : 'close'}</div>,
}))

describe('<MyDongContainer/>', () => {
    it('renders my dong container', () => {
        render(<MyDongContainer/>)
        const text = screen.getAllByText('단풍')
        expect(text).toBeDefined()
    })

    it('should test when add club modal is open', async () => {
        render(<MyDongContainer/>)
        const openButton = screen.getAllByRole('img')
        await act(async () => {
            fireEvent.click(openButton[0])
        })
        await waitFor(() => expect(screen.getByText('open')).toBeDefined())
    })
})
