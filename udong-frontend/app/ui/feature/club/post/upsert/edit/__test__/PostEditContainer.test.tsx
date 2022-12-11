import { fireEvent, render, screen } from '@testing-library/react'

import { PostType } from '../../../../../../../domain/model/PostType'
import { PostEditContainer } from '../PostEditContainer'

jest.mock('../../PostInputView', () => ({
    PostInputView: () => <div data-testid={'post-input-view'}/>,
}))

jest.mock('../../PostAdditionalInputsView', () => ({
    PostAdditionalFieldsView: () => <div data-testid={'post-additional-fields-view'}/>,
}))

describe('<PostEditContainer/>', () => {
    it('renders post edit container',  () => {
        render(<PostEditContainer postType={PostType.ANNOUNCEMENT}/>)
        const inputView = screen.getByTestId('post-input-view')
        const additionalFieldsView = screen.getByTestId('post-additional-fields-view')
        expect(inputView).toBeDefined()
        expect(additionalFieldsView).toBeDefined()
    })

    it('button click test', () => {
        render(<PostEditContainer postType={PostType.SCHEDULING}/>)
        const saveButton = screen.getByRole('button')
        fireEvent.click(saveButton)
        // further implementation required after save api connect
    })
})
