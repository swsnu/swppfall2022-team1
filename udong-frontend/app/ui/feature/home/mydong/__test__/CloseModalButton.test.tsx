import { fireEvent, render, screen } from '@testing-library/react'

import { CloseModalButton } from '../CloseModalButton'

describe('<CreateClubModal/>', () => {
    it('renders create club modal', () => {
        render(<CloseModalButton
            setIsOpen={() => {return}}
        />)
        const closeButton = screen.getAllByRole('img')[0]
        fireEvent.click(closeButton)
        expect(closeButton).toBeDefined()
    })
})

