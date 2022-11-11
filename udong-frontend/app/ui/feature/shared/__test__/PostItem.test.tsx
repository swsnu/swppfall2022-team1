import { fireEvent, render, screen } from '@testing-library/react'
import * as router from 'next/router'
import { NextRouter } from 'next/router'

import { dummyFeedPosts } from '../../../../domain/model/Post'
import { PostItem } from '../PostItem'

describe('<PostItem/>', () => {
    it ('should handle on click post', () => {
        const mockPush = jest.fn()
        jest.spyOn(router, 'useRouter').mockImplementation(() => ({
            query: { clubId: 1, postId: 1, type: 'announcement' },
            push: (url: string) => mockPush(url),
        } as unknown as NextRouter))

        render(<PostItem post={dummyFeedPosts[0]}/>)
        const component = screen.getByText('겨울 공연 중요 공지!')
        fireEvent.click(component)
        expect(mockPush).toHaveBeenCalledWith('/club/1/post/1/?type=announcement')
    })

    it ('should handle on click tag', () => {
        render(<PostItem post={dummyFeedPosts[0]}/>)
        const component = screen.getByText('2022년 겨울 공연 1팀')
        fireEvent.click(component)
        expect(component).toBeDefined()
    })
})
