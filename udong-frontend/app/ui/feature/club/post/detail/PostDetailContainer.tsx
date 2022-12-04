import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { PostType } from '../../../../../domain/model/PostType'
import { AppDispatch } from '../../../../../domain/store'
import { postSelector } from '../../../../../domain/store/post/PostSelector'
import { postActions } from '../../../../../domain/store/post/PostSlice'
import { convertQueryParamToString } from '../../../../../utility/handleQueryParams'
import { Spacer } from '../../../../components/Spacer'
import { HStack, VStack } from '../../../../components/Stack'
import { UdongButton } from '../../../../components/UdongButton'
import { UdongHeader } from '../../../../components/UdongHeader'
import { UdongText } from '../../../../components/UdongText'
import { UdongColors } from '../../../../theme/ColorPalette'
import { ClickableTag } from '../../../shared/ClickableTag'
import { DeleteModal } from '../../../shared/DeleteModal'
import { ScrollToTopButton } from '../../../shared/ScrollToTopButton'
import { PostDetailCommentsView } from './PostDetailCommentsView'
import { PostDetailEnrollmentView } from './PostDetailEnrollmentView'
import { PostDetailSchedulingView } from './PostDetailSchedulingView'

const getSubtitle = (postType: PostType) => {
    switch(postType) {
        case PostType.ANNOUNCEMENT:
            return '일반 공지글'
        case PostType.ENROLLMENT:
            return '인원 모집글'
        case PostType.SCHEDULING:
            return '일정 수합글'
        default:
            return ''
    }
}

export const PostDetailContainer = () => {
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()
    const { clubId: rawClubId, postId: rawPostId } = router.query
    const clubId = convertQueryParamToString(rawClubId)
    const postId = convertQueryParamToString(rawPostId)

    const post = useSelector(postSelector.selectedPost)

    const [postType, setPostType] = useState<PostType>(PostType.ANNOUNCEMENT)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    useEffect(() => {
        if (post) {
            setPostType(post.type)
        }
    }, [post])

    useEffect(() => {
        dispatch(postActions.getPost(postId))
    }, [postId, dispatch])

    if (!post) {
        return null
    }

    return <VStack paddingHorizontal={16}>
        <UdongHeader
            title={post.title}
            onGoBack={() => router.back()}
            subtitle={getSubtitle(postType)}
            rightButtons={<>
                <UdongButton
                    style={'line'}
                    color={UdongColors.Primary}
                    height={40}
                    onClick={() => router.push(`/club/${clubId}/post/${postId}/edit/?type=${postType}`)}
                >
                    수정하기
                </UdongButton>

                <Spacer width={15}/>

                <UdongButton
                    style={'line'}
                    color={UdongColors.Warning}
                    height={40}
                    onClick={() => setShowDeleteModal(true)}
                >
                    삭제하기
                </UdongButton>
            </>}
        />
        <Spacer height={45}/>

        <VStack alignItems={'center'}>
            {post.eventName &&
                <VStack onClick={() => router.push(`/club/${clubId}/event/${post.eventName?.id}`)}>
                    <UdongText
                        style={'ListContentUnderscore'}
                        cursor={'pointer'}
                    >{post.eventName.name}</UdongText>
                    <Spacer height={15}/>
                </VStack>
            }

            <HStack alignItems={'center'}>
                <HStack>
                    {post.includedTags?.map((tag, index) => {
                        return <ClickableTag
                            key={`${tag.name}` + index}
                            text={tag.name}
                            isIncluded={true}
                            onClick={() => {return}}
                        />
                    })}
                </HStack>
                <HStack>
                    {post.excludedTags?.map((tag, index) => {
                        return <ClickableTag
                            key={tag.name + index}
                            text={tag.name}
                            isIncluded={false}
                            onClick={() => {return}}
                        />
                    })}
                </HStack>
            </HStack>
            <Spacer height={15}/>
        </VStack>

        <Spacer
            height={1}
            backgroundColor={UdongColors.GrayBright}
        />
        <VStack paddingVertical={30}>
            <UdongText
                style={'GeneralContent'}
                whiteSpace={'pre-line'}
            >
                {post.content}
            </UdongText>
        </VStack>

        {postType === PostType.ENROLLMENT && <PostDetailEnrollmentView/>}

        {postType === PostType.SCHEDULING && <PostDetailSchedulingView/>}

        <HStack>
            <UdongText style={'ListContentXS'}>{post.updatedAt}</UdongText>
            <Spacer width={10}/>
            <UdongText style={'ListContentXS'}>박지연</UdongText>
        </HStack>

        <Spacer height={10}/>

        <Spacer
            height={1}
            backgroundColor={UdongColors.GrayBright}
        />
        <PostDetailCommentsView/>

        <ScrollToTopButton/>

        <DeleteModal
            deleteObjectText={'게시글'}
            warningText={'경고 문구'}
            isOpen={showDeleteModal}
            setIsOpen={setShowDeleteModal}
        />
    </VStack>
}
