import { fireEvent, render, screen } from '@testing-library/react'
import * as router from 'next/router'
import { NextRouter } from 'next/router'

import { BoardPost, PostDisplayType } from '../../../../domain/model/ListItemPost'
import { PostType } from '../../../../domain/model/PostType'
import { PostItem } from '../PostItem'

const dummyPost: BoardPost = {
    displayType: PostDisplayType.BOARD,
    id: 1,
    eventName: {
        id: 1,
        name: '',
    },
    title: '겨울 공연 중요 공지!',
    content: '',
    type: PostType.ANNOUNCEMENT,
    includedTags: [{ id: 1, name: '2022년 겨울 공연 1팀', createdAt: '', updatedAt: '' }],
    createdAt: '',
}

describe('<PostItem/>', () => {
    it ('should handle on click post', () => {
        const mockPush = jest.fn()
        jest.spyOn(router, 'useRouter').mockImplementation(() => ({
            query: { clubId: 1, postId: 1, type: 'announcement' },
            push: (url: string) => mockPush(url),
        } as unknown as NextRouter))

        render(<PostItem post={dummyPost}/>)
        const component = screen.getByText('겨울 공연 중요 공지!')
        fireEvent.click(component)
        expect(mockPush).toHaveBeenCalledWith('/club/1/post/1/?type=announcement')
    })

    it ('should handle on click tag', () => {
        render(<PostItem post={dummyPost}/>)
        const component = screen.getByText('2022년 겨울 공연 1팀')
        fireEvent.click(component)
        expect(component).toBeDefined()
    })
})
