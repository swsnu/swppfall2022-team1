import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { Spacer } from '../../../components/Spacer'
import { HStack, VStack } from '../../../components/Stack'
import { UdongButton } from '../../../components/UdongButton'
import UdongLoader from '../../../components/UdongLoader'
import { UdongSearchBar } from '../../../components/UdongSearchBar'
import { PostItem } from '../../shared/PostItem'
import { ScrollToTopButton } from '../../shared/ScrollToTopButton'

export const BoardContainer = () => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => setLoading(false), 600)

    }, [])

    const router = useRouter()
    return <VStack>
        <HStack justifyContent={'end'}>
            <UdongButton
                style={'line'}
                onClick={() => router.push('/club/1/post/create')}
                width={120}
            >
                글쓰기
            </UdongButton>
        </HStack>
        <Spacer height={20}/>

        <UdongSearchBar/>
        <Spacer height={8}/>

        {loading ? <UdongLoader height={400}/> :
            <VStack>
                <PostItem isClubBoard={true}/>
                <PostItem isClubBoard={true}/>
                <PostItem isClubBoard={true}/>
                <PostItem isClubBoard={true}/>
                {/* 코드 중복 잘 것 같아서 주석 달기*/}
                <PostItem isClubBoard={true}/>
                <PostItem isClubBoard={true}/>
                <PostItem isClubBoard={true}/>
                <PostItem isClubBoard={true}/>
                <ScrollToTopButton/>
            </VStack>
        }
    </VStack>
}
