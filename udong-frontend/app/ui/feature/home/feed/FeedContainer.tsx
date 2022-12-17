import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch } from '../../../../domain/store'
import { postSelector } from '../../../../domain/store/post/PostSelector'
import { postActions } from '../../../../domain/store/post/PostSlice'
import { useDebouncedSearch } from '../../../../utility/useDebouncedSearch'
import { Spacer } from '../../../components/Spacer'
import { VStack } from '../../../components/Stack'
import { UdongSearchBar } from '../../../components/UdongSearchBar'
import { PostItem } from '../../shared/PostItem'
import { ScrollToTopButton } from '../../shared/ScrollToTopButton'

export const FeedContainer = () => {
    const dispatch = useDispatch<AppDispatch>()
    const posts = useSelector(postSelector.feedPosts)
    const searchRef = useRef<HTMLInputElement | undefined>(null)
    const [searchValue, setSearchValue] = useState('')
    const [keyword, setKeyword] = useState('')
    useDebouncedSearch(searchValue, setKeyword, 300)

    useEffect(() => {
        dispatch(postActions.getFeedPosts())
    }, [dispatch])

    return <VStack>
        <UdongSearchBar
            inputRef={searchRef}
            onChange={() => {
                setSearchValue(searchRef.current?.value ?? '')
            }}
        />
        <Spacer height={8}/>

        <ScrollToTopButton/>

        {
            <VStack>
                <>
                    {posts.filter((post)=>{return post.title.includes(keyword) || post.content.includes(keyword)}).map((post) => {
                        return <PostItem
                            key={post.id}
                            clubId={post.club?.id ?? -1}
                            post={post}
                            imageKey={post.club?.image ?? ''}
                        />
                    })}
                </>
                <ScrollToTopButton/>
            </VStack>
        }
    </VStack>
}
