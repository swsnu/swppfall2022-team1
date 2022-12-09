import { fireEvent, render, screen } from '@testing-library/react'

import { UserListModal } from '../UserListModal'

describe('<UserListModal/>', () => {
    it ('should render user list modal', () => {
        render(<UserListModal
            users={[]}
            isOpen={true}
            setIsOpen={() => {return}}
            title={'USER'}
        />)
        const component = screen.getAllByRole('img')[0]
        fireEvent.click(component)
        expect(component).toBeDefined()
    })
})
