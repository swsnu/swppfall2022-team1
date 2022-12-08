import { isRejected } from '@reduxjs/toolkit'
import { withAuth } from 'next-auth/middleware'
import { signOut } from 'next-auth/react'
import { Middleware, MiddlewareAPI } from 'redux'

import { AppDispatch, RootState } from './app/domain/store'
import { authActions } from './app/domain/store/auth/AuthSlice'

export default withAuth({
    callbacks: {
        authorized: async ({ req, token }) => {
            const pathname = req.nextUrl.pathname

            if (pathname.startsWith('/_next') || pathname === '/favicon.ico')
            {return true}

            if (token) {return true}

            return false
        },
    },
    pages: {
        signIn: '/login',
    },
})

export const authMiddleware: Middleware =
    (store: MiddlewareAPI<AppDispatch, RootState>) => (next) => (action) => {
        if (isRejected(action)){
            if (action.error.name === 'AxiosError' && action.error.message.includes('401')){
                signOut({ redirect: false })
                store.dispatch(authActions.authExpired())
            }
        }
        return next(action)
    }
