import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { PostType } from '../../../../../../domain/model/PostType'
import { AppDispatch } from '../../../../../../domain/store'
import { eventSelector } from '../../../../../../domain/store/event/EventSelector'
import { eventActions } from '../../../../../../domain/store/event/EventSlice'
import { postSelector } from '../../../../../../domain/store/post/PostSelector'
import { postActions } from '../../../../../../domain/store/post/PostSlice'
import { tagSelector } from '../../../../../../domain/store/tag/TagSelector'
import { tagActions } from '../../../../../../domain/store/tag/TagSlice'
import { convertQueryParamToString } from '../../../../../../utility/handleQueryParams'
import { VStack } from '../../../../../components/Stack'
import { UdongButton } from '../../../../../components/UdongButton'
import { UdongHeader } from '../../../../../components/UdongHeader'
import { UdongColors } from '../../../../../theme/ColorPalette'
import { PostAdditionalInputsView } from '../PostAdditionalInputsView'
import { PostInputView } from '../PostInputView'

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

export const PostEditContainer = () => {
    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()
    const { clubId: rawClubId, postId: rawPostId } = router.query
    const clubId = convertQueryParamToString(rawClubId)
    const postId = convertQueryParamToString(rawPostId)

    const post = useSelector(postSelector.selectedPost)
    const allTags = useSelector(tagSelector.tags)
    const event = useSelector(eventSelector.selectedEvent)
    const createPostTagIds = useSelector(tagSelector.createPostTags).map(tag => tag.id)
    const createPostEvent = useSelector(eventSelector.createPostEvent)

    const [title, setTitle] = useState<string>('')
    const [contents, setContents] = useState<string>('')

    useEffect(() => {
        dispatch(eventActions.setCreatePostEvent(event))
    }, [event, dispatch])

    useEffect(() => {
        const includedTags = post?.includedTags ?? []
        const excludedTags = post?.excludedTags ?? []
        const basicTags = includedTags.concat(excludedTags)
        const tags = allTags.filter(tag => basicTags.some(basicTag => basicTag.id === tag.id))
        dispatch(tagActions.setCreatePostTags(tags))
    }, [allTags, post, dispatch])

    useEffect(() => {
        dispatch(postActions.getPost(postId))
        dispatch(tagActions.getTags(+clubId))
    }, [dispatch, postId, clubId])

    useEffect(() => {
        if (post?.eventName) {
            dispatch(eventActions.getEvent(post.eventName.id))
        }
    }, [dispatch, post?.eventName])

    useEffect(() => {
        if (post) {
            setTitle(post.title)
            setContents(post.content)
        }
    }, [post])

    const handleEdit = useCallback(async () => {
        if (post) {
            const response = await dispatch(postActions.editPost({
                postId: post.id,
                post: {
                    ...post,
                    title,
                    content: contents,
                    eventName: createPostEvent,
                    eventId: createPostEvent?.id ?? undefined,
                },
                tagIdList: createPostTagIds,
            }))
            if (response.type === `${postActions.editPost.typePrefix}/fulfilled`) {
                router.push(`/club/${clubId}/post/${postId}/?from=upsert`)
            }
        }
    }, [dispatch, createPostEvent, createPostTagIds, post, router, clubId, postId, contents, title])

    if (!post) {
        return null
    }

    return <VStack paddingHorizontal={16}>
        <UdongHeader
            title={title}
            subtitle={getSubtitle(post.type)}
            onGoBack={() => router.back()}
            rightButtons={
                <UdongButton
                    style={'line'}
                    color={UdongColors.Primary}
                    height={40}
                    onClick={handleEdit}
                >
                    저장하기
                </UdongButton>
            }
        />
        <PostInputView
            title={title}
            setTitle={setTitle}
            contents={contents}
            setContents={setContents}
        />
        <PostAdditionalInputsView
            clubId={parseInt(clubId)}
            showDateTimePicker={post.type === PostType.SCHEDULING}
            isEdit={true}
            setScheduling={() => {return}}
        />
    </VStack>}
