import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'

import { Post } from '../../../domain/model/Post'
import { PostType } from '../../../domain/model/PostType'
import { dummyUserMe } from '../../../domain/model/User'
import { formatPostItemInfo } from '../../../utility/postItemFormatter'
import { Spacer } from '../../components/Spacer'
import { HStack, VStack } from '../../components/Stack'
import { UdongText } from '../../components/UdongText'
import { UdongColors } from '../../theme/ColorPalette'
import { ClickableTag } from './ClickableTag'
import { UserListModal } from './UserListModal'

interface PostItemProps {
    post: Post
    isClubBoard?: boolean
    isEventDetail?: boolean
}

export const PostItem = (props: PostItemProps) => {
    const { post, isClubBoard = false, isEventDetail = false } = props
    const router = useRouter()
    const [isMemberListOpen, setIsMemberListOpen] = useState(false)
    const [currentTag, setCurrentTag] = useState('')

    const isFeed = !isEventDetail && !isClubBoard

    const handleOnClickPost = useCallback(() => {
        // FIXME: demo를 위해 임시방편으로 query params으로 type넘겨주기, 나중에는 리덕스로 해결
        router.push(`/club/1/post/1/?type=${post.type}`)
    }, [router])

    return <VStack onClick={handleOnClickPost}>
        <Spacer
            height={1}
            backgroundColor={UdongColors.GrayBright}
        />

        <VStack
            paddingVertical={12}
            paddingHorizontal={20}
            gap={12}
        >
            <HStack alignItems={'center'}>
                {formatPostItemInfo(post.clubName, isFeed, isClubBoard, isEventDetail, post.event?.name)}

                <HStack>
                    {post.tags.map((tag, index) => {
                        return <ClickableTag
                            key={tag.name + index}
                            text={tag.name}
                            isIncluded={tag.users.includes(dummyUserMe)}
                            onClick={() => {
                                setIsMemberListOpen(true)
                                setCurrentTag(tag.name)
                            }}
                        />
                    })}
                </HStack>
            </HStack>

            <UdongText style={'ListTitle'}>{post.title}</UdongText>

            <HStack>
                {post.type !== PostType.ANNOUNCEMENT &&
                    <HStack>
                        <UdongText
                            style={'ListContentXS'}
                            fontWeight={'bold'}
                            color={UdongColors.Primary}
                        >
                            {post.type === PostType.ENROLLMENT ? '인원 모집 중' : '일정 수합 중'}
                        </UdongText>
                        <Spacer width={30}/>
                    </HStack>
                }

                <UdongText style={'ListContentXS'}>{post.createdAt}</UdongText>
            </HStack>
        </VStack>

        <UserListModal
            isOpen={isMemberListOpen}
            setIsOpen={setIsMemberListOpen}
            title={currentTag}
        />
    </VStack>
}
