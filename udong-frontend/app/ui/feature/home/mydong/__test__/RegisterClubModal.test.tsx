import { fireEvent, render, screen } from '@testing-library/react'

import { RegisterClubModal } from '../RegisterClubModal'

describe('<RegisterClubModal/>', () => {
    it('renders add club modal', () => {
        render(<RegisterClubModal
            isOpen={true}
            setIsOpen={() => {return}}
        />)
        const text = screen.getByText('동아리 가입')
        expect(text).toBeDefined()
    })

    it('test on click', () => {
        render(<RegisterClubModal
            isOpen={true}
            setIsOpen={() => {return}}
        />)
        const text = screen.getByText('동아리 가입')
        const button = screen.getByText('가입하기')

        fireEvent.click(button)
        expect(text).toBeDefined()
    })
})
