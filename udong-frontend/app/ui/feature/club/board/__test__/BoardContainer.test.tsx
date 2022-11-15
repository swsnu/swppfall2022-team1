import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'

import { postReducer, PostState } from '../../../../../domain/store/post/PostSlice'
import { BoardContainer } from '../BoardContainer'

const stubInitialState: PostState = {
    boardPosts: [],
    comments: [],
}

const mockStore = configureStore({
    reducer: { post: postReducer },
    preloadedState: { post: stubInitialState },
})

describe('<BoardContainer/>', () => {
    it ('render board container', () => {
        render(
            <Provider store={mockStore}>
                <BoardContainer/>
            </Provider>,
        )
        const component = screen.getByRole('img')
        expect(component).toBeDefined()
    })

    it ('click write', () => {
        render(
            <Provider store={mockStore}>
                <BoardContainer/>
            </Provider>,
        )
        const component = screen.getByText('글쓰기')
        fireEvent.click(component)
        expect(component).toBeDefined()
    })
})
