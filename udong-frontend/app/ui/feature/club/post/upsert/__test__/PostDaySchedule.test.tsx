import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

import { PostDaySchedule } from '../PostDaySchedule'

describe('<PostDaySchedule />', () => {
    it('should render', async () => {
        await act(async () => {
            render(<PostDaySchedule isEdit={true} />)
        })
        await waitFor(async () => {
            expect(screen.getByText('요일')).toBeInTheDocument()
        })
    })

    it('should clicked', async () => {
        await act(async () => {
            render(<PostDaySchedule isEdit={false} />)
        })
        await waitFor(async () => {
            const button = screen.getByText('일')
            expect(button).toBeInTheDocument()
            fireEvent.click(button)
        })
        await waitFor(async () => {
            const button = screen.getByText('일')
            expect(button).toBeInTheDocument()
            fireEvent.click(button)
        })
    })
})
