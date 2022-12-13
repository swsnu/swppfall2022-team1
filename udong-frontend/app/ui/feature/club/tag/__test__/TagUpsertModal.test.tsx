import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'

import { Tag } from '../../../../../domain/model/Tag'
import { clubReducer, ClubState } from '../../../../../domain/store/club/ClubSlice'
import { tagReducer, TagState } from '../../../../../domain/store/tag/TagSlice'
import { TagUpsertModal } from '../TagUpsertModal'

const dummyTag: Tag = { id: 1, name: 'TAG', createdAt: '', updatedAt: '', users: [], isDefault: false }

const stubTagInitialState: TagState = {
    tags: [],
    createPostTags: [],
    errors: {},
    selectedUserIds: [],
}

const stubClubInitialState: ClubState = {
    myClubs: [],
    members: [],
    errors: {},
}

const mockStore = configureStore({
    reducer: { club: clubReducer, tag: tagReducer },
    preloadedState: { club: stubClubInitialState, tag: stubTagInitialState },
})

describe('<TagUpsertModal/>', () => {
    it('should render tag upsert modal', () => {
        render(
            <Provider store={mockStore}>
                <TagUpsertModal
                    isOpen={true}
                    setIsOpen={() => {return}}
                    clubId={1}
                    tag={dummyTag}
                    confirmEditTag={() => {return}}
                />
            </Provider>,
        )
        const text = screen.getByText('TAG')
        expect(text).toBeDefined()
    })

    it ('should test on click close', () => {
        render(
            <Provider store={mockStore}>
                <TagUpsertModal
                    isOpen={true}
                    setIsOpen={() => {return}}
                    clubId={1}
                    tag={dummyTag}
                    confirmEditTag={() => {return}}
                />
            </Provider>,
        )
        const component = screen.getAllByRole('img')[0]
        fireEvent.click(component)
        expect(component).toBeDefined()
    })

    it ('should test on click save', () => {
        render(
            <Provider store={mockStore}>
                <TagUpsertModal
                    isOpen={true}
                    setIsOpen={() => {return}}
                    clubId={1}
                    tag={dummyTag}
                    confirmEditTag={() => {return}}
                />
            </Provider>,
        )
        const component = screen.getByText('저장하기')
        fireEvent.click(component)
        expect(component).toBeDefined()
    })
})
