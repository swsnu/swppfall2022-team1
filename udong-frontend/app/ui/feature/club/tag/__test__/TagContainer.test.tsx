import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'

import { tagReducer, TagState } from '../../../../../domain/store/tag/TagSlice'
import { TagContainer } from '../TagContainer'

const stubInitialState: TagState = {
    tags: [{
        id: 1,
        name: 'TAG',
    }],
}

const mockStore = configureStore({
    reducer: { tag: tagReducer },
    preloadedState: { tag: stubInitialState },
})

describe('<TagContainer/>', () => {
    const tagContainer: JSX.Element = (
        <Provider store={mockStore}>
            <TagContainer clubId={1}/>
        </Provider>
    )

    it ('render tag container', () => {
        render(tagContainer)
        const component = screen.getByText('태그 추가하기')
        fireEvent.click(component)
        expect(component).toBeDefined()
    })

    it ('should test click tag item', () => {
        render(tagContainer)
        const component = screen.getByText('TAG')
        fireEvent.click(component)
        expect(component).toBeDefined()
    })
})
