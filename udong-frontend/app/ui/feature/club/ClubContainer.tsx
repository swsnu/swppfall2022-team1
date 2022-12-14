import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { AppDispatch } from '../../../domain/store'
import { clubActions } from '../../../domain/store/club/ClubSlice'
import { userActions } from '../../../domain/store/user/UserSlice'
import { convertQueryParamToString } from '../../../utility/handleQueryParams'
import { Spacer } from '../../components/Spacer'
import { HStack, VStack } from '../../components/Stack'
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
        if (clubId){
            dispatch(clubActions.getClub(clubId))
            dispatch(userActions.getMyClubProfile(clubId))
        }
    }, [clubId, dispatch])

    const handleCurrentTab = useCallback((selectedTab: ClubTabType) => {
        router.replace(`/club/${clubId}/?tab=${selectedTab}`)
    }, [router, clubId])

    const getCurrentContainer = () => {
        if (tab === CLUB_TAB.BOARD) {
            return <BoardContainer clubId={clubId}/>
        } else if (tab === CLUB_TAB.EVENT) {
            return <EventContainer clubId={clubId}/>
        } else if (tab === CLUB_TAB.TAG) {
            return <TagContainer clubId={clubId}/>
        } else if (tab === CLUB_TAB.INFO) {
            return <InfoContainer clubId={clubId}/>
        } else {
            return <h1>board</h1>
        }
    }

    return <HStack justifyContent='center'>
        <VStack
            width='1000px'
        >
            <ClubTabView
                selectedTab={tab}
                setSelectedTab={handleCurrentTab}
            />
            <Spacer height={20}/>
            {getCurrentContainer()}
        </VStack>
    </HStack>

}
