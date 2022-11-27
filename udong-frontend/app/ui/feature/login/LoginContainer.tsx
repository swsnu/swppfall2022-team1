import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch } from '../../../domain/store'
import { authSelector } from '../../../domain/store/auth/AuthSelector'
import { authActions } from '../../../domain/store/auth/AuthSlice'
import { Spacer } from '../../components/Spacer'
import { VStack } from '../../components/Stack'
import { UdongImage } from '../../components/UdongImage'
import { UdongLoader } from '../../components/UdongLoader'
import login from '../../icons/IcGoogleLogin.png'
import logo from '../../icons/IcLogo.png'

export const LoginContainer = () => {
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()
    const { data: session, status } = useSession()
    const { accessToken = '', user } = session ?? {}
    const isLoggedIn = useSelector(authSelector.isLoggedIn)

    useEffect(() => {
        if (status === 'authenticated') {
            if (user && accessToken && user.email && user.name) {
                dispatch(authActions.login({ email: user.email, token: accessToken, name: user.name }))
            }
        }
    }, [status]) // eslint-disable-line

    useEffect(() => {
        if (isLoggedIn) {
            router.push('/')
        }
    }, [isLoggedIn]) // eslint-disable-line

    // TODO: 이미 로그인 되어있으면 백엔드 요청 X

    if (status === 'unauthenticated') {
        return <VStack
            alignItems={'center'}
            justifyContent={'center'}
            height={'90vh'}
        >
            <UdongImage
                src={logo.src}
                height={339}
                width={327}
            />
            <Spacer height={50}/>
            <UdongImage
                src={login.src}
                height={80}
                width={300}
                onClick={() => signIn('google', { redirect: false })}
            />
        </VStack>
    }

    return <VStack height={'100vh'}>
        <UdongLoader/>
    </VStack>
}
