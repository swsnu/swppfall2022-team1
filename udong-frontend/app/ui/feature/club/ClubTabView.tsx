import { useCallback } from 'react'

import { Spacer } from '../../components/Spacer'
import { HStack } from '../../components/Stack'
import { UdongTab } from '../../components/UdongTab'

export type ClubTabType = CLUB_TAB
export enum CLUB_TAB {
    BOARD = 'board',
    EVENT = 'event',
    TAG = 'tag',
    INFO = 'info'
}

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
            selected={selectedTab === CLUB_TAB.BOARD}
            onClick={() => handleOnTabClick(CLUB_TAB.BOARD)}
        />

        <Spacer width={40}/>

        <UdongTab
            text={'행사'}
            selected={selectedTab === CLUB_TAB.EVENT}
            onClick={() => handleOnTabClick(CLUB_TAB.EVENT)}
        />

        <Spacer width={40}/>

        <UdongTab
            text={'태그'}
            selected={selectedTab === CLUB_TAB.TAG}
            onClick={() => handleOnTabClick(CLUB_TAB.TAG)}
        />

        <Spacer width={40}/>

        <UdongTab
            text={'정보'}
            selected={selectedTab === CLUB_TAB.INFO}
            onClick={() => handleOnTabClick(CLUB_TAB.INFO)}
        />
    </HStack>
}
