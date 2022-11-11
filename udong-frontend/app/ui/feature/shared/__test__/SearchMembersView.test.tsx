import { fireEvent, render, screen } from '@testing-library/react'

import { SearchMembersView } from '../SearchMembersView'

describe('<SearchMembersView/>', () => {
    it ('should render search members view and hanlde on click', () => {
        render(<SearchMembersView/>)
        const component = screen.getAllByText('이유빈')[0]
        fireEvent.click(component)
        expect(component).toBeDefined()
    })
})
