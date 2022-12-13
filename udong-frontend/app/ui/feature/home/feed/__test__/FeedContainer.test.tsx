import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'

import { postReducer, PostState } from '../../../../../domain/store/post/PostSlice'
import { FeedContainer } from '../FeedContainer'

const stubPostInitialState: PostState = {
    feedPosts: [],
    errors: {},
    clubPosts: [],
}

const mockStore = configureStore({
    reducer: { post: postReducer },
    preloadedState: { post: stubPostInitialState },
})

jest.mock('next/config', () => () => ({
    publicRuntimeConfig: {
        backendUrl: '',
    },
}))

describe('<FeedContainer/>', () => {
    it ('render feed container', () => {
        render(
            <Provider store={mockStore}>
                <FeedContainer/>
            </Provider>,
        )
        const component = screen.getByPlaceholderText('검색어를 입력해주세요')
        expect(component).toBeDefined()
    })
})
