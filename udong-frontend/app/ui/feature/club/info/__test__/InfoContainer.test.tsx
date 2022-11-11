import { render, screen } from '@testing-library/react'

import { InfoContainer } from '../InfoContainer'

describe('<InfoContainer/>', () => {
    it('should render info container', () => {
        render(<InfoContainer/>)
        const text = screen.getByText('탈퇴하기')
        expect(text).toBeDefined()
    })
})
