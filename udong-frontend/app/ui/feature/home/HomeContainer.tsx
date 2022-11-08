import { useRouter } from 'next/router'
import { useCallback } from 'react'

import { Spacer } from '../../components/Spacer'
import { VStack } from '../../components/Stack'
import { Header, HEADER_PAGE } from '../header/Header'
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
        <VStack>
            <Header type={HEADER_PAGE.MAIN}/>
            <VStack
                paddingHorizontal={50}
                width='100vw'
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
        </VStack>
    )
}
