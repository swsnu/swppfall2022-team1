import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import * as router from 'next/router'
import { NextRouter } from 'next/router'
import { act } from 'react-dom/test-utils'
import toast from 'react-hot-toast'
import { Provider } from 'react-redux'

import { ClubEvent } from '../../../../../../../domain/model/ClubEvent'
import { SchedulingPostType } from '../../../../../../../domain/model/SchedulingPostType'
import { dummyUserMe } from '../../../../../../../domain/model/User'
import { eventReducer, EventState } from '../../../../../../../domain/store/event/EventSlice'
import { userReducer, UserState } from '../../../../../../../domain/store/user/UserSlice'
import { EventEditContainer } from '../EventEditContainer'

const dummyEvent1: ClubEvent = {
    id: 1,
    name: 'event1',
    times: [{ startTime: 3, endTime: 14, type: SchedulingPostType.DAYS, repeatStart: '2022-12-01', repeatEnd: '2023-12-01', weekday: 4 }],
    createdAt: '',
    updatedAt: '',
}

const dummyEvent2: ClubEvent = {
    id: 1,
    name: 'event2',
    times: [{ startTime: 3, endTime: 14, type: SchedulingPostType.DATES, startDate: '2022-12-01', endDate: '2022-12-25' }],
    createdAt: '',
    updatedAt: '',
}

const stubEventInitialState: EventState = {
    selectedEvent: dummyEvent1,
    events: [],
    errors: {},
}

const stubEventInitialState2: EventState = {
    selectedEvent: dummyEvent2,
    events: [],
    errors: {},
}

const stubUserInitialState: UserState = {
    isAdmin: true,
    selectedUser: dummyUserMe,
    me: dummyUserMe,
    errors: {},
}

const mockStore = configureStore({
    reducer: { event: eventReducer, user: userReducer },
    preloadedState: { event: stubEventInitialState, user: stubUserInitialState },
})

const mockStore2 = configureStore({
    reducer: { event: eventReducer, user: userReducer },
    preloadedState: { event: stubEventInitialState2, user: stubUserInitialState },
})

describe('<EventEditContainer/>', () => {
    const eventEditContainer: JSX.Element = (
        <Provider store={mockStore}>
            <EventEditContainer/>
        </Provider>
    )

    it('renders event edit container',  async () => {
        jest.spyOn(router, 'useRouter').mockImplementation(() => ({
            query: ({ clubId: 1, eventId: 1 }),
        } as unknown as NextRouter))
        await act(async () => {render(
            eventEditContainer,
        )})
        const editText = screen.getByText('행사 수정하기')
        expect(editText).toBeDefined()
    })

    it('button click test', async () => {
        jest.spyOn(router, 'useRouter').mockImplementation(() => ({
            query: ({ clubId: 1, eventId: 1 }),
        } as unknown as NextRouter))
        await act(async () => {render(
            eventEditContainer,
        )})
        const saveButtons = screen.getAllByText('저장하기')
        fireEvent.click(saveButtons[0])
    })

    it('empty title', async () => {
        jest.spyOn(router, 'useRouter').mockImplementation(() => ({
            query: ({ clubId: 1, eventId: 1 }),
        } as unknown as NextRouter))
        const mockToast = jest.fn()
        jest.spyOn(toast, 'error').mockImplementation((str)=> mockToast(str))
        await act(async () => {render(
            eventEditContainer,
        )})
        const input = screen.getAllByPlaceholderText('제목을 입력해주세요')
        fireEvent.change(input[0], { target: { value: '' } })
        const saveButtons = screen.getAllByText('저장하기')
        fireEvent.click(saveButtons[0])
        await waitFor(async () => expect(mockToast).toHaveBeenCalledWith('행사 이름을 입력해주세요'))
    })

    it('save days event', async () => {
        jest.spyOn(router, 'useRouter').mockImplementation(() => ({
            query: ({ clubId: 1, eventId: 1 }),
        } as unknown as NextRouter))
        const mockToast = jest.fn()
        jest.spyOn(toast, 'loading').mockImplementation(str=>mockToast(str))
        jest.spyOn(toast, 'success').mockImplementation(jest.fn())
        await act(async () => {render(
            eventEditContainer,
        )})
        const input = screen.getAllByPlaceholderText('제목을 입력해주세요')
        fireEvent.change(input[0], { target: { value: 'new title' } })
        const saveButtons = screen.getAllByText('저장하기')
        fireEvent.click(saveButtons[0])
        await waitFor(async () => expect(mockToast).toHaveBeenCalledWith('저장중입니다.'))
    })

    it('save not assigned event',  async () => {
        jest.spyOn(router, 'useRouter').mockImplementation(() => ({
            query: ({ clubId: 1, eventId: 1 }),
        } as unknown as NextRouter))
        const mockToast = jest.fn()
        jest.spyOn(toast, 'loading').mockImplementation(str=>mockToast(str))
        jest.spyOn(toast, 'success').mockImplementation(jest.fn())
        await act(async () => {render(
            eventEditContainer,
        )})
        const input = screen.getAllByPlaceholderText('제목을 입력해주세요')
        fireEvent.change(input[0], { target: { value: 'new title' } })
        const radiobuttons = screen.getAllByRole('radio')
        fireEvent.click(radiobuttons[2])
        const saveButtons = screen.getAllByText('저장하기')
        fireEvent.click(saveButtons[0])
        await waitFor(async () => expect(mockToast).toHaveBeenCalledWith('저장중입니다.'))
    })

    it('save dates event', async () => {
        const mockToast = jest.fn()
        jest.spyOn(router, 'useRouter').mockImplementation(() => ({
            query: ({ clubId: 1, eventId: 2 }),
        } as unknown as NextRouter))
        jest.spyOn(toast, 'loading').mockImplementation(mockToast)
        jest.spyOn(toast, 'success').mockImplementation(jest.fn())
        await act(async () => {render(
            <Provider store={mockStore2}>
                <EventEditContainer/>
            </Provider>,
        )})
        render(eventEditContainer)
        const input = screen.getAllByPlaceholderText('제목을 입력해주세요')
        fireEvent.change(input[0], { target: { value: 'new title' } })
        const saveButtons = screen.getAllByText('저장하기')
        fireEvent.click(saveButtons[0])
        await waitFor(async () => expect(mockToast).toHaveBeenCalledWith('저장중입니다.'))
    })
})
