import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen } from '@testing-library/react'
import * as router from 'next/router'
import { NextRouter } from 'next/router'
import { Provider } from 'react-redux'

import { PostType } from '../../../../../../../domain/model/PostType'
import { eventReducer, EventState } from '../../../../../../../domain/store/event/EventSlice'
import { postReducer, PostState } from '../../../../../../../domain/store/post/PostSlice'
import { tagReducer, TagState } from '../../../../../../../domain/store/tag/TagSlice'
import { PostCreateContainer } from '../PostCreateContainer'

jest.mock('../../PostInputView', () => ({
    PostInputView: () => <div data-testid={'post-input-view'}/>,
}))

jest.mock('../../PostAdditionalInputsView', () => ({
    PostAdditionalInputsView: () => <div data-testid={'post-additional-inputs-view'}/>,
}))

const stubPostInitialState: PostState = {
    feedPosts: [],
    clubPosts: [],
    errors: {},
    eventPosts: [],
}

const stubTagInitialState: TagState = {
    tags: [],
    createPostTags: [],
    errors: {},
    selectedUserIds: [],
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
    reducer: { post: postReducer, tag: tagReducer, event: eventReducer },
    preloadedState: { post: stubPostInitialState, tag: stubTagInitialState, event: stubEventInitialState },
})

describe('<PostCreateContainer/>', () => {
    it('renders post create container: announcement',  () => {
        jest.spyOn(router, 'useRouter').mockImplementation(() => ({
            query: { clubId: 1 },
        } as unknown as NextRouter))
        render(
            <Provider store={mockStore}>
                <PostCreateContainer postType={PostType.ANNOUNCEMENT}/>
            </Provider>,
        )
        const inputView = screen.getByTestId('post-input-view')
        const additionalFieldsView = screen.getByTestId('post-additional-inputs-view')
        expect(inputView).toBeDefined()
        expect(additionalFieldsView).toBeDefined()
    })
    it('renders post create container: enrollment',  () => {
        jest.spyOn(router, 'useRouter').mockImplementation(() => ({
            query: { clubId: 1 },
        } as unknown as NextRouter))
        render(
            <Provider store={mockStore}>
                <PostCreateContainer postType={PostType.ENROLLMENT}/>
            </Provider>,
        )
        const inputView = screen.getByTestId('post-input-view')
        const additionalFieldsView = screen.getByTestId('post-additional-inputs-view')
        expect(inputView).toBeDefined()
        expect(additionalFieldsView).toBeDefined()
    })

    it('button click test', () => {
        const mockPush = jest.fn()
        jest.spyOn(router, 'useRouter').mockImplementation(() => ({
            query: { clubId: 1 },
            push: mockPush,
        } as unknown as NextRouter))
        render(
            <Provider store={mockStore}>
                <PostCreateContainer postType={PostType.SCHEDULING}/>
            </Provider>,
        )
        const saveButton = screen.getByRole('button')
        fireEvent.click(saveButton)
    })
})
