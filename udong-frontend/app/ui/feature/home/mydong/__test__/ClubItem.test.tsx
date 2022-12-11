import { fireEvent, render, screen } from '@testing-library/react'
import * as router from 'next/router'
import { NextRouter } from 'next/router'
import React from 'react'

import { Club } from '../../../../../domain/model/Club'
import img from '../../../../icons/IcDong.png'
import { ClubItem } from '../ClubItem'

const dummyClub: Club = {
    id: 1,
    name: '단풍',
    code: '',
    image: '',
}

describe('<ClubItem/>', () => {
    it('renders club item', () => {
        render(<ClubItem
            imageSrc={img.src}
            club={dummyClub}
        />)
        const text = screen.getAllByText('단풍')
        expect(text).toBeDefined()
    })

    it('navigate', () => {
        const mockPush = jest.fn()
        jest.spyOn(router, 'useRouter').mockImplementation(() => ({
            query: { clubId: 1 },
            push: (url: string) => mockPush(url),
        } as unknown as NextRouter))

        render(<ClubItem
            imageSrc={img.src}
            club={dummyClub}
        />)
        const text = screen.getByText('단풍')
        fireEvent.click(text)
        expect(mockPush).toHaveBeenCalledWith('/club/1')
    })
})
