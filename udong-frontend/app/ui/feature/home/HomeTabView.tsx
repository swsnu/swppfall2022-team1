import { useCallback } from 'react'

import { Spacer } from '../../components/Spacer'
import { HStack } from '../../components/Stack'
import { UdongTab } from '../../components/UdongTab'

export type HomeTabType = 'feed' | 'mydong'

interface HomeTabViewProps {
    selectedTab: HomeTabType
    setSelectedTab: (tab: HomeTabType) => void
}

export const HomeTabView = (props: HomeTabViewProps) => {
    const { selectedTab, setSelectedTab } = props

    const handleOnTabClick = useCallback((tab: HomeTabType) => {
        setSelectedTab(tab)
    }, [setSelectedTab])

    return <HStack
        justifyContent={'center'}
        alignItems={'end'}
        height={50}
    >
        <UdongTab
            text={'피드'}
            selected={selectedTab === 'feed'}
            onClick={() => handleOnTabClick('feed')}
        />

        <Spacer width={40}/>

        <UdongTab
            text={'my동'}
            selected={selectedTab === 'mydong'}
            onClick={() => handleOnTabClick('mydong')}
        />
    </HStack>
}
