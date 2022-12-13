import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch } from '../../../../domain/store'
import { postSelector } from '../../../../domain/store/post/PostSelector'
import { postActions } from '../../../../domain/store/post/PostSlice'
import { userSelector } from '../../../../domain/store/user/UserSelector'
import { userActions } from '../../../../domain/store/user/UserSlice'
import { useDebouncedSearch } from '../../../../utility/useDebouncedSearch'
import { Spacer } from '../../../components/Spacer'
import { HStack, VStack } from '../../../components/Stack'
import { UdongButton } from '../../../components/UdongButton'
import { UdongEmtpyContainer } from '../../../components/UdongEmtpyContainer'
import { UdongLoader } from '../../../components/UdongLoader'
import { UdongSearchBar } from '../../../components/UdongSearchBar'
import { PostItem } from '../../shared/PostItem'
import { ScrollToTopButton } from '../../shared/ScrollToTopButton'
import { PostCreateModal } from './PostCreateModal'

interface BoardContainerProps {
    clubId: number
}

export const BoardContainer = (props: BoardContainerProps) => {
    const { clubId } = props
    const dispatch = useDispatch<AppDispatch>()

    const boardPosts = useSelector(postSelector.clubPosts)
    const isAdmin = useSelector(userSelector.isAdmin)

    const [loading, setLoading] = useState(true)

    const [searchValue, setSearchValue] = useState('')
    const [keyword, setKeyword] = useState('')
    const [showPostCreateModal, setShowPostCreateModal] = useState(false)
    const searchRef = useRef<HTMLInputElement | undefined>(null)

    useDebouncedSearch(searchValue, setKeyword, 300)

    useEffect(() => {
        dispatch(postActions.getClubPosts(clubId))
        dispatch(userActions.getMyClubProfile(clubId))
        setTimeout(() => setLoading(false), 600)
    }, [dispatch, clubId])

    return <VStack>
        {isAdmin &&
            <HStack justifyContent={'end'}>
                <UdongButton
                    style={'line'}
                    onClick={() => setShowPostCreateModal(true)}
                    width={120}
                >
                    글쓰기
                </UdongButton>
            </HStack>
        }
        <Spacer height={20}/>

        <UdongSearchBar
            inputRef={searchRef}
            onChange={() => {
                setSearchValue(searchRef.current?.value ?? '')
            }}
        />
        <Spacer height={8}/>
        {loading ? <UdongLoader height={400}/> :
            <VStack>
                {boardPosts.length === 0 ?
                    <UdongEmtpyContainer emptyObject={'게시글'}/>
                    :
                    <>
                        {boardPosts.filter((post) => {
                            return (post.title.includes(keyword) || post.content.includes(keyword))
                        }).map((post, index) => {
                            return <PostItem
                                post={post}
                                key={post.id + ' ' + index}
                                clubId={clubId}
                            />
                        })}
                    </>
                }
                <PostCreateModal
                    clubId={clubId}
                    isOpen={showPostCreateModal}
                    setIsOpen={setShowPostCreateModal}
                />
                <ScrollToTopButton/>
            </VStack>
        }
    </VStack>
}
