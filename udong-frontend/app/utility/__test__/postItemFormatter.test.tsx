import { render } from '@testing-library/react'

import { PostDisplayType } from '../../domain/model/ListItemPost'
import { PostType } from '../../domain/model/PostType'
import { formatPostItemInfo } from '../postItemFormatter'

describe('postItemFormatter', () => {
    it ('should test postItemFormatter render', () => {
        const element = formatPostItemInfo({
            displayType: PostDisplayType.BOARD,
            id: 1,
            author: '',
            title: '',
            content: '',
            type: PostType.ANNOUNCEMENT,
        })
        if (element) {
            render(element)
        }
        expect(null)
    })
})
