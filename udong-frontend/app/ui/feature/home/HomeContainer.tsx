import { useRouter } from 'next/router'
import { useCallback } from 'react'

import { Spacer } from '../../components/Spacer'
import { VStack } from '../../components/Stack'
import { FeedView } from './feed/FeedView'
import { HomeTabType, HomeTabView } from './HomeTabView'
import { MyDongView } from './mydong/MyDongView'

interface HomeContainerProps {
    tab: HomeTabType
}

export const HomeContainer = (props: HomeContainerProps) => {
    const { tab } = props
    const router = useRouter()

    const handleCurrentTab = useCallback((selectedTab: HomeTabType) => {
        router.replace(`/?tab=${selectedTab}`)
    }, [])

    return (
        <VStack paddingHorizontal={16}>
            <Spacer height={70}/>

            <HomeTabView
                selectedTab={tab}
                setSelectedTab={handleCurrentTab}
            />

            <Spacer height={45}/>
            {tab === 'feed' ?
                <FeedView/>
                :
                <MyDongView/>
            }
        </VStack>
    )
}
