import { fireEvent, render, screen } from '@testing-library/react'

import { TagItem } from '../TagItem'

describe('<TagItem/>', () => {
    it ('should render tag item', () => {
        render(<TagItem
            name={'hello world'}
            isUserIncluded={true}
            showEditModal={() => {return}}
            onClickDelete={() => {return}}
        />)
        const text = screen.getByText('hello world')
        expect(text).toBeDefined()
    })

    it ('should test on click edit', () => {
        render(<TagItem
            name={'hello world'}
            isUserIncluded={true}
            showEditModal={() => {return}}
            onClickDelete={() => {return}}
        />)
        const component = screen.getAllByRole('img')[0]
        fireEvent.click(component)
        expect(component).toBeDefined()
    })

    it ('should test on click delete', () => {
        render(<TagItem
            name={'hello world'}
            isUserIncluded={true}
            showEditModal={() => {return}}
            onClickDelete={() => {return}}
        />)
        const component = screen.getAllByRole('img')[1]
        fireEvent.click(component)
        expect(component).toBeDefined()
    })
})