import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import * as router from 'next/router'
import { NextRouter } from 'next/router'
import { act } from 'react-dom/test-utils'
import { Provider } from 'react-redux'

import { SchedulingPostType } from '../../../../../../domain/model/SchedulingPostType'
import { clubReducer, ClubState } from '../../../../../../domain/store/club/ClubSlice'
import { schedulingReducer, SchedulingState } from '../../../../../../domain/store/post/scheduling/SchedulingSlice'
import { userReducer } from '../../../../../../domain/store/user/UserSlice'
import { new2dArray } from '../../../../../../utility/functions'
import { SchedulingCloseContainer } from '../SchedulingCloseContainer'

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
    },
})
describe('<SchedulingCloseContainer/>', () => {
    it('renders SchedulingCloseContainer', async () => {
        const mockBack = jest.fn()
        jest.spyOn(router, 'useRouter').mockImplementation(() => ({
            query: { clubId: 1, postId: 1 },
            back: mockBack,
        } as unknown as NextRouter))

        await act(async () => {
            render(
                <Provider store={mockStore}>
                    <SchedulingCloseContainer/>
                </Provider>,
            )
        })

        const backBtn = screen.getAllByRole('img')[0]
        await waitFor(() => expect(backBtn).toBeInTheDocument())
        await act(async () => {fireEvent.click(backBtn)})
        await waitFor(() => expect(mockBack).toHaveBeenCalledTimes(1))

        const closeBtn = screen.getByText(/마감하기/)
        await waitFor(() => expect(closeBtn).toBeInTheDocument())
        await act(async () => {fireEvent.click(closeBtn)})

        const cell = screen.getAllByText('7')[0]
        await waitFor(() => expect(cell).toBeInTheDocument())
        await act(async () => {fireEvent.mouseOver(cell)})

    })
})
