import { render, screen, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

import { PostInputView } from '../PostInputView'

jest.mock('../../../../../components/UdongLoader', () => ({
    UdongLoader: () => <div data-testid={'udong-loader'}/>,
}))

describe('<PostInputView />', () => {
    it('should render', async () => {
        await act(async () => {
            render(<PostInputView
                title='title'
                setTitle={jest.fn()}
                contents='contents'
                setContents={jest.fn()}
            />)
        })
        await waitFor(async () => {
            expect(screen.getByText('contents')).toBeInTheDocument()
        })
    })
})
