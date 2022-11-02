import { useCallback } from 'react'

import { Spacer } from '../../components/Spacer'
import { HStack } from '../../components/Stack'
import { UdongTab } from '../../components/UdongTab'

export type ClubTabType = 'board' | 'event' | 'tag' | 'info'

interface ClubTabViewProps {
    selectedTab: ClubTabType
    setSelectedTab: (tab: ClubTabType) => void
}

export const ClubTabView = (props: ClubTabViewProps) => {
    const { selectedTab, setSelectedTab } = props

    const handleOnTabClick = useCallback((tab: ClubTabType) => {
        setSelectedTab(tab)
    }, [setSelectedTab])

    return <HStack
        justifyContent={'center'}
        alignItems={'end'}
    >
        <UdongTab
            text={'게시판'}
            selected={selectedTab === 'board'}
            onClick={() => handleOnTabClick('board')}
        />

        <Spacer width={40}/>

        <UdongTab
            text={'행사'}
            selected={selectedTab === 'event'}
            onClick={() => handleOnTabClick('event')}
        />

        <Spacer width={40}/>

        <UdongTab
            text={'태그'}
            selected={selectedTab === 'tag'}
            onClick={() => handleOnTabClick('tag')}
        />

        <Spacer width={40}/>

        <UdongTab
            text={'정보'}
            selected={selectedTab === 'info'}
            onClick={() => handleOnTabClick('info')}
        />
    </HStack>
}
