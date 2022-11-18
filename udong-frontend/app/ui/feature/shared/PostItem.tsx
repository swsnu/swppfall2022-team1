import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'

import { BoardPost, ListItemPost } from '../../../domain/model/ListItemPost'
import { PostType } from '../../../domain/model/PostType'
import { getPostTypeQueryParam } from '../../../utility/handleQueryParams'
import { formatPostItemInfo } from '../../../utility/postItemFormatter'
import { Spacer } from '../../components/Spacer'
import { HStack, VStack } from '../../components/Stack'
import { UdongText } from '../../components/UdongText'
import { UdongColors } from '../../theme/ColorPalette'
import { ClickableTag } from './ClickableTag'
import { UserListModal } from './UserListModal'

interface PostItemProps {
    post: ListItemPost | BoardPost
}

export const PostItem = (props: PostItemProps) => {
    const { post } = props
    const router = useRouter()
    const [isMemberListOpen, setIsMemberListOpen] = useState(false)
    const [currentTag, setCurrentTag] = useState('')

    const handleOnClickPost = useCallback(() => {
        router.push(`/club/1/post/1/?type=${getPostTypeQueryParam(post.type)}`)
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
                {formatPostItemInfo(post)}

                <HStack>
                    {post.includedTags?.map((tag, index) => {
                        return <ClickableTag
                            key={tag.name + index}
                            text={tag.name}
                            isIncluded={true}
                            onClick={() => {
                                setIsMemberListOpen(true)
                                setCurrentTag(tag.name)
                            }}
                        />
                    })}
                </HStack>
                <HStack>
                    {post.excludedTags?.map((tag, index) => {
                        return <ClickableTag
                            key={tag.name + index}
                            text={tag.name}
                            isIncluded={false}
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
