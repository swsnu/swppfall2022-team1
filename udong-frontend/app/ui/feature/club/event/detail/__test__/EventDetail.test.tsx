import { fireEvent, render, screen } from '@testing-library/react'
import * as router from 'next/router'
import { NextRouter } from 'next/router'

import { EventDetailContainer } from '../EventDetailContainer'

describe('<EventDetailContainer/>', () => {
    it ('should render event detail container', () => {
        render(<EventDetailContainer/>)
        const component = screen.getByText('2022년 겨울 공연')
        expect(component).toBeDefined()
    })

    it ('should handle on go back', () => {
        const mockBack = jest.fn()
        jest.spyOn(router, 'useRouter').mockImplementation(() => ({
            back: () => mockBack(),
        } as unknown as NextRouter))

        render(<EventDetailContainer/>)
        const component = screen.getAllByRole('img')[0]
        fireEvent.click(component)
        expect(mockBack).toHaveBeenCalledTimes(1)
    })

    it ('should handle on click edit', () => {
        const mockPush = jest.fn()
        jest.spyOn(router, 'useRouter').mockImplementation(() => ({
            push: (url: string) => mockPush(url),
        } as unknown as NextRouter))

        render(<EventDetailContainer/>)
        const component = screen.getByText('수정하기')
        fireEvent.click(component)
        expect(mockPush).toHaveBeenCalledWith('/club/1/event/1/edit')
    })

    it ('should handle on click delete', () => {
        render(<EventDetailContainer/>)
        const component = screen.getByText('삭제하기')
        fireEvent.click(component)
        expect(component).toBeDefined()
    })
})
