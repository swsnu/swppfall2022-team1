import { render, screen, waitFor } from '@testing-library/react'

import MyPage from '../mypage'

test('renders MyPage', async () => {
    //jest.spyOn(myPageContainer, 'MyPageContainer').mockImplementation(() => <>container</>)
    render(<MyPage/>)
    const lbl = screen.getByText('유저 프로필')
    await waitFor(() => expect(lbl).toBeDefined())
})
