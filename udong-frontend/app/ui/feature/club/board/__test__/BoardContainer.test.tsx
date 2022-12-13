import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'

import { dummyUserMe } from '../../../../../domain/model/User'
import { postReducer, PostState } from '../../../../../domain/store/post/PostSlice'
import { userReducer, UserState } from '../../../../../domain/store/user/UserSlice'
import { BoardContainer } from '../BoardContainer'

const stubInitialState: PostState = {
    errors: {},
    feedPosts: [],
    clubPosts: [],
    eventPosts: [],
}

const stubUserInitialState: UserState = {
    isAdmin: true,
    selectedUser: dummyUserMe,
}

const mockStore = configureStore({
    reducer: { post: postReducer, user: userReducer },
    preloadedState: { post: stubInitialState, user: stubUserInitialState },
})

jest.mock('next/config', () => () => ({
    publicRuntimeConfig: {
        backendUrl: '',
    },
}))

describe('<BoardContainer/>', () => {
    it ('render board container', () => {
        render(
            <Provider store={mockStore}>
                <BoardContainer clubId={1}/>
            </Provider>,
        )
        const component = screen.getByPlaceholderText('검색어를 입력해주세요')
        expect(component).toBeDefined()
    })

    it ('click write', () => {
        render(
            <Provider store={mockStore}>
                <BoardContainer clubId={1}/>
            </Provider>,
        )
        const component = screen.getByText('글쓰기')
        fireEvent.click(component)
        expect(component).toBeDefined()
    })
})
