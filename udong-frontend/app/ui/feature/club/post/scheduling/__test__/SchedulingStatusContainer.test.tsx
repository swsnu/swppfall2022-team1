import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
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
import { SchedulingStatusContainer } from '../SchedulingStatusContainer'

const schedulingInitialState: SchedulingState = {
    isOpen: false,
    schedulingStatus: {
        type: SchedulingPostType.DATES,
        startTime: 12,
        endTime: 18,
        dates: [
            '2022-11-6',
            '2022-11-9',
            '2022-11-10',
            '2022-11-11',
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

const clubInitialState: ClubState = { myClubs: [], members: [], errors: {} }

const mockStore = configureStore({
    reducer: { club: clubReducer, scheduling: schedulingReducer, user: userReducer },
    preloadedState: {
        scheduling: schedulingInitialState,
        club: clubInitialState,
        user: { me: dummyUserMe, isAdmin: true, errors: {} },
    },
})

jest.mock('next/config', () => () => ({
    publicRuntimeConfig: {
        backendUrl: '',
    },
}))

describe('<SchedulingStatusContainer/>', () => {
    it('renders SchedulingStatusContainer', async () => {
        const mockBack = jest.fn()
        jest.spyOn(router, 'useRouter').mockImplementation(() => ({
            query: { clubId: 1, postId: 1 },
            back: mockBack,
        } as unknown as NextRouter))

        await act(async () => {render(
            <Provider store={mockStore}>
                <SchedulingStatusContainer/>
            </Provider>,
        )})

        const backBtn = screen.getAllByRole('img')[0]
        await waitFor(() => expect(backBtn).toBeInTheDocument())
        await act(async () => {fireEvent.click(backBtn)})
        await waitFor(() => expect(mockBack).toHaveBeenCalledTimes(1))

        const cell = screen.getAllByText('7')[0]
        await waitFor(() => expect(cell).toBeInTheDocument())
        await act(async () => {fireEvent.mouseOver(cell)})
    })
    it('click scheduler', async () => {
        const mockBack = jest.fn()
        jest.spyOn(router, 'useRouter').mockImplementation(() => ({
            query: { clubId: 1, postId: 1 },
            back: mockBack,
        } as unknown as NextRouter))

        await act(async () => {render(
            <Provider store={mockStore}>
                <SchedulingStatusContainer/>
            </Provider>,
        )})

        const cell = screen.getAllByText('7')[0]
        await waitFor(() => expect(cell).toBeInTheDocument())
        await act(async () => {fireEvent.click(cell)})
    })
})
