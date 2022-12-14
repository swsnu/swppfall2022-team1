import { fireEvent, render, screen } from '@testing-library/react'

import { PostEditContainer } from '../PostEditContainer'

jest.mock('../../PostInputView', () => ({
    PostInputView: () => <div data-testid={'post-input-view'}/>,
}))

jest.mock('../../PostAdditionalInputsView', () => ({
    PostAdditionalInputsView: () => <div data-testid={'post-additional-inputs-view'}/>,
}))

describe('<PostEditContainer/>', () => {
    it('renders post edit container',  () => {
        render(<PostEditContainer/>)
        const inputView = screen.getByTestId('post-input-view')
        const additionalFieldsView = screen.getByTestId('post-additional-inputs-view')
        expect(inputView).toBeDefined()
        expect(additionalFieldsView).toBeDefined()
    })

    it('button click test', () => {
        render(<PostEditContainer/>)
        const saveButton = screen.getByRole('button')
        fireEvent.click(saveButton)
        // further implementation required after save api connect
    })
})
