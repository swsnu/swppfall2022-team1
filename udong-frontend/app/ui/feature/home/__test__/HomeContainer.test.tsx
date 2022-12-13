import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen } from '@testing-library/react'
import * as router from 'next/router'
import { NextRouter } from 'next/router'
import { Provider } from 'react-redux'

import { clubReducer, ClubState } from '../../../../domain/store/club/ClubSlice'
import { postReducer, PostState } from '../../../../domain/store/post/PostSlice'
import { HomeContainer } from '../HomeContainer'

const stubInitialState: ClubState = {
    myClubs: [],
    members: [],
    errors: {},
}

const stubPostInitialState: PostState = {
    feedPosts: [],
    errors: {},
    clubPosts: [],
    eventPosts: [],
}

const mockStore = configureStore({
    reducer: { club: clubReducer, post: postReducer },
    preloadedState: { club: stubInitialState, post: stubPostInitialState },
})

jest.mock('next/config', () => () => ({
    publicRuntimeConfig: {
        backendUrl: '',
    },
}))

const renderHomeContainer = (tab: 'feed' | 'mydong'): JSX.Element => {
    return <Provider store={mockStore}>
        <HomeContainer tab={tab}/>
    </Provider>
}

describe('<HomeContainer/>', () => {
    it ('renders home container', () => {
        render(renderHomeContainer('feed'))
        const text = screen.getByText('피드')
        expect(text).toBeDefined()
    })

    it ('should navigate', () => {
        const mockReplace = jest.fn()
        jest.spyOn(router, 'useRouter').mockImplementation(() => ({
            query: { tab: 'feed' },
            replace: (url: string) => mockReplace(url),
        } as unknown as NextRouter))

        render(renderHomeContainer('feed'))
        const text = screen.getByText('피드')
        fireEvent.click(text)
        expect(mockReplace).toHaveBeenCalledWith('/?tab=feed')
    })

    it ('should render feed page', () => {
        render(renderHomeContainer('mydong'))
        const text = screen.getByText('my동')
        expect(text).toBeDefined()
    })
})
