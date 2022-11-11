import { render } from '@testing-library/react'

import { AdditionalFieldItem } from '../AdditionalFieldItem'

describe('<AdditionalFieldItem />', () => {
    it('should render', () => {
        render(<AdditionalFieldItem item={'test'} />)
    })
})
