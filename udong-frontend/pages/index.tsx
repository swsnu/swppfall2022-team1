import { useRouter } from 'next/router'

import { HomeContainer } from '../app/ui/feature/home/HomeContainer'

const HomePage = () => {
    const router = useRouter()
    const { tab } = router.query

    switch (tab) {
        case 'feed':
            return <HomeContainer tab={'feed'}/>
        case 'mydong':
            return <HomeContainer tab={'mydong'}/>
        default:
            return <HomeContainer tab={'feed'}/>
    }
}

export default HomePage
