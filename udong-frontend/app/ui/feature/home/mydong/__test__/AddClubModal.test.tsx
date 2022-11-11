import { fireEvent, render, screen } from '@testing-library/react'

import { AddClubModal } from '../AddClubModal'

describe('<AddClubModal/>', () => {
    it('renders add club modal', () => {
        render(<AddClubModal
            isOpen={true}
            setIsOpen={() => {return}}
            onRegisterClubClick={() => {return}}
            onCreateClubClick={() => {return}}
        />)
        const text = screen.getByText('동아리 가입')
        expect(text).toBeDefined()
    })

    it('test on click', () => {
        render(<AddClubModal
            isOpen={true}
            setIsOpen={() => {return}}
            onRegisterClubClick={() => {return}}
            onCreateClubClick={() => {return}}
        />)
        const text = screen.getByText('동아리 가입')
        const closeButton = screen.getAllByRole('img')

        fireEvent.click(closeButton[0])
        expect(text).toBeDefined()
    })
})
