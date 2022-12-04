import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

import { CommentItem } from '../CommentItem'

describe('<CommentItem/>', () => {
    it('renders CommentItem', async () => {
        const onDelete = jest.fn()
        const onSubmit = jest.fn()
        await act(async () => {render(<CommentItem
            id={1}
            name='name'
            content='content'
            isAuthor
            onClickDelete={onDelete}
            onSubmitEditedComment={onSubmit}
        />)})
        const img = screen.getAllByRole('img')[1]
        await waitFor(() => expect(img).toBeInTheDocument())
        await act(async () => {fireEvent.click(img)})
        await waitFor(() => expect(onDelete).toHaveBeenCalled())
    })
    it('renders non author CommentItem', async () => {
        const onDelete = jest.fn()
        const onSubmit = jest.fn()
        await act(async () => {render(<CommentItem
            id={1}
            name='name'
            content='content'
            onClickDelete={onDelete}
            onSubmitEditedComment={onSubmit}
        />)})
        const img = screen.queryAllByRole('img')
        await waitFor(() => expect(img.length).toEqual(0))
    })
})
