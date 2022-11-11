import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

import { PostAdditionalFieldsView } from '../PostAdditionalFieldsView'

describe('<PostAdditionalFieldsView />', () => {
    it('should render', () => {
        render(<PostAdditionalFieldsView isEdit={true} />)
        expect(screen.getAllByText(/교촌 허니콤보 먹고 싶다/)[0]).toBeInTheDocument()
    })

    it('should render', async () => {
        await act(async () => {
            render(<PostAdditionalFieldsView
                isEdit={false}
                showDateTimePicker={true}
            />)
        })
        await waitFor(async () => {
            expect(screen.getAllByText(/요일/)[0]).toBeInTheDocument()
            expect(screen.getByText(/날짜/)).toBeInTheDocument()
            const button1 = screen.getAllByText(/요일/)[0]
            const button2 = screen.getByText(/날짜/)
            fireEvent.click(button1)
            fireEvent.click(button2)
        })
    })
})
