import { useEffect, useState } from 'react'

import { Spacer } from '../../../components/Spacer'
import { VStack } from '../../../components/Stack'
import UdongLoader from '../../../components/UdongLoader'
import { UdongSearchBar } from '../../../components/UdongSearchBar'
import { PostItem } from '../../shared/PostItem'
import { ScrollToTopButton } from '../../shared/ScrollToTopButton'

export const FeedContainer = () => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => setLoading(false), 600)

    }, [])

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
