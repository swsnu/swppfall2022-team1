import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { Provider } from 'react-redux'

import { enrollmentReducer, EnrollmentState } from '../../../../../../domain/store/post/enrollment/EnrollmentSlice'
import { PostDetailEnrollmentView } from '../PostDetailEnrollmentView'

const stubEnrollmentInitialState: EnrollmentState = {
}

const mockStore = configureStore({
    reducer: { enrollment: enrollmentReducer },
    preloadedState: { enrollment: stubEnrollmentInitialState },
})

jest.mock('next/config', () => () => ({
    publicRuntimeConfig: {
        backendUrl: '',
    },
}))

describe('<PostDetailEnrollmentView/>', () => {
    it('renders EnrollmentView', async () => {
        await act(async () => {
            render(
                <Provider store={mockStore}>
                    <PostDetailEnrollmentView
                        clubId={1}
                        postId={2}
                        isOpen={true}
                    />
                </Provider>,
            )
        })

        const status = screen.getByText(/현황 보기/)
        await waitFor(() => expect(status).toBeInTheDocument())
        fireEvent.click(status)

        const enroll = screen.getByText(/지원하기/)
        await waitFor(() => expect(enroll).toBeInTheDocument())
        fireEvent.click(enroll)

        const close = screen.getByText(/마감하기/)
        await waitFor(() => expect(close).toBeInTheDocument())
        fireEvent.click(close)
    })
})
