import { fireEvent, render, screen } from '@testing-library/react'

import { DeleteModal } from '../DeleteModal'

describe('<DeleteModal/>', () => {
    it ('render delete modal & handle click', () => {
        render(<DeleteModal
            deleteObjectText={'게시글'}
            isOpen={true}
            setIsOpen={() => {return}}
        />)
        const component = screen.getByText('삭제하기')
        fireEvent.click(component)
        expect(component).toBeDefined()
    })
})
