import '../styles/globals.css'
import { SessionProvider, signOut } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'

import { store } from '../app/domain/store'
import { authActions } from '../app/domain/store/auth/AuthSlice'
import { axiosConfig } from '../app/infra/global'
import { VStack } from '../app/ui/components/Stack'
import { Header, HEADER_PAGE } from '../app/ui/feature/header/Header'

axiosConfig.interceptors.response.use(
    function (response){
        return response
    },
    function (error) {
        if (error.response && error.response.status){
            if (error.response.status === 401){
                signOut({ redirect: false })
                store.dispatch(authActions.authExpired())
            }
        }
        return Promise.reject(error)
    },
)

const findHeaderType = (url: string) => {
    switch (url) {
        case '/login':
            return HEADER_PAGE.NONE
        case '/':
            return HEADER_PAGE.MAIN
        case '/mypage':
            return HEADER_PAGE.MY_PAGE
        default:
            if (url.slice(0, 14) === '/club/[clubId]') {return HEADER_PAGE.CLUB}
            else {return HEADER_PAGE.NONE}
    }
}

const findHeaderClubId = (url: string) => {
    const m = url.match(/^[/]club[/](\d+).*/)
    return m ? parseInt(m[1]) : 0
}

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter()
    const client = useMemo(() => { return new QueryClient() }, [])

    return (
        <QueryClientProvider client={client}>
            <SessionProvider session={pageProps.session}>
                <Provider store={store}>
                    <VStack>
                        <Toaster/>
                        <Header
                            type={findHeaderType(router.pathname)}
                            clubId={findHeaderClubId(router.pathname)}
                        />
                        <Component {...pageProps} />
                    </VStack>
                </Provider>
            </SessionProvider>
        </QueryClientProvider>
    )
}
