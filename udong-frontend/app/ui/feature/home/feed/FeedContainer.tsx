import { useEffect, useRef, useState } from 'react'

import { Spacer } from '../../../components/Spacer'
import { VStack } from '../../../components/Stack'
import { UdongLoader } from '../../../components/UdongLoader'
import { UdongSearchBar } from '../../../components/UdongSearchBar'
import { ScrollToTopButton } from '../../shared/ScrollToTopButton'

export const FeedContainer = () => {
    const [loading, setLoading] = useState(true)
    const searchRef = useRef<HTMLInputElement | undefined>(null)

    useEffect(() => {
        setTimeout(() => setLoading(false), 600)

    }, [])

    return <VStack>
        <UdongSearchBar
            inputRef={searchRef}
            onChange={() => {return}}
        />
        <Spacer height={8}/>

        <ScrollToTopButton/>

        {loading ? <UdongLoader height={500}/> :
            <VStack>
                {/*{dummyFeedPosts.concat(dummyFeedPosts).map((post, index) => {*/}
                {/*    return <PostItem*/}
                {/*        post={post}*/}
                {/*        key={post.id + index}*/}
                {/*    />*/}
                {/*})}*/}
                <ScrollToTopButton/>
            </VStack>
        }
    </VStack>
}
