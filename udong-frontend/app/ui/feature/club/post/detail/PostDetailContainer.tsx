import DOMPurify from 'dompurify'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { PostType } from '../../../../../domain/model/PostType'
import { AppDispatch } from '../../../../../domain/store'
import { eventActions } from '../../../../../domain/store/event/EventSlice'
import { postSelector } from '../../../../../domain/store/post/PostSelector'
import { postActions } from '../../../../../domain/store/post/PostSlice'
import { userSelector } from '../../../../../domain/store/user/UserSelector'
import { userActions } from '../../../../../domain/store/user/UserSlice'
import { DateTimeFormatter } from '../../../../../utility/dateTimeFormatter'
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
    const { clubId: rawClubId, postId: rawPostId, from } = router.query
    const clubId = convertQueryParamToString(rawClubId)
    const postId = convertQueryParamToString(rawPostId)
    const routeFrom = convertQueryParamToString(from)
    const isAdmin = useSelector(userSelector.isAdmin)

    const post = useSelector(postSelector.selectedPost)

    const [postType, setPostType] = useState<PostType>(PostType.ANNOUNCEMENT)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    useEffect(() => {
        if (post) {
            setPostType(post.type)
        }
    }, [post])

    useEffect(() => {
        dispatch(userActions.getMyProfile())
        dispatch(userActions.getMyClubProfile(+clubId))
        if (postId) {
            dispatch(postActions.getPost(postId))
        }
    }, [postId, dispatch, clubId])

    useEffect(() => {
        dispatch(eventActions.resetSelectedEvent())
    }, [dispatch])

    const handleDelete = useCallback(async () => {
        setShowDeleteModal(false)
        const response = await dispatch(postActions.deletePost(+postId))
        if (response.type === `${postActions.deletePost.typePrefix}/fulfilled`) {
            router.push(`/club/${clubId}`)
        }
    }, [dispatch, clubId, postId, router])

    if (!post) {
        return null
    }

    return <VStack paddingHorizontal={16}>
        <UdongHeader
            title={post.title}
            onGoBack={() => routeFrom === 'upsert' ? router.push(`/club/${clubId}`) : router.back()}
            subtitle={getSubtitle(postType)}
            rightButtons={isAdmin && <>
                <UdongButton
                    style={'line'}
                    color={UdongColors.Primary}
                    height={40}
                    onClick={() => router.push(`/club/${clubId}/post/${postId}/edit`)}
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
            </>
            }
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
                {<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }} />}
            </UdongText>
        </VStack>

        {postType === PostType.ENROLLMENT && <PostDetailEnrollmentView
            postId={post.id}
            clubId={parseInt(clubId)}
            isOpen={!post.closed}
        />}

        {postType === PostType.SCHEDULING && <PostDetailSchedulingView/>}

        <HStack>
            <UdongText style={'ListContentXS'}>{DateTimeFormatter.formatDateTime(post.createdAt, false)}</UdongText>
            <Spacer width={10}/>
            <UdongText style={'ListContentXS'}>{post.author}</UdongText>
        </HStack>

        <Spacer height={10}/>

        <Spacer
            height={1}
            backgroundColor={UdongColors.GrayBright}
        />
        <PostDetailCommentsView postId={post.id}/>

        <ScrollToTopButton/>

        <DeleteModal
            deleteObjectText={'게시글'}
            warningText={'해당 게시글과 댓글 등이 영구적으로 삭제됩니다'}
            isOpen={showDeleteModal}
            setIsOpen={setShowDeleteModal}
            onClickDelete={handleDelete}
        />
    </VStack>
}
