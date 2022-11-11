import { fireEvent, render, screen } from '@testing-library/react'
import * as router from 'next/router'
import { NextRouter } from 'next/router'

import { Header, HEADER_PAGE } from '../Header'

describe('<Header/>', () => {
    it('should render header', () => {
        render(<Header type={HEADER_PAGE.MAIN}/>)
        const text = screen.getByText('로그아웃')
        expect(text).toBeDefined()
    })

    it('should handle reload on click', () => {
        const mockReload = jest.fn()
        jest.spyOn(router, 'useRouter').mockImplementation(() => ({
            pathname: '/',
            query: { tab: 'feed' },
            reload: () => mockReload(),
        } as unknown as NextRouter))

        render(<Header type={HEADER_PAGE.MAIN}/>)
        const component = screen.getAllByRole('img')[0]
        fireEvent.click(component)
        expect(mockReload).toHaveBeenCalledTimes(1)
    })

    it('should handle navigate to home', () => {
        const mockPush = jest.fn()
        jest.spyOn(router, 'useRouter').mockImplementation(() => ({
            push: (url: string) => mockPush(url),
        } as unknown as NextRouter))

        render(<Header type={HEADER_PAGE.MAIN}/>)
        const component = screen.getAllByRole('img')[0]
        fireEvent.click(component)
        expect(mockPush).toHaveBeenCalledWith('/')
    })

    it('should handle navigate to club', () => {
        const mockPush = jest.fn()
        jest.spyOn(router, 'useRouter').mockImplementation(() => ({
            query: { clubId: 1 },
            push: (url: string) => mockPush(url),
        } as unknown as NextRouter))

        render(<Header
            type={HEADER_PAGE.CLUB}
            clubId={1}
        />)
        const component = screen.getByText('단풍')
        fireEvent.click(component)
        expect(mockPush).toHaveBeenCalledWith('/club/1')
    })

    it ('should handle on click logout', () => {
        const mockPush = jest.fn()
        jest.spyOn(router, 'useRouter').mockImplementation(() => ({
            push: (url: string) => mockPush(url),
        } as unknown as NextRouter))

        render(<Header type={HEADER_PAGE.MAIN}/>)
        const component = screen.getByText('로그아웃')
        fireEvent.click(component)
        expect(mockPush).toHaveBeenCalledWith('/')
    })
})
