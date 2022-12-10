import { fireEvent, render, screen } from '@testing-library/react'
import * as router from 'next/router'
import { NextRouter } from 'next/router'

import { PostCreateModal } from '../PostCreateModal'

describe('<PostCreateModal/>', () => {
    it ('render post create modal', () => {
        render(<PostCreateModal
            clubId={1}
            isOpen={true}
            setIsOpen={() => {return}}
        />)
        const text = screen.getByText('게시글 쓰기')
        expect(text).toBeDefined()
    })

    it ('should handle on click select', () => {
        const mockPush = jest.fn()
        jest.spyOn(router, 'useRouter').mockImplementation(() => ({
            query: { type: 'Announcement', clubId: 1 },
            push: (url: string) => mockPush(url),
        } as unknown as NextRouter))

        render(<PostCreateModal
            clubId={1}
            isOpen={true}
            setIsOpen={() => {return}}
        />)
        const text = screen.getByText('선택하기')
        fireEvent.click(text)
        expect(mockPush).toHaveBeenCalledWith(`/club/1/post/create/?type=announcement`)
    })

    it ('should handle on click close', () => {
        render(<PostCreateModal
            clubId={1}
            isOpen={true}
            setIsOpen={() => {return}}
        />)
        const closeButton = screen.getAllByRole('img')[0]
        fireEvent.click(closeButton)
        expect(closeButton).toBeDefined()
    })

    it ('should handle on click announcement', () => {
        render(<PostCreateModal
            clubId={1}
            isOpen={true}
            setIsOpen={() => {return}}
        />)
        const text = screen.getByText('일반 공지글')
        fireEvent.click(text)
        expect(text).toBeDefined()
    })

    it ('should handle on click enrollment', () => {
        render(<PostCreateModal
            clubId={1}
            isOpen={true}
            setIsOpen={() => {return}}
        />)
        const text = screen.getByText('인원 모집 글')
        fireEvent.click(text)
        expect(text).toBeDefined()
    })

    it ('should handle on click scheduling', () => {
        render(<PostCreateModal
            clubId={1}
            isOpen={true}
            setIsOpen={() => {return}}
        />)
        const text = screen.getByText('일정 수합 글')
        fireEvent.click(text)
        expect(text).toBeDefined()
    })
})
