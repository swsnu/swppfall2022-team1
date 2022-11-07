import { useState } from 'react'

import { Spacer } from '../../../components/Spacer'
import { VStack } from '../../../components/Stack'
import UdongLoader from '../../../components/UdongLoader'
import { UdongSearchBar } from '../../../components/UdongSearchBar'
import { PostItem } from '../../shared/PostItem'
import { ScrollToTopButton } from '../../shared/ScrollToTopButton'

const delay = (time: number) => {
    return new Promise(resolve => setTimeout(resolve, time))
}

export const FeedContainer = () => {
    const [loading, setLoading] = useState(true)
    delay(600).then(() => setLoading(false))

    return <VStack>
        <UdongSearchBar/>
        <Spacer height={8}/>

        <ScrollToTopButton/>

        {loading ? <UdongLoader height={500}/> :
            <VStack>
                <PostItem/>
                <PostItem/>
                <PostItem/>
                <PostItem/>
                <PostItem/>
                <PostItem/>
                <PostItem/>
                <PostItem/>
                <PostItem/>
                <PostItem/>
                <ScrollToTopButton/>
            </VStack>
        }
    </VStack>
}
