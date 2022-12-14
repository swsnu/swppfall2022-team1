import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { QueryClient, QueryClientProvider } from 'react-query'

import { CommentItem } from '../CommentItem'

describe('<CommentItem/>', () => {
    it('renders CommentItem', async () => {
        const onDelete = jest.fn()
        const onSubmit = jest.fn()
        const client = new QueryClient()
        await act(async () => {render(<QueryClientProvider client={client}>
            <CommentItem
                id={1}
                name='name'
                content='content'
                isAuthor
                onClickDelete={onDelete}
                onSubmitEditedComment={onSubmit}
                imageKey=''
            />
        </QueryClientProvider>)})
        const img = screen.getAllByRole('img')[2]
        await waitFor(() => expect(img).toBeInTheDocument())
        await act(async () => {fireEvent.click(img)})
        await waitFor(() => expect(onDelete).toHaveBeenCalled())
    })
    it('renders non author CommentItem', async () => {
        const onDelete = jest.fn()
        const onSubmit = jest.fn()
        const client = new QueryClient()
        await act(async () => {render(<QueryClientProvider client={client}>
            <CommentItem
                id={1}
                name='name'
                content='content'
                onClickDelete={onDelete}
                onSubmitEditedComment={onSubmit}
                imageKey=''
            />
        </QueryClientProvider>)})
        const img = screen.queryAllByRole('img')
        await waitFor(() => expect(img.length).toEqual(1))
    })
})
