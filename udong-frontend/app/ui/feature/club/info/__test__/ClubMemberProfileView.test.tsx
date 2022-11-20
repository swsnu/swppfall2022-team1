import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'

import { dummyUserNotMe } from '../../../../../domain/model/User'
import { clubReducer, ClubState } from '../../../../../domain/store/club/ClubSlice'
import { userReducer, UserState } from '../../../../../domain/store/user/UserSlice'
import { ClubMemberProfileView } from '../ClubMemberProfileView'

const stubClubInitialState: ClubState = {
    myClubs: [],
    members: [],
}

const stubUserInitialState: UserState = {
    selectedUser: dummyUserNotMe,
}

const mockStore = configureStore({
    reducer: { club: clubReducer, user: userReducer },
    preloadedState: { club: stubClubInitialState, user: stubUserInitialState },
})

describe('<ClubMemberProfileView/>', () => {
    const regularMember: JSX.Element = (
        <Provider store={mockStore}>
            <ClubMemberProfileView
                isOpen={true}
                setIsOpen={() => {return}}
                memberId={dummyUserNotMe.id}
                isAdmin={false}
            />)
        </Provider>
    )

    const adminMember: JSX.Element = (
        <Provider store={mockStore}>
            <ClubMemberProfileView
                isOpen={true}
                setIsOpen={() => {return}}
                memberId={dummyUserNotMe.id}
                isAdmin={true}
            />)
        </Provider>
    )

    it('should render club member profile view', () => {
        render(adminMember)
        const text = screen.getByText(dummyUserNotMe.name)
        expect(text).toBeDefined()
    })

    it('should test on click 일반 멤버', () => {
        render(adminMember)
        const text = screen.getByText('일반 멤버로 전환')
        fireEvent.click(text)
        expect(text).toBeDefined()
    })

    it('should test on click 관리자로 전환', () => {
        render(regularMember)
        const text = screen.getByText('관리자로 전환')
        fireEvent.click(text)
        expect(text).toBeDefined()
    })

    it('should test on click 내보내기', () => {
        render(regularMember)
        const text = screen.getByText('내보내기')
        fireEvent.click(text)
        expect(text).toBeDefined()
    })

    it('should test on click close', () => {
        render(regularMember)
        const component = screen.getAllByRole('img')[0]
        fireEvent.click(component)
        expect(component).toBeDefined()
    })
})
