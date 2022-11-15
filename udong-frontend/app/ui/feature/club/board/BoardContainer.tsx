import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch } from '../../../../domain/store'
import { postSelector } from '../../../../domain/store/post/PostSelector'
import { postActions } from '../../../../domain/store/post/PostSlice'
import { Spacer } from '../../../components/Spacer'
import { HStack, VStack } from '../../../components/Stack'
import { UdongButton } from '../../../components/UdongButton'
import { UdongLoader } from '../../../components/UdongLoader'
import { UdongSearchBar } from '../../../components/UdongSearchBar'
import { PostItem } from '../../shared/PostItem'
import { ScrollToTopButton } from '../../shared/ScrollToTopButton'
import { PostCreateModal } from './PostCreateModal'

export const BoardContainer = () => {
    const dispatch = useDispatch<AppDispatch>()
    const boardPosts = useSelector(postSelector.boardPosts)

    const [loading, setLoading] = useState(true)
    const [showPostCreateModal, setShowPostCreateModal] = useState(false)

    useEffect(() => {
        dispatch(postActions.getClubPosts(1))
        setTimeout(() => setLoading(false), 600)
    }, [])

    return <VStack>
        <HStack justifyContent={'end'}>
            <UdongButton
                style={'line'}
                onClick={() => setShowPostCreateModal(true)}
                width={120}
            >
                글쓰기
            </UdongButton>
        </HStack>
        <Spacer height={20}/>

        <UdongSearchBar/>
        <Spacer height={8}/>

        {loading ? <UdongLoader height={400}/> :
            <VStack>
                {boardPosts.map((post, index) => {
                    return <PostItem
                        post={post}
                        key={post.id + ' ' + index}
                    />
                })}

                <PostCreateModal
                    isOpen={showPostCreateModal}
                    setIsOpen={setShowPostCreateModal}
                />

                <ScrollToTopButton/>
            </VStack>
        }
    </VStack>
}
