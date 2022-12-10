import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

import { PostDateSchedule } from '../PostDateSchedule'

describe('<PostDateSchedule />', () => {
    const postDateSchedule: JSX.Element =
        <PostDateSchedule
            isEdit={false}
            time={{ start: '', end: '' }}
            setTime={() => {return}}
            dates={[{ start: '', end: '', id: 1 }]}
            setDates={() => {return}}
        />

    it('should render', async () => {
        await act(async () => {
            render(postDateSchedule)
        })
        await waitFor(async () => {
            expect(screen.getByText('시간')).toBeInTheDocument()
        })
    })

    it('should be clicked', async () => {
        await act(async () => {
            render(postDateSchedule)
        })
        await waitFor(async () => {
            const plus = screen.getAllByRole('img')[4]
            expect(plus).toBeInTheDocument()
            fireEvent.click(plus)
        })
    })
})
