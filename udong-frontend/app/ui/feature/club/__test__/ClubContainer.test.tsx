import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen } from '@testing-library/react'
import * as router from 'next/router'
import { NextRouter } from 'next/router'
import { Provider } from 'react-redux'

import { dummyUserMe } from '../../../../domain/model/User'
import { clubReducer, ClubState } from '../../../../domain/store/club/ClubSlice'
import { eventReducer, EventState } from '../../../../domain/store/event/EventSlice'
import { postReducer, PostState } from '../../../../domain/store/post/PostSlice'
import { tagReducer, TagState } from '../../../../domain/store/tag/TagSlice'
import { userReducer, UserState } from '../../../../domain/store/user/UserSlice'
import { ClubContainer } from '../ClubContainer'
import { CLUB_TAB } from '../ClubTabView'

const stubUserInitialState: UserState = {
    isAdmin: false,
    selectedUser: dummyUserMe,
}

const stubPostInitialState: PostState = {
    feedPosts: [],
    clubPosts: [],
}

const stubClubInitialState: ClubState = {
    myClubs: [],
    members: [],
    errors: {},
}

const stubEventInitialState: EventState = {
    events: [],
}

const stubTagInitialState: TagState = {
    tags: [],
}

const mockStore = configureStore({
    reducer: { post: postReducer, user: userReducer, club: clubReducer, event: eventReducer, tag: tagReducer },
    preloadedState: {
        post: stubPostInitialState,
        user: stubUserInitialState,
        club: stubClubInitialState,
        event: stubEventInitialState,
        tag: stubTagInitialState,
    },
})

jest.mock('next/config', () => () => ({
    publicRuntimeConfig: {
        backendUrl: '',
    },
}))

describe('<ClubContainer/>', () => {
    const ClubContainerWithStore = (tab: CLUB_TAB) => (
        <Provider store={mockStore}>
            <ClubContainer tab={tab}/>
        </Provider>
    )
    beforeEach(() => {
        jest.clearAllMocks()
    })
    it ('should render club container board tab', () => {
        jest.spyOn(router, 'useRouter').mockImplementation(() => ({
            query: { clubId: 1 },
        } as unknown as NextRouter))

        render(ClubContainerWithStore(CLUB_TAB.BOARD))
        const component = screen.getByText('게시판')
        expect(component).toBeDefined()
    })

    it ('should test on click board tab', () => {
        const mockReplace = jest.fn()
        jest.spyOn(router, 'useRouter').mockImplementation(() => ({
            query: { tab: 'board', clubId: 1 },
            replace: (url: string) => mockReplace(url),
        } as unknown as NextRouter))

        render(ClubContainerWithStore(CLUB_TAB.BOARD))

        const text = screen.getByText('게시판')
        fireEvent.click(text)
        expect(mockReplace).toHaveBeenCalledWith('/club/1/?tab=board')
    })

    it ('should render club container event tab', () => {
        render(ClubContainerWithStore(CLUB_TAB.EVENT))
        const component = screen.getByText('행사')
        expect(component).toBeDefined()
    })

    it ('should render club container tag tab', () => {
        render(ClubContainerWithStore(CLUB_TAB.TAG))
        const component = screen.getByText('태그')
        expect(component).toBeDefined()
    })

    it ('should render club container info tab', () => {
        render(ClubContainerWithStore(CLUB_TAB.INFO))
        const component = screen.getByText('정보')
        expect(component).toBeDefined()
    })
})
