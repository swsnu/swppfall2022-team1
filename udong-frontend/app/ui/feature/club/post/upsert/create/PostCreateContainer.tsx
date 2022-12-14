import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { CreateScheduling } from '../../../../../../domain/model/CreatePost'
import { PostType } from '../../../../../../domain/model/PostType'
import { AppDispatch } from '../../../../../../domain/store'
import { eventSelector } from '../../../../../../domain/store/event/EventSelector'
import { postSelector } from '../../../../../../domain/store/post/PostSelector'
import { postActions } from '../../../../../../domain/store/post/PostSlice'
import { tagSelector } from '../../../../../../domain/store/tag/TagSelector'
import { tagActions } from '../../../../../../domain/store/tag/TagSlice'
import { convertQueryParamToString } from '../../../../../../utility/handleQueryParams'
import { VStack } from '../../../../../components/Stack'
import { UdongButton } from '../../../../../components/UdongButton'
import { UdongErrorModal } from '../../../../../components/UdongErrorModal'
import { UdongHeader } from '../../../../../components/UdongHeader'
import { UdongColors } from '../../../../../theme/ColorPalette'
import { PostAdditionalInputsView } from '../PostAdditionalInputsView'
import { PostInputView } from '../PostInputView'

interface PostCreateContainerProps {
    postType: PostType
}

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

export const PostCreateContainer = (props: PostCreateContainerProps) => {
    const { postType } = props
    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()
    const { clubId: rawClubId } = router.query
    const clubId = convertQueryParamToString(rawClubId)

    const newPostId = useSelector(postSelector.createdPostId)
    const error = useSelector(postSelector.errors).createPostError
    const selectedTagIds = useSelector(tagSelector.createPostTags).map(tag => tag.id)
    const selectedEventId = useSelector(eventSelector.createPostEvent)?.id

    const [title, setTitle] = useState<string>('')
    const [contents, setContents] = useState<string>('')
    const [scheduling, setScheduling] = useState<CreateScheduling | undefined>(undefined)
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false)

    const setInitialTags = useCallback(async () => {
        if (clubId) {
            const response = await dispatch(tagActions.getTags(parseInt(clubId)))
            if (response.type === `${tagActions.getTags.typePrefix}/fulfilled`) {
                dispatch(tagActions.resetCreatePostTags())
            }
        }
    }, [dispatch, clubId])

    useEffect(() => {
        setInitialTags()
    }, [setInitialTags])

    useEffect(() => {
        if (error) {
            setIsErrorModalOpen(true)
        }
    }, [error])

    useEffect(() => {
        if (newPostId) {
            dispatch(postActions.resetErrors())
            router.push(`/club/${clubId}/post/${newPostId}/?from=create`)
        }
    }, [newPostId, dispatch, router, clubId])

    const handleCreatePost = useCallback(() => {
        if (clubId) {
            dispatch(postActions.createPost({
                clubId: parseInt(clubId),
                post: {
                    tagIdList: selectedTagIds,
                    eventId: selectedEventId,
                    title,
                    content: contents,
                    type: postType,
                    scheduling: postType === PostType.SCHEDULING ? scheduling : undefined,
                },
            }))
        }
    }, [clubId, selectedEventId, contents, dispatch, postType, title, scheduling, selectedTagIds])

    const handleCloseErrorModal = useCallback(() => {
        setIsErrorModalOpen(false)
        dispatch(postActions.resetErrors())
    }, [dispatch])

    return <VStack paddingHorizontal={16}>
        <UdongHeader
            title={'게시글 쓰기'}
            subtitle={getSubtitle(postType)}
            onGoBack={() => router.back()}
            rightButtons={
                <UdongButton
                    style={'line'}
                    color={UdongColors.Primary}
                    height={40}
                    onClick={handleCreatePost}
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
            setScheduling={setScheduling}
            showDateTimePicker={postType === PostType.SCHEDULING}
            isEdit={false}
        />

        {error &&
            <UdongErrorModal
                message={error.message}
                isOpen={isErrorModalOpen}
                setIsOpen={handleCloseErrorModal}
            />
        }
    </VStack>
}
