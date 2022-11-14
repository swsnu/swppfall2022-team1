import { configureStore } from '@reduxjs/toolkit'

import { authReducer } from './auth/AuthSlice'
import { clubReducer } from './club/ClubSlice'
import { postReducer } from './post/PostSlice'
import { userReducer } from './user/UserSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        club: clubReducer,
        post: postReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
