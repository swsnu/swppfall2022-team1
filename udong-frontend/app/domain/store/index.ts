import { configureStore } from '@reduxjs/toolkit'

import { authReducer } from './auth/AuthSlice'
import { clubReducer } from './club/ClubSlice'
import { commentReducer } from './comment/CommentSlice'
import { eventReducer } from './event/EventSlice'
import { enrollmentReducer } from './post/enrollment/EnrollmentSlice'
import { postReducer } from './post/PostSlice'
import { schedulingReducer } from './post/scheduling/SchedulingSlice'
import { tagReducer } from './tag/TagSlice'
import { userReducer } from './user/UserSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        club: clubReducer,
        post: postReducer,
        comment: commentReducer,
        enrollment: enrollmentReducer,
        scheduling: schedulingReducer,
        event: eventReducer,
        tag: tagReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
