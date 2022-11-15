import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen } from '@testing-library/react'
import * as router from 'next/router'
import { NextRouter } from 'next/router'
import { Provider } from 'react-redux'

import { postReducer, PostState } from '../../../../domain/store/post/PostSlice'
import { ClubContainer } from '../ClubContainer'
import { CLUB_TAB } from '../ClubTabView'

const stubInitialState: PostState = {
    boardPosts: [],
    comments: [],
}

const mockStore = configureStore({
    reducer: { post: postReducer },
    preloadedState: { post: stubInitialState },
})

describe('<ClubContainer/>', () => {
    it ('should render club container board tab', () => {
        render(
            <Provider store={mockStore}>
                <ClubContainer tab={CLUB_TAB.BOARD}/>
            </Provider>,
        )
        const component = screen.getByText('게시판')
        expect(component).toBeDefined()
    })

    it ('should test on click board tab', () => {
        const mockReplace = jest.fn()
        jest.spyOn(router, 'useRouter').mockImplementation(() => ({
            query: { tab: 'board', clubId: 1 },
            replace: (url: string) => mockReplace(url),
        } as unknown as NextRouter))

        render(
            <Provider store={mockStore}>
                <ClubContainer tab={CLUB_TAB.BOARD}/>
            </Provider>,
        )
        const text = screen.getByText('게시판')
        fireEvent.click(text)
        expect(mockReplace).toHaveBeenCalledWith('/club/1/?tab=board')
    })

    it ('should render club container event tab', () => {
        render(<ClubContainer tab={CLUB_TAB.EVENT}/>)
        const component = screen.getByText('행사')
        expect(component).toBeDefined()
    })

    it ('should render club container tag tab', () => {
        render(<ClubContainer tab={CLUB_TAB.TAG}/>)
        const component = screen.getByText('태그')
        expect(component).toBeDefined()
    })

    it ('should render club container info tab', () => {
        render(<ClubContainer tab={CLUB_TAB.INFO}/>)
        const component = screen.getByText('정보')
        expect(component).toBeDefined()
    })
})
