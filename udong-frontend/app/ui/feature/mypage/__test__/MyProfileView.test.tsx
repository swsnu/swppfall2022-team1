
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

import { MyProfileView } from '../MyProfileView'

test('renders MyPage', async () => {
    await act(async () => {render(<MyProfileView/>)})
    const quit = screen.getByText(/탈퇴하기/)
    await waitFor(() => expect(quit).toBeInTheDocument)
    fireEvent.click(quit)
})
