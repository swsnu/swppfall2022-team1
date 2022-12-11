import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import * as router from 'next/router'
import { NextRouter } from 'next/router'
import { act } from 'react-dom/test-utils'
import { Provider } from 'react-redux'

import { BoardPost, PostDisplayType } from '../../../../../../domain/model/BoardPost'
import { PostType } from '../../../../../../domain/model/PostType'
import { dummyUserMe } from '../../../../../../domain/model/User'
import { commentReducer, CommentState } from '../../../../../../domain/store/comment/CommentSlice'
import { postReducer, PostState } from '../../../../../../domain/store/post/PostSlice'
import { userReducer, UserState } from '../../../../../../domain/store/user/UserSlice'
import { PostDetailContainer } from '../PostDetailContainer'

const dummyPost: BoardPost = {
    displayType: PostDisplayType.CLUB,
    id: 1,
    title: 'title',
    content: 'content',
    type: PostType.ANNOUNCEMENT,
    eventName: {
        id: 1,
        name: 'event',
    },
}

const stubPostInitialState: PostState = {
    selectedPost: dummyPost,
    feedPosts: [],
    clubPosts: [],
    createPostTags: [],
}

const stubCommentInitialState: CommentState = {
    postComments: [],
}

const stubUserInitialState: UserState = {
    isAdmin: false,
    selectedUser: dummyUserMe,
    me: dummyUserMe,
}

const mockStore = configureStore({
    reducer: { post: postReducer, comment: commentReducer, user: userReducer },
    preloadedState: { post: stubPostInitialState, comment: stubCommentInitialState, user: stubUserInitialState },
})

jest.mock('next/config', () => () => ({
    publicRuntimeConfig: {
        backendUrl: '',
    },
}))

describe('<PostDetailContainer/>', () => {
    const postDetailContainer: JSX.Element = <Provider store={mockStore}>
        <PostDetailContainer/>
    </Provider>

    it('renders Post Detail', async () => {
        const mockPush = jest.fn()
        const mockBack = jest.fn()
        jest.spyOn(router, 'useRouter').mockImplementation(() => ({
            query: { rawClubId: 1, rawPostId: 1 },
            push: (url: string) => mockPush(url),
            back: mockBack,
        } as unknown as NextRouter))

        await act(async () => {render(postDetailContainer)})

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

        const eventBtn = screen.getAllByText(/event/)[0]
        await waitFor(() => expect(eventBtn).toBeInTheDocument())
        fireEvent.click(eventBtn)
        await waitFor(() => expect(mockPush).toHaveBeenCalledTimes(2))
    })
    // it('renders announcement', async () => {
    //     const mockPush = jest.fn()
    //     jest.spyOn(router, 'useRouter').mockImplementation(() => ({
    //         query: { type: 'Announcement' },
    //         push: (url: string) => mockPush(url),
    //     } as unknown as NextRouter))
    //
    //     await act(async () => {render(postDetailContainer)})
    //     await waitFor(() => expect(screen.getByText(/공지글/)).toBeInTheDocument())
    // })
    // it('renders enrollment', async () => {
    //     const mockPush = jest.fn()
    //     jest.spyOn(router, 'useRouter').mockImplementation(() => ({
    //         query: { type: ['enroll', 'ment'] },
    //         push: (url: string) => mockPush(url),
    //     } as unknown as NextRouter))
    //
    //     await act(async () => {render(postDetailContainer)})
    //     await waitFor(() => expect(screen.getByText(/모집글/)).toBeInTheDocument())
    // })
    // it('renders scheduling', async () => {
    //     const mockPush = jest.fn()
    //     jest.spyOn(router, 'useRouter').mockImplementation(() => ({
    //         query: { type: 'scheduling' },
    //         push: (url: string) => mockPush(url),
    //     } as unknown as NextRouter))
    //
    //     await act(async () => {render(postDetailContainer)})
    //     await waitFor(() => expect(screen.getByText(/수합글/)).toBeInTheDocument())
    // })
    // it('renders with no type', async () => {
    //     const mockPush = jest.fn()
    //     jest.spyOn(router, 'useRouter').mockImplementation(() => ({
    //         query: {},
    //         push: (url: string) => mockPush(url),
    //     } as unknown as NextRouter))
    //
    //     await act(async () => {render(postDetailContainer)})
    //     await waitFor(() => expect(screen.getByText(/공지글/)).toBeInTheDocument())
    // })
})
