import { useRouter } from 'next/router'
import { useCallback } from 'react'

import { Spacer } from '../../components/Spacer'
import { VStack } from '../../components/Stack'
import { BoardContainer } from './board/BoardContainer'
import { CLUB_TAB, ClubTabType, ClubTabView } from './ClubTabView'
import { EventContainer } from './event/EventContainer'
import { InfoContainer } from './info/InfoContainer'
import { TagContainer } from './tag/TagContainer'

interface ClubContainerProps {
    tab: ClubTabType
}

export const ClubContainer = (props: ClubContainerProps) => {
    const { tab } = props
    const router = useRouter()

    const handleCurrentTab = useCallback((selectedTab: ClubTabType) => {
        router.replace(`/club/1/?tab=${selectedTab}`)
    }, [])

    const getCurrentContainer = () => {
        if (tab === CLUB_TAB.BOARD) {
            return <BoardContainer/>
        } else if (tab === CLUB_TAB.EVENT) {
            return <EventContainer/>
        } else if (tab === CLUB_TAB.TAG) {
            return <TagContainer/>
        } else if (tab === CLUB_TAB.INFO) {
            return <InfoContainer/>
        } else {
            return <h1>board</h1>
        }
    }

    return <VStack>
        <ClubTabView
            selectedTab={tab}
            setSelectedTab={handleCurrentTab}
        />
        <Spacer height={20}/>
        {getCurrentContainer()}
    </VStack>

}
