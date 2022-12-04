import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'

import { postReducer, PostState } from '../../../../../domain/store/post/PostSlice'
import { FeedContainer } from '../FeedContainer'

const stubPostInitialState: PostState = {
    feedPosts: [],
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
        const component = screen.getByRole('img')
        expect(component).toBeDefined()
    })
})
