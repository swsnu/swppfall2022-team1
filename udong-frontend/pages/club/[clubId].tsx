import { useRouter } from 'next/router'

import { ClubContainer } from '../../app/ui/feature/club/ClubContainer'

export const ClubPage = () => {
    const router = useRouter()
    const { isReady } = router
    const { tab } = router.query

    if (!isReady){
        return <p>Loading...</p>
    }

    switch (tab) {
        case 'board':
            return <ClubContainer tab={'board'}/>
        case 'event':
            return <ClubContainer tab={'event'}/>
        case 'tag':
            return <ClubContainer tab={'tag'}/>
        case 'info':
            return <ClubContainer tab={'info'}/>
        default:
            return <ClubContainer tab={'board'}/>
    }
}

export default ClubPage
