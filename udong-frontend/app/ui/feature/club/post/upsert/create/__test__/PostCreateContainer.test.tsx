import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen } from '@testing-library/react'
import * as router from 'next/router'
import { NextRouter } from 'next/router'
import { Provider } from 'react-redux'

import { PostType } from '../../../../../../../domain/model/PostType'
import { postReducer, PostState } from '../../../../../../../domain/store/post/PostSlice'
import { PostCreateContainer } from '../PostCreateContainer'

jest.mock('../../PostInputView', () => ({
    PostInputView: () => <div data-testid={'post-input-view'}/>,
}))

jest.mock('../../PostAdditionalFieldsView', () => ({
    PostAdditionalFieldsView: () => <div data-testid={'post-additional-fields-view'}/>,
}))

const stubPostInitialState: PostState = {
    feedPosts: [],
    clubPosts: [],
    createPostTags: [],
}

const mockStore = configureStore({
    reducer: { post: postReducer },
    preloadedState: { post: stubPostInitialState },
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
        const additionalFieldsView = screen.getByTestId('post-additional-fields-view')
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
        const additionalFieldsView = screen.getByTestId('post-additional-fields-view')
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
