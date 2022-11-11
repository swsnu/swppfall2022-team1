import { fireEvent, render, screen } from '@testing-library/react'

import { ClubMemberProfileView } from '../ClubMemberProfileView'

describe('<ClubMemberProfileView/>', () => {
    it('should render club member profile view', () => {
        render(<ClubMemberProfileView
            isOpen={true}
            setIsOpen={() => {return}}
            name={'NAME'}
        />)
        const text = screen.getByText('NAME')
        expect(text).toBeDefined()
    })

    it('should test on click 일반 멤버', () => {
        render(<ClubMemberProfileView
            isOpen={true}
            setIsOpen={() => {return}}
            name={'NAME'}
            isAdmin={true}
        />)
        const text = screen.getByText('일반 멤버로 전환')
        fireEvent.click(text)
        expect(text).toBeDefined()
    })

    it('should test on click 관리자로 전환', () => {
        render(<ClubMemberProfileView
            isOpen={true}
            setIsOpen={() => {return}}
            name={'NAME'}
        />)
        const text = screen.getByText('관리자로 전환')
        fireEvent.click(text)
        expect(text).toBeDefined()
    })

    it('should test on click 내보내기', () => {
        render(<ClubMemberProfileView
            isOpen={true}
            setIsOpen={() => {return}}
            name={'NAME'}
        />)
        const text = screen.getByText('내보내기')
        fireEvent.click(text)
        expect(text).toBeDefined()
    })

    it('should test on click close', () => {
        render(<ClubMemberProfileView
            isOpen={true}
            setIsOpen={() => {return}}
            name={'NAME'}
        />)
        const component = screen.getAllByRole('img')[0]
        fireEvent.click(component)
        expect(component).toBeDefined()
    })
})
