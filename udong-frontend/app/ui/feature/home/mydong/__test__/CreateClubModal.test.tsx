import { fireEvent, render, screen } from '@testing-library/react'

import { CreateClubModal } from '../CreateClubModal'

describe('<CreateClubModal/>', () => {
    it('renders create club modal', () => {
        render(<CreateClubModal
            isOpen={true}
            setIsOpen={() => {return}}
        />)
        const text = screen.getByText('동아리 생성')
        expect(text).toBeDefined()
    })

    it('test on click', () => {
        render(<CreateClubModal
            isOpen={true}
            setIsOpen={() => {return}}
        />)
        const text = screen.getByText('동아리 생성')
        const button = screen.getByText('생성하기')

        fireEvent.click(button)
        expect(text).toBeDefined()
    })
})
