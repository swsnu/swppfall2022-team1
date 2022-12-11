import { render, screen } from '@testing-library/react'

import { AdditionalFieldItem } from '../AdditionalFieldItem'

describe('<AdditionalFieldItem />', () => {
    it('should render', () => {
        render(<AdditionalFieldItem
            item={'test'}
            onRemove={() => {return}}
        />)
        expect(screen.getByText('test')).toBeInTheDocument()
    })
})
