import { fireEvent, render, screen } from '@testing-library/react'

import { UdongCloseButton } from '../../../../components/UdongCloseButton'

describe('<CreateClubModal/>', () => {
    it('renders create club modal', () => {
        render(<UdongCloseButton
            setIsOpen={() => {return}}
        />)
        const closeButton = screen.getAllByRole('img')[0]
        fireEvent.click(closeButton)
        expect(closeButton).toBeDefined()
    })
})

