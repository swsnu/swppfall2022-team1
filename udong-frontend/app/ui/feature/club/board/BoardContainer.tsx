import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch } from '../../../../domain/store'
import { postSelector } from '../../../../domain/store/post/PostSelector'
import { postActions } from '../../../../domain/store/post/PostSlice'
import { Spacer } from '../../../components/Spacer'
import { HStack, VStack } from '../../../components/Stack'
import { UdongButton } from '../../../components/UdongButton'
import { UdongEmtpyContainer } from '../../../components/UdongEmtpyContainer'
import { UdongLoader } from '../../../components/UdongLoader'
import { UdongSearchBar } from '../../../components/UdongSearchBar'
import { PostItem } from '../../shared/PostItem'
import { ScrollToTopButton } from '../../shared/ScrollToTopButton'
import { PostCreateModal } from './PostCreateModal'

export const BoardContainer = () => {
    const dispatch = useDispatch<AppDispatch>()
    const boardPosts = useSelector(postSelector.clubPosts)

    const [loading, setLoading] = useState(true)
    const [showPostCreateModal, setShowPostCreateModal] = useState(false)
    const searchRef = useRef<HTMLInputElement | undefined>(null)

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

        <UdongSearchBar
            onChange={() => {return}}
            inputRef={searchRef}
        />
        <Spacer height={8}/>

        {loading ? <UdongLoader height={400}/> :
            <VStack>
                {boardPosts.length === 0 ?
                    <UdongEmtpyContainer emptyObject={'게시글'}/>
                    :
                    <>
                        {boardPosts.map((post, index) => {
                            return <PostItem
                                post={post}
                                key={post.id + ' ' + index}
                            />
                        })}
                    </>
                }

                <PostCreateModal
                    isOpen={showPostCreateModal}
                    setIsOpen={setShowPostCreateModal}
                />

                <ScrollToTopButton/>
            </VStack>
        }
    </VStack>
}
