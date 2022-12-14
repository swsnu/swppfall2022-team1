import { useRouter } from 'next/router'
import { useCallback } from 'react'

import { Spacer } from '../../components/Spacer'
import { HStack, VStack } from '../../components/Stack'
import { FeedContainer } from './feed/FeedContainer'
import { HomeTabType, HomeTabView } from './HomeTabView'
import { MyDongContainer } from './mydong/MyDongContainer'

interface HomeContainerProps {
    tab: HomeTabType
}

export const HomeContainer = (props: HomeContainerProps) => {
    const { tab } = props
    const router = useRouter()

    const handleCurrentTab = useCallback((selectedTab: HomeTabType) => {
        router.replace(`/?tab=${selectedTab}`)
    }, [router])

    return (
        <HStack justifyContent={'center'}>
            <VStack
                width='1000px'
            >
                <HomeTabView
                    selectedTab={tab}
                    setSelectedTab={handleCurrentTab}
                />
                <Spacer height={45}/>
                {tab === 'feed' ?
                    <FeedContainer/>
                    :
                    <MyDongContainer/>
                }
            </VStack>
        </HStack>
    )
}
