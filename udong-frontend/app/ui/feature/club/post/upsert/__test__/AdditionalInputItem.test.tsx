import { render, screen } from '@testing-library/react'

import { AdditionalInputItem } from '../AdditionalInputItem'

describe('<AdditionalInputItem />', () => {
    it('should render', () => {
        render(<AdditionalInputItem
            item={'test'}
            onRemove={() => {return}}
        />)
        expect(screen.getByText('test')).toBeInTheDocument()
    })
})
