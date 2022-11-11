import { render, waitFor } from '@testing-library/react'
import * as router from 'next/router'
import { NextRouter } from 'next/router'
import { act } from 'react-dom/test-utils'

import { PostDetailSchedulingView } from '../PostDetailSchedulingView'

jest.mock('../../../../../components/UdongButton', () => ({
    UdongButton: ({ onClick }: { onClick?: () => void }) => {
        onClick?.()
        return <>button</>
    },
}))

describe('<PostDetailSchedulingView/>', () => {
    it('renders SchedulingView', async () => {
        const mockPush = jest.fn()
        jest.spyOn(router, 'useRouter').mockImplementation(() => ({
            push: (url: string) => mockPush(url),
        } as unknown as NextRouter))

        await act(async () => {render(<PostDetailSchedulingView/>)})
        await waitFor(() => expect(mockPush).toHaveBeenCalled())
    })
})
