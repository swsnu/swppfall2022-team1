import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen } from '@testing-library/react'
import * as router from 'next/router'
import { NextRouter } from 'next/router'
import { Provider } from 'react-redux'

import { PostDisplayType } from '../../../../../../domain/model/BoardPost'
import { PostType } from '../../../../../../domain/model/PostType'
import { dummyUserMe } from '../../../../../../domain/model/User'
import { eventReducer, EventState } from '../../../../../../domain/store/event/EventSlice'
import { postReducer, PostState } from '../../../../../../domain/store/post/PostSlice'
import { userReducer, UserState } from '../../../../../../domain/store/user/UserSlice'
import { EventDetailContainer } from '../EventDetailContainer'

const eventInitialState: EventState = {
    events: [],
    selectedEvent: {
        id: 1,
        name: 'event name',
        createdAt: '',
        updatedAt: '',
        times: [],
    },
    errors: {},
}

const postInitialState: PostState = {
    selectedPost: {
        displayType: PostDisplayType.CLUB,
        id: 1,
        title: 'title',
        content: 'content',
        type: PostType.ANNOUNCEMENT,
        eventName: {
            id: 1,
            name: 'event',
        },
        createdAt: '',
        updatedAt: '',
    },
    feedPosts: [],
    clubPosts: [],
    errors: {},
    eventPosts: [],
}

const stubUserInitialState: UserState = {
    errors: {},
    isAdmin: true,
    selectedUser: dummyUserMe,
    me: dummyUserMe,
}

export const mockStore = configureStore({
    reducer: { event: eventReducer, post: postReducer, user: userReducer },
    preloadedState: { event: eventInitialState, post: postInitialState, user: stubUserInitialState },
})

jest.mock('next/config', () => () => ({
    publicRuntimeConfig: {
        backendUrl: '',
    },
}))

describe('<EventDetailContainer/>', () => {
    it ('should render event detail container', () => {
        const mockBack = jest.fn()
        jest.spyOn(router, 'useRouter').mockImplementation(() => ({
            back: () => mockBack(),
            query: ({ clubId: 1, eventId: 1 }),
        } as unknown as NextRouter))
        render(<Provider store={mockStore}><EventDetailContainer/></Provider>)
        const component = screen.getByText('event name')
        expect(component).toBeDefined()
    })

    it ('should handle on go back', () => {
        const mockBack = jest.fn()
        jest.spyOn(router, 'useRouter').mockImplementation(() => ({
            back: () => mockBack(),
            query: ({ clubId: 1, eventId: 1 }),
        } as unknown as NextRouter))

        render(<Provider store={mockStore}><EventDetailContainer/></Provider>)
        const component = screen.getAllByRole('img')[0]
        fireEvent.click(component)
        expect(mockBack).toHaveBeenCalledTimes(1)
    })

    it ('should handle on click edit', () => {
        const mockPush = jest.fn()
        jest.spyOn(router, 'useRouter').mockImplementation(() => ({
            push: (url: string) => mockPush(url),
            query: ({ clubId: 1, eventId: 1 }),
        } as unknown as NextRouter))

        render(<Provider store={mockStore}><EventDetailContainer/></Provider>)
        const component = screen.getByText('????????????')
        fireEvent.click(component)
        expect(mockPush).toHaveBeenCalledWith('/club/1/event/1/edit')
    })

    it ('should handle on click delete', () => {
        const mockPush = jest.fn()
        jest.spyOn(router, 'useRouter').mockImplementation(() => ({
            push: (url: string) => mockPush(url),
            query: ({ clubId: 1, eventId: 1 }),
        } as unknown as NextRouter))
        render(<Provider store={mockStore}><EventDetailContainer/></Provider>)
        const component = screen.getByText('????????????')
        fireEvent.click(component)
        expect(component).toBeDefined()
    })
})
