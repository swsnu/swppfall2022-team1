import { fireEvent, render, screen } from '@testing-library/react'

import { BoardContainer } from '../BoardContainer'

describe('<BoardContainer/>', () => {
    it ('render board container', () => {
        render(<BoardContainer/>)
        const component = screen.getByRole('img')
        expect(component).toBeDefined()
    })

    it ('click write', () => {
        render(<BoardContainer/>)
        const component = screen.getByText('글쓰기')
        fireEvent.click(component)
        expect(component).toBeDefined()
    })
})
