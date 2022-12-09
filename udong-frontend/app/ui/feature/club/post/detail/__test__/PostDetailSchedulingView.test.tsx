import { configureStore } from '@reduxjs/toolkit'
import { render, waitFor } from '@testing-library/react'
import * as router from 'next/router'
import { NextRouter } from 'next/router'
import { act } from 'react-dom/test-utils'
import { Provider } from 'react-redux'

import { SchedulingPostType } from '../../../../../../domain/model/SchedulingPostType'
import { dummyUserMe } from '../../../../../../domain/model/User'
import { clubReducer, ClubState } from '../../../../../../domain/store/club/ClubSlice'
import { schedulingReducer, SchedulingState } from '../../../../../../domain/store/post/scheduling/SchedulingSlice'
import { userReducer } from '../../../../../../domain/store/user/UserSlice'
import { new2dArray } from '../../../../../../utility/functions'
import { PostDetailSchedulingView } from '../PostDetailSchedulingView'

jest.mock('../../../../../components/UdongButton', () => ({
    UdongButton: ({ onClick }: { onClick?: () => void }) => {
        onClick?.()
        return <>button</>
    },
}))

const schedulingInitialState: SchedulingState = {
    isOpen: false,
    schedulingStatus: {
        type: SchedulingPostType.DAYS,
        startTime: 12,
        endTime: 18,
        dates: [
            new Date(2022, 11, 6),
            new Date(2022, 11, 9),
            new Date(2022, 11, 10),
            new Date(2022, 11, 11),
        ],
        confirmedTime: null,
        closed: false,
        availableTime: [
            {
                id: 1,
                user: { id: 1, name: 'user1', email: 'email1', imageUrl: '', timeTable: new2dArray(7, 48, false) },
                time: [
                    [true, true, true, true, true, true],
                    [true, true, false, false, true, false],
                    [true, true, false, false, true, false],
                    [false, false, false, false, false, false],
                ],
            },
        ],
    },
}

const clubInitialState: ClubState = { myClubs: [], members: [] }

const mockStore = configureStore({
    reducer: { club: clubReducer, scheduling: schedulingReducer, user: userReducer },
    preloadedState: {
        scheduling: schedulingInitialState,
        club: clubInitialState,
        user: { me: dummyUserMe },
    },
})

describe('<PostDetailSchedulingView/>', () => {
    it('renders SchedulingView', async () => {
        const mockPush = jest.fn()
        jest.spyOn(router, 'useRouter').mockImplementation(() => ({
            push: (url: string) => mockPush(url),
            query: {
                clubId: 1,
                postId: 1,
            },
        } as unknown as NextRouter))

        await act(async () => {render(
            <Provider store={mockStore}>
                <PostDetailSchedulingView/>
            </Provider>,
        )})
        await waitFor(() => expect(mockPush).toHaveBeenCalled())
    })
})
