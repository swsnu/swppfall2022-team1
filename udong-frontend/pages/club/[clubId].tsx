import { useRouter } from 'next/router'

import { ClubContainer } from '../../app/ui/feature/club/ClubContainer'
import { CLUB_TAB } from '../../app/ui/feature/club/ClubTabView'

export const ClubPage = () => {
    const router = useRouter()
    const { isReady } = router
    const { tab } = router.query

    if (!isReady){
        return <p>Loading...</p>
    }

    switch (tab) {
        case CLUB_TAB.BOARD:
            return <ClubContainer tab={CLUB_TAB.BOARD}/>
        case CLUB_TAB.EVENT:
            return <ClubContainer tab={CLUB_TAB.EVENT}/>
        case CLUB_TAB.TAG:
            return <ClubContainer tab={CLUB_TAB.TAG}/>
        case CLUB_TAB.INFO:
            return <ClubContainer tab={CLUB_TAB.INFO}/>
        default:
            return <ClubContainer tab={CLUB_TAB.BOARD}/>
    }
}

export default ClubPage
