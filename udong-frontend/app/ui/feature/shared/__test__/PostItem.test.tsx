import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen } from '@testing-library/react'
import * as router from 'next/router'
import { NextRouter } from 'next/router'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'

import { BoardPost, PostDisplayType } from '../../../../domain/model/BoardPost'
import { PostType } from '../../../../domain/model/PostType'
import { dummyUserMe } from '../../../../domain/model/User'
import { tagReducer, TagState } from '../../../../domain/store/tag/TagSlice'
import { userReducer, UserState } from '../../../../domain/store/user/UserSlice'
import { PostItem } from '../PostItem'

const dummyPost: BoardPost = {
    displayType: PostDisplayType.CLUB,
    id: 1,
    eventName: {
        id: 1,
        name: '',
    },
    title: '겨울 공연 중요 공지!',
    content: '',
    type: PostType.ANNOUNCEMENT,
    includedTags: [{ id: 1, name: '2022년 겨울 공연 1팀', createdAt: '', updatedAt: '', isDefault: false }],
    createdAt: '',
}

const stubTagInitialState: TagState = {
    tags: [],
    createPostTags: [],
    errors: {},
    selectedUserIds: [],
    selectedTag: { users: [], id: 1, name: '', isDefault: true, createdAt: '', updatedAt: '' },
}

const stubInitialState: UserState = {
    isAdmin: false,
    selectedUser: dummyUserMe,
    me: { id: 1, name: '', timeTable: [], imageUrl: '', email: '' },
}

const mockStore = configureStore({
    reducer: { user: userReducer, tag: tagReducer },
    preloadedState: { user: stubInitialState, tag: stubTagInitialState },
})

describe('<PostItem/>', () => {
    it ('should handle on click post', () => {
        const mockPush = jest.fn()
        jest.spyOn(router, 'useRouter').mockImplementation(() => ({
            query: { clubId: 1, postId: 1, type: 'announcement' },
            push: (url: string) => mockPush(url),
        } as unknown as NextRouter))

        const client = new QueryClient()

        render(
            <QueryClientProvider client={client}>
                <Provider store={mockStore}>
                    <PostItem
                        clubId={1}
                        post={dummyPost}
                    />
                </Provider>
            </QueryClientProvider>,
        )
        const component = screen.getByText('겨울 공연 중요 공지!')
        fireEvent.click(component)
        expect(mockPush).toHaveBeenCalledWith('/club/1/post/1/?type=announcement')
    })

    it ('should handle on click tag', () => {
        const client = new QueryClient()

        render(
            <QueryClientProvider client={client}>
                <Provider store={mockStore}>
                    <PostItem
                        clubId={1}
                        post={dummyPost}
                    />
                </Provider>
            </QueryClientProvider>,
        )
        const component = screen.getByText('2022년 겨울 공연 1팀')
        fireEvent.click(component)
        expect(component).toBeDefined()
    })
})
