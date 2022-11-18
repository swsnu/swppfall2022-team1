import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { AppDispatch } from '../../../domain/store'
import { clubActions } from '../../../domain/store/club/ClubSlice'
import { convertQueryParamToString } from '../../../utility/handleQueryParams'
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
    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()
    const { clubId: rawClubId } = router.query
    const clubId = parseInt(convertQueryParamToString(rawClubId))

    useEffect(() => {
        dispatch(clubActions.getClub(clubId))
    }, [clubId, dispatch])

    const handleCurrentTab = useCallback((selectedTab: ClubTabType) => {
        router.replace(`/club/1/?tab=${selectedTab}`)
    }, [router])

    const getCurrentContainer = () => {
        if (tab === CLUB_TAB.BOARD) {
            return <BoardContainer/>
        } else if (tab === CLUB_TAB.EVENT) {
            return <EventContainer clubId={clubId}/>
        } else if (tab === CLUB_TAB.TAG) {
            return <TagContainer/>
        } else if (tab === CLUB_TAB.INFO) {
            return <InfoContainer/>
        } else {
            return <h1>board</h1>
        }
    }

    return <VStack>
        <VStack
            paddingHorizontal={50}
            width='100vw'
        >
            <ClubTabView
                selectedTab={tab}
                setSelectedTab={handleCurrentTab}
            />
            <Spacer height={20}/>
            {getCurrentContainer()}
        </VStack>
    </VStack>

}
