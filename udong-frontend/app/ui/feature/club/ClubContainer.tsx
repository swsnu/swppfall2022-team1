import { useRouter } from 'next/router'
import { useCallback } from 'react'

import { Spacer } from '../../components/Spacer'
import { VStack } from '../../components/Stack'
import { BoardContainer } from './board/BoardContainer'
import { ClubTabType, ClubTabView } from './ClubTabView'
import { EventContainer } from './event/EventContainer'
import { EventTabType } from './event/EventTabView'
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
        if (tab === 'board') {
            return <BoardContainer/>
        } else if (tab === 'event') {
            return <EventContainer/>
        } else if (tab === 'tag') {
            return <TagContainer/>
        } else if (tab === 'info') {
            return <InfoContainer/>
        } else {
            return <h1>board</h1>
        }
    }

    return <VStack paddingHorizontal={16}>
        <Spacer height={70}/>

        <ClubTabView
            selectedTab={tab}
            setSelectedTab={handleCurrentTab}
        />
        <Spacer height={20}/>

        {getCurrentContainer()}
    </VStack>
}
