import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import { Spacer } from '../../components/Spacer'
import { VStack } from '../../components/Stack'
import { UdongImage } from '../../components/UdongImage'
import { UdongLoader } from '../../components/UdongLoader'
import login from '../../icons/IcGoogleLogin.png'
import logo from '../../icons/IcLogo.png'

export const LoginContainer = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data: session, status } = useSession()
    const router = useRouter()

    if (status === 'authenticated') {
        router.push('/')
    }

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
                onClick={() => signIn('google', { callbackUrl: '/' })}
            />
        </VStack>
    }

    return <UdongLoader/>
}
