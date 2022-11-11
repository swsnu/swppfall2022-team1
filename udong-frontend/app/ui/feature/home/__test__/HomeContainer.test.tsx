import { fireEvent, render, screen } from '@testing-library/react'
import * as router from 'next/router'
import { NextRouter } from 'next/router'

import { HomeContainer } from '../HomeContainer'

describe('<HomeContainer/>', () => {
    it ('renders home container', () => {
        render(<HomeContainer tab={'feed'}/>)
        const text = screen.getByText('피드')
        expect(text).toBeDefined()
    })

    it ('should navigate', () => {
        const mockReplace = jest.fn()
        jest.spyOn(router, 'useRouter').mockImplementation(() => ({
            query: { tab: 'feed' },
            replace: (url: string) => mockReplace(url),
        } as unknown as NextRouter))

        render(<HomeContainer tab={'feed'}/>)
        const text = screen.getByText('피드')
        fireEvent.click(text)
        expect(mockReplace).toHaveBeenCalledWith('/?tab=feed')
    })

    it ('should render feed page', () => {
        render(<HomeContainer tab={'mydong'}/>)
        const text = screen.getByText('my동')
        expect(text).toBeDefined()
    })
})
