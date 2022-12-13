import { useRouter } from 'next/router'
import { useCallback } from 'react'

import { BoardPost } from '../../../domain/model/BoardPost'
import { PostType } from '../../../domain/model/PostType'
import { useImage } from '../../../hooks/useImage'
import { DateTimeFormatter } from '../../../utility/dateTimeFormatter'
import { getPostTypeQueryParam } from '../../../utility/handleQueryParams'
import { formatPostItemInfo } from '../../../utility/postItemFormatter'
import { Spacer } from '../../components/Spacer'
import { HStack, VStack } from '../../components/Stack'
import { UdongImage } from '../../components/UdongImage'
import { UdongText } from '../../components/UdongText'
import { UdongColors } from '../../theme/ColorPalette'
import { ClickableTag } from './ClickableTag'

const getPostItemTypeText = (type: PostType, closed?: boolean): string => {
    switch (type) {
        case PostType.ENROLLMENT:
            return !closed ? '인원 모집 중' : '인원 모집 완료'
        case PostType.SCHEDULING:
            return !closed ? '일정 수합 중' : '일정 수합 완료'
        case PostType.ANNOUNCEMENT:
        default:
            return ''
    }
}

interface PostItemProps {
    post: BoardPost
    clubId: number
    imageKey?: string
}

export const PostItem = (props: PostItemProps) => {
    const { post, clubId, imageKey } = props
    const router = useRouter()
    const imageUrl = useImage(imageKey ?? '')

    const handleOnClickPost = useCallback(() => {
        router.push(`/club/${clubId}/post/${post.id}/?type=${getPostTypeQueryParam(post.type)}`)
    }, [router, clubId, post])

    return (
        <VStack onClick={handleOnClickPost}>
            <Spacer
                height={1}
                backgroundColor={UdongColors.GrayBright}
            />

            <HStack
                alignItems={'center'}
                paddingHorizontal={12}
                gap={24}
            >
                {imageKey && <UdongImage
                    src={imageUrl ?? ''}
                    height={70}
                    width={70}
                    borderRadius={10}
                    clickable={true}
                    border={`${UdongColors.PrimaryBright} 2px solid`}
                />}
                <VStack
                    paddingVertical={12}
                    gap={12}
                >
                    <HStack alignItems={'center'}>
                        {formatPostItemInfo(post)}

                        <HStack>
                            {post.includedTags?.map((tag, index) => {
                                return <ClickableTag
                                    key={tag.name + index}
                                    tag={tag}
                                    isIncluded={true}
                                />
                            })}
                        </HStack>
                        <HStack>
                            {post.excludedTags?.map((tag, index) => {
                                return <ClickableTag
                                    key={tag.name + index}
                                    tag={tag}
                                    isIncluded={false}
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
                                color={!post.closed ? UdongColors.Primary : UdongColors.GrayNormal}
                            >
                                {getPostItemTypeText(post.type, post.closed)}
                            </UdongText>
                            <Spacer width={30}/>
                        </HStack>
                        }

                        <UdongText style={'ListContentXS'}>{DateTimeFormatter.formatDateTime(post.createdAt, true)}</UdongText>
                    </HStack>
                </VStack>
            </HStack>
        </VStack>
    )
}
