import { render, screen } from '@testing-library/react'

import { ClubMembersView } from '../ClubMembersView'

describe('<ClubMembersView/>', () => {
    it('should render club members view', () => {
        render(<ClubMembersView/>)
        const text = screen.getByText('동아리 인원')
        expect(text).toBeDefined()
    })
})
