import { fireEvent, render, screen } from '@testing-library/react'

import { TagUpsertModal } from '../TagUpsertModal'

describe('<TagUpsertModal/>', () => {
    it('should render tag upsert modal', () => {
        render(<TagUpsertModal
            isOpen={true}
            setIsOpen={() => {return}}
            title={'TAG'}
        />)
        const text = screen.getByText('TAG')
        expect(text).toBeDefined()
    })

    it ('should test on click close', () => {
        render(<TagUpsertModal
            isOpen={true}
            setIsOpen={() => {return}}
            title={'TAG'}
        />)
        const component = screen.getAllByRole('img')[0]
        fireEvent.click(component)
        expect(component).toBeDefined()
    })

    it ('should test on click save', () => {
        render(<TagUpsertModal
            isOpen={true}
            setIsOpen={() => {return}}
            title={'TAG'}
        />)
        const component = screen.getByText('저장하기')
        fireEvent.click(component)
        expect(component).toBeDefined()
    })
})
