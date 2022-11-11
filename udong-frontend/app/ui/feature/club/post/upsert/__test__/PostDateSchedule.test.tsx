import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

import { PostDateSchedule } from '../PostDateSchedule'

describe('<PostDateSchedule />', () => {
    it('should render', async () => {
        await act(async () => {
            render(<PostDateSchedule isEdit={true} />)
        })
        await waitFor(async () => {
            expect(screen.getByText('시간')).toBeInTheDocument()
        })
    })

    it('should be clicked', async () => {
        await act(async () => {
            render(<PostDateSchedule isEdit={false} />)
        })
        await waitFor(async () => {
            const plus = screen.getAllByRole('img')[4]
            expect(plus).toBeInTheDocument()
            fireEvent.click(plus)
        }) 
        await waitFor(async () => {
            const close = screen.getAllByRole('img')[6]
            expect(close).toBeInTheDocument()
            fireEvent.click(close)
        })
    })
})
