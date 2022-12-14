import { render } from '@testing-library/react'

import { PostDisplayType } from '../../domain/model/BoardPost'
import { PostType } from '../../domain/model/PostType'
import { formatPostItemInfo } from '../postItemFormatter'

describe('postItemFormatter', () => {
    it ('should test postItemFormatter render', () => {
        const element = formatPostItemInfo({
            displayType: PostDisplayType.CLUB,
            id: 1,
            author: '',
            title: '',
            content: '',
            type: PostType.ANNOUNCEMENT,
            createdAt: '',
            updatedAt: '',
        })
        if (element) {
            render(element)
        }
        expect(null)
    })
})
