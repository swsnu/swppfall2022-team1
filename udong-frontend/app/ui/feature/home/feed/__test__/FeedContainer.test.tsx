import { render, screen } from '@testing-library/react'

import { FeedContainer } from '../FeedContainer'

describe('<FeedContainer/>', () => {
    it ('render feed container', () => {
        render(<FeedContainer/>)
        const component = screen.getByRole('img')
        expect(component).toBeDefined()
    })
})
