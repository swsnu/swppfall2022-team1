import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

import { PostDaySchedule } from '../PostDaySchedule'

describe('<PostDaySchedule />', () => {
    const postDaySchedule: JSX.Element = <PostDaySchedule
        isEdit={false}
        time={{ start: '', end: '' }}
        setTime={() => {return}}
        days={[]}
        setDays={() => {return}}
        date={{ start: '', end: '' }}
        setDate={() =>{return}}
    />
    it('should render', async () => {
        await act(async () => {
            render(postDaySchedule)
        })
        await waitFor(async () => {
            expect(screen.getByText('요일')).toBeInTheDocument()
        })
    })

    it('should clicked', async () => {
        await act(async () => {
            render(postDaySchedule)
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
