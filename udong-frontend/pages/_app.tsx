import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { Provider } from 'react-redux'

import { store } from '../app/domain/store'
import { VStack } from '../app/ui/components/Stack'
import { Header, HEADER_PAGE } from '../app/ui/feature/header/Header'

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

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter()

    return (
        <SessionProvider session={pageProps.session}>
            <Provider store={store}>
                <VStack>
                    <Header
                        type={findHeaderType(router.pathname)}
                        clubId={1}
                    />
                    <Component {...pageProps} />
                </VStack>
            </Provider>
        </SessionProvider>
    )
}
