import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

import { CommentItem } from '../CommentItem'

describe('<CommentItem/>', () => {
    it('renders CommentItem', async () => {
        const showModal = jest.fn()
        await act(async () => {render(<CommentItem
            name='name'
            content='content'
            isAuthor
            showDeleteModal={showModal}
        />)})
        const img = screen.getAllByRole('img')[1]
        await waitFor(() => expect(img).toBeInTheDocument())
        await act(async () => {fireEvent.click(img)})
        await waitFor(() => expect(showModal).toHaveBeenCalled())
    })
    it('renders non author CommentItem', async () => {
        const showModal = jest.fn()
        await act(async () => {render(<CommentItem
            name='name'
            content='content'
            showDeleteModal={showModal}
        />)})
        const img = screen.queryAllByRole('img')
        await waitFor(() => expect(img.length).toEqual(0))
    })
})
