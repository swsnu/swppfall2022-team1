import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

import { PostDetailEnrollmentView } from '../PostDetailEnrollmentView'

describe('<PostDetailEnrollmentView/>', () => {
    it('renders EnrollmentView', async () => {
        await act(async () => {render(<PostDetailEnrollmentView/>)})

        const status = screen.getByText(/현황/)
        await waitFor(() => expect(status).toBeInTheDocument())
        await act(async () => {fireEvent.click(status)})

        const enroll = screen.getByText(/지원하기/)
        await waitFor(() => expect(enroll).toBeInTheDocument())
        await act(async () => {fireEvent.click(enroll)})

        const close = screen.getByText(/마감/)
        await waitFor(() => expect(close).toBeInTheDocument())
        await act(async () => {fireEvent.click(close)})
    })
})
