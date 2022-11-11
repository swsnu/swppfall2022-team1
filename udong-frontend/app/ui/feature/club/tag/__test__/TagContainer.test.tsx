import { fireEvent, render, screen } from '@testing-library/react'

import { TagContainer } from '../TagContainer'

describe('<TagContainer/>', () => {
    it ('render tag container', () => {
        render(<TagContainer/>)
        const component = screen.getByText('태그 추가하기')
        fireEvent.click(component)
        expect(component).toBeDefined()
    })

    it ('should test click tag item', () => {
        render(<TagContainer/>)
        const component = screen.getByText('전체')
        fireEvent.click(component)
        expect(component).toBeDefined()
    })
})
