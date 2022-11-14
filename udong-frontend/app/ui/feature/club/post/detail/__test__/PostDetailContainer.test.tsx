import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import * as router from 'next/router'
import { NextRouter } from 'next/router'
import { act } from 'react-dom/test-utils'

import { PostDetailContainer } from '../PostDetailContainer'

describe('<PostDetailContainer/>', () => {
    it('renders Post Detail', async () => {
        const mockPush = jest.fn()
        const mockBack = jest.fn()
        jest.spyOn(router, 'useRouter').mockImplementation(() => ({
            query: { type: '' },
            push: (url: string) => mockPush(url),
            back: mockBack,
        } as unknown as NextRouter))

        await act(async () => {render(<PostDetailContainer/>)})

        const edit = screen.getByText(/수정하기/)
        await waitFor(() => expect(edit).toBeInTheDocument())
        fireEvent.click(edit)
        await waitFor(() => expect(mockPush).toHaveBeenCalledTimes(1))

        const delBtn = screen.getByText(/삭제하기/)
        await waitFor(() => expect(delBtn).toBeInTheDocument())
        fireEvent.click(delBtn)

        const backBtn = screen.getAllByRole('img')[0]
        await waitFor(() => expect(delBtn).toBeInTheDocument())
        fireEvent.click(backBtn)
        await waitFor(() => expect(mockBack).toHaveBeenCalledTimes(1))

        const eventBtn = screen.getAllByText(/2022.*/)[0]
        await waitFor(() => expect(eventBtn).toBeInTheDocument())
        fireEvent.click(eventBtn)
        await waitFor(() => expect(mockPush).toHaveBeenCalledTimes(2))
    })
    it('renders announcement', async () => {
        const mockPush = jest.fn()
        jest.spyOn(router, 'useRouter').mockImplementation(() => ({
            query: { type: 'announcement' },
            push: (url: string) => mockPush(url),
        } as unknown as NextRouter))

        await act(async () => {render(<PostDetailContainer/>)})
        await waitFor(() => expect(screen.getByText(/공지글/)).toBeInTheDocument())
    })
    it('renders enrollment', async () => {
        const mockPush = jest.fn()
        jest.spyOn(router, 'useRouter').mockImplementation(() => ({
            query: { type: ['enroll', 'ment'] },
            push: (url: string) => mockPush(url),
        } as unknown as NextRouter))

        await act(async () => {render(<PostDetailContainer/>)})
        await waitFor(() => expect(screen.getByText(/모집글/)).toBeInTheDocument())
    })
    it('renders scheduling', async () => {
        const mockPush = jest.fn()
        jest.spyOn(router, 'useRouter').mockImplementation(() => ({
            query: { type: 'scheduling' },
            push: (url: string) => mockPush(url),
        } as unknown as NextRouter))

        await act(async () => {render(<PostDetailContainer/>)})
        await waitFor(() => expect(screen.getByText(/수합글/)).toBeInTheDocument())
    })
    it('renders with no type', async () => {
        const mockPush = jest.fn()
        jest.spyOn(router, 'useRouter').mockImplementation(() => ({
            query: {},
            push: (url: string) => mockPush(url),
        } as unknown as NextRouter))

        await act(async () => {render(<PostDetailContainer/>)})
        await waitFor(() => expect(screen.getByText(/공지글/)).toBeInTheDocument())
    })
})