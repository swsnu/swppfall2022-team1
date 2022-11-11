import { fireEvent, render, screen } from '@testing-library/react'

import { EventInputView } from '../EventInputView'

jest.mock('../../../../../components/UdongText', () => ({
    UdongText: () => <div data-testid={'udong-text'}/>,
}))

test('renders event input view container',   () => {
    let title = 'title'
    render(<EventInputView
        title={title}
        setTitle={str => {title = str}}
    />)
    const text = screen.getByTestId('udong-text')
    expect(text).toBeDefined()
    const input = screen.getAllByPlaceholderText('제목을 입력해주세요')
    fireEvent.change(input[0], { target: { value: 'title2' } })
    expect(title).toBe('title2')
})
