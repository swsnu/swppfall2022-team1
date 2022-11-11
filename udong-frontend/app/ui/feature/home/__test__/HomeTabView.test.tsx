import { fireEvent, render, screen } from '@testing-library/react'

import { HomeTabView } from '../HomeTabView'

describe('<HomeTabView/>', () => {
    it ('renders home container', () => {
        render(<HomeTabView
            selectedTab={'feed'}
            setSelectedTab={() => {return}}
        />)
        const text = screen.getByText('피드')
        expect(text).toBeDefined()
    })

    it('handle on mydong click', () => {
        render(<HomeTabView
            selectedTab={'mydong'}
            setSelectedTab={() => {return}}
        />)
        const text = screen.getByText('my동')
        fireEvent.click(text)
        expect(text).toBeDefined()
    })
})
