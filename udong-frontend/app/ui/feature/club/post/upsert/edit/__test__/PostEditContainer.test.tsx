import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen } from '@testing-library/react'
import * as router from 'next/router'
import { NextRouter } from 'next/router'
import { Provider } from 'react-redux'

import { PostDisplayType } from '../../../../../../../domain/model/BoardPost'
import { PostType } from '../../../../../../../domain/model/PostType'
import { eventReducer, EventState } from '../../../../../../../domain/store/event/EventSlice'
import { postReducer, PostState } from '../../../../../../../domain/store/post/PostSlice'
import { tagReducer, TagState } from '../../../../../../../domain/store/tag/TagSlice'
import { PostEditContainer } from '../PostEditContainer'

jest.mock('../../PostInputView', () => ({
    PostInputView: () => <div data-testid={'post-input-view'}/>,
}))

jest.mock('../../PostAdditionalInputsView', () => ({
    PostAdditionalInputsView: () => <div data-testid={'post-additional-inputs-view'}/>,
}))

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

const stubPostInitialState: PostState = {
    feedPosts: [],
    errors: {},
    clubPosts: [],
    eventPosts: [],
    selectedPost: { id: 1, title: '', updatedAt: '', content: '', createdAt: '',
        type: PostType.ANNOUNCEMENT, displayType: PostDisplayType.CLUB },
}

const stubTagInitialState: TagState = {
    tags: [],
    createPostTags: [],
    errors: {},
    selectedUserIds: [],
}

const mockStore = configureStore({
    reducer: { post: postReducer, tag: tagReducer, event: eventReducer },
    preloadedState: { post: stubPostInitialState, tag: stubTagInitialState, event: stubEventInitialState },
})

describe('<PostEditContainer/>', () => {
    it('renders post edit container',  () => {
        jest.spyOn(router, 'useRouter').mockImplementation(() => ({
            query: {
                clubId: 1,
                postId: 1,
            },
        } as unknown as NextRouter))
        render(
            <Provider store={mockStore}>
                <PostEditContainer/>
            </Provider>,
        )
        const inputView = screen.getByTestId('post-input-view')
        const additionalFieldsView = screen.getByTestId('post-additional-inputs-view')
        expect(inputView).toBeDefined()
        expect(additionalFieldsView).toBeDefined()
    })

    it('button click test', () => {
        jest.spyOn(router, 'useRouter').mockImplementation(() => ({
            query: {
                clubId: 1,
                postId: 1,
            },
        } as unknown as NextRouter))
        render(
            <Provider store={mockStore}>
                <PostEditContainer/>
            </Provider>,
        )
        const saveButton = screen.getByRole('button')
        fireEvent.click(saveButton)
        // further implementation required after save api connect
    })
})
