import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { Provider } from 'react-redux'

import { dummyUserMe } from '../../../../../../domain/model/User'
import { eventReducer, EventState } from '../../../../../../domain/store/event/EventSlice'
import { postReducer, PostState } from '../../../../../../domain/store/post/PostSlice'
import { tagReducer, TagState } from '../../../../../../domain/store/tag/TagSlice'
import { userReducer, UserState } from '../../../../../../domain/store/user/UserSlice'
import { PostAdditionalInputsView } from '../PostAdditionalInputsView'

const stubPostInitialState: PostState = {
    feedPosts: [],
    errors: {},
    clubPosts: [],
    eventPosts: [],
}

const stubTagInitialState: TagState = {
    tags: [],
    createPostTags: [],
    errors: {},
    selectedUserIds: [],
}

const stubUserInitialState: UserState = {
    isAdmin: false,
    selectedUser: dummyUserMe,
    me: dummyUserMe,
    errors: {},
}

const stubEventInitialState: EventState = {
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

const mockStore = configureStore({
    reducer: { post: postReducer, tag: tagReducer, user: userReducer, event: eventReducer },
    preloadedState: { post: stubPostInitialState, tag: stubTagInitialState, user: stubUserInitialState, event: stubEventInitialState },
})

describe('<PostAdditionalInputsView />', () => {
    it('should render', () => {
        render(
            <Provider store={mockStore}>
                <PostAdditionalInputsView
                    clubId={1}
                    isEdit={true}
                    setScheduling={() => { return }}
                />
            </Provider>,
        )
        expect(screen.getByText('태그')).toBeInTheDocument()
    })

    it('should render date time picker', async () => {
        await act(async () => {
            render(
                <Provider store={mockStore}>
                    <PostAdditionalInputsView
                        clubId={1}
                        isEdit={false}
                        showDateTimePicker={true}
                        setScheduling={() => { return }}
                    />
                </Provider>,
            )
        })
        await waitFor(async () => {
            expect(screen.getAllByText(/요일/)[0]).toBeInTheDocument()
            expect(screen.getByText(/날짜/)).toBeInTheDocument()
            const button1 = screen.getAllByText(/요일/)[0]
            const button2 = screen.getByText(/날짜/)
            fireEvent.click(button1)
            fireEvent.click(button2)
        })
    })
})
