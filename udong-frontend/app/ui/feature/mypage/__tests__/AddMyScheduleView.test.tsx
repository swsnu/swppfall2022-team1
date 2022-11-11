import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

import { AddMyScheduleView } from '../AddMyScheduleView'

test('renders MyPage', async () => {
    // eslint-disable-next-line no-console
    console.log = jest.fn()
    await act(async () => {render(<AddMyScheduleView/>)})
    const btn = screen.getByText(/저장하기/)
    await waitFor(() => expect(btn).toBeInTheDocument)
    fireEvent.click(btn)
    // eslint-disable-next-line no-console
    await waitFor(() => expect(console.log).toHaveBeenCalled())
})
