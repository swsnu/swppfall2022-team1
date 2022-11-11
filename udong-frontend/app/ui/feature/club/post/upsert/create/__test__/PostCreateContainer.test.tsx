import { fireEvent, render, screen } from '@testing-library/react'
import * as router from 'next/router'
import { NextRouter } from 'next/router'

import { PostCreateContainer } from '../PostCreateContainer'

jest.mock('../../PostInputView', () => ({
    PostInputView: () => <div data-testid={'post-input-view'}/>,
}))

jest.mock('../../PostAdditionalFieldsView', () => ({
    PostAdditionalFieldsView: () => <div data-testid={'post-additional-fields-view'}/>,
}))

describe('<PostCreateContainer/>', () => {
    it('renders post create container: announcement',  () => {
        render(<PostCreateContainer postType={'announcement'}/>)
        const inputView = screen.getByTestId('post-input-view')
        const additionalFieldsView = screen.getByTestId('post-additional-fields-view')
        expect(inputView).toBeDefined()
        expect(additionalFieldsView).toBeDefined()
    })
    it('renders post create container: enrollment',  () => {
        render(<PostCreateContainer postType={'enrollment'}/>)
        const inputView = screen.getByTestId('post-input-view')
        const additionalFieldsView = screen.getByTestId('post-additional-fields-view')
        expect(inputView).toBeDefined()
        expect(additionalFieldsView).toBeDefined()
    })

    it('button click test', () => {
        const mockPush = jest.fn()
        jest.spyOn(router, 'useRouter').mockImplementation(() => ({
            push: mockPush,
        } as unknown as NextRouter))
        render(<PostCreateContainer postType={'scheduling'}/>)
        const saveButton = screen.getByRole('button')
        fireEvent.click(saveButton)
        expect(mockPush).toHaveBeenCalledWith('/club/1/post/1?type=scheduling')
    })
})
