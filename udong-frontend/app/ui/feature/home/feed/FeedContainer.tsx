import { useEffect, useState } from 'react'

import { dummyFeedPosts } from '../../../../domain/model/Post'
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
                {dummyFeedPosts.concat(dummyFeedPosts).map((post, index) => {
                    return <PostItem
                        post={post}
                        key={post.id + index}
                    />
                })}
                <ScrollToTopButton/>
            </VStack>
        }
    </VStack>
}
