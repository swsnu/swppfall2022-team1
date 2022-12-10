import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

import { PostAdditionalFieldsView } from '../PostAdditionalFieldsView'

describe('<PostAdditionalFieldsView />', () => {
    it('should render', () => {
        render(<PostAdditionalFieldsView
            isEdit={true}
            setScheduling={() => { return }}
        />)
        expect(screen.getByText('태그')).toBeInTheDocument()
    })

    it('should render date time picker', async () => {
        await act(async () => {
            render(<PostAdditionalFieldsView
                isEdit={false}
                showDateTimePicker={true}
                setScheduling={() => { return }}
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
