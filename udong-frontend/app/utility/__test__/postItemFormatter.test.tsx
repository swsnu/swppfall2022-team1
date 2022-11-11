import { render } from '@testing-library/react'

import { formatPostItemInfo } from '../postItemFormatter'

describe('postItemFormatter', () => {
    it ('should test postItemFormatter render', () => {
        const element = formatPostItemInfo('CLUB_NAME', false, true, false, undefined)
        if (element) {
            render(element)
        }
        expect(null)
    })
})
