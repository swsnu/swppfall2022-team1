import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch } from '../../../../domain/store'
import { postSelector } from '../../../../domain/store/post/PostSelector'
import { postActions } from '../../../../domain/store/post/PostSlice'
import { Spacer } from '../../../components/Spacer'
import { VStack } from '../../../components/Stack'
import { UdongLoader } from '../../../components/UdongLoader'
import { UdongSearchBar } from '../../../components/UdongSearchBar'
import { PostItem } from '../../shared/PostItem'
import { ScrollToTopButton } from '../../shared/ScrollToTopButton'

export const FeedContainer = () => {
    const dispatch = useDispatch<AppDispatch>()
    const posts = useSelector(postSelector.feedPosts)
    const [loading, setLoading] = useState(true)
    const searchRef = useRef<HTMLInputElement | undefined>(null)

    useEffect(() => {
        dispatch(postActions.getFeedPosts())
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
                <>
                    {posts.map((post) => {
                        return <PostItem
                            key={post.id}
                            post={post}
                        />
                    })}
                </>
                <ScrollToTopButton/>
            </VStack>
        }
    </VStack>
}
