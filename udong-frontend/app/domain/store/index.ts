import { configureStore } from '@reduxjs/toolkit'

import { authReducer } from './auth/AuthSlice'
import { clubReducer } from './club/ClubSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        club: clubReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
