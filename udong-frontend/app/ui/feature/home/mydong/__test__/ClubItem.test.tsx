import { fireEvent, render, screen } from '@testing-library/react'
import * as router from 'next/router'
import { NextRouter } from 'next/router'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

import { Club } from '../../../../../domain/model/Club'
import { ClubItem } from '../ClubItem'

const dummyClub: Club = {
    id: 1,
    name: '단풍',
    code: '',
    image: '',
}

describe('<ClubItem/>', () => {
    it('renders club item', () => {
        const client = new QueryClient()

        render(
            <QueryClientProvider client={client}>
                <ClubItem
                    imageKey={dummyClub.image ?? ''}
                    club={dummyClub}
                />
            </QueryClientProvider>,
        )
        const text = screen.getAllByText('단풍')
        expect(text).toBeDefined()
    })

    it('navigate', () => {
        const mockPush = jest.fn()
        jest.spyOn(router, 'useRouter').mockImplementation(() => ({
            query: { clubId: 1 },
            push: (url: string) => mockPush(url),
        } as unknown as NextRouter))
        const client = new QueryClient()

        render(
            <QueryClientProvider client={client}>
                <ClubItem
                    imageKey={dummyClub.image ?? ''}
                    club={dummyClub}
                />
            </QueryClientProvider>,
        )
        const text = screen.getByText('단풍')
        fireEvent.click(text)
        expect(mockPush).toHaveBeenCalledWith('/club/1')
    })
})
