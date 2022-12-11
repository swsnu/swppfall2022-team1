import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { CreateScheduling } from '../../../../../../domain/model/CreatePost'
import { PostType } from '../../../../../../domain/model/PostType'
import { AppDispatch } from '../../../../../../domain/store'
import { postSelector } from '../../../../../../domain/store/post/PostSelector'
import { postActions, PostCreateAPIErrorType } from '../../../../../../domain/store/post/PostSlice'
import { convertQueryParamToString } from '../../../../../../utility/handleQueryParams'
import { VStack } from '../../../../../components/Stack'
import { UdongButton } from '../../../../../components/UdongButton'
import { UdongErrorModal } from '../../../../../components/UdongErrorModal'
import { UdongHeader } from '../../../../../components/UdongHeader'
import { UdongColors } from '../../../../../theme/ColorPalette'
import { PostAdditionalFieldsView } from '../PostAdditionalFieldsView'
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

const getErrorMessage = (error: PostCreateAPIErrorType): string => {
    if (error === 'missing_required_field') {
        return '모든 필드를 다 채워주세요.'
    } else if (error === 'is_not_admin') {
        return '관리자 권한이 필요한 동작입니다.'
    } else {
        return '오류가 발생했습니다.'
    }
}

export const PostCreateContainer = (props: PostCreateContainerProps) => {
    const { postType } = props
    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()
    const { clubId: rawClubId } = router.query
    const clubId = convertQueryParamToString(rawClubId)

    const newPostId = useSelector(postSelector.createdPostId)
    const error = useSelector(postSelector.createPostError)

    const [title, setTitle] = useState<string>('')
    const [contents, setContents] = useState<string>('')
    const [scheduling, setScheduling] = useState<CreateScheduling | undefined>(undefined)
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false)

    useEffect(() => {
        if (error) {
            setIsErrorModalOpen(true)
        }
    }, [error])

    useEffect(() => {
        if (newPostId) {
            dispatch(postActions.resetCreatePostError())
            router.push(`/club/${clubId}/post/${newPostId}/?from=create`)
        }
    }, [newPostId, dispatch, router, clubId])

    const handleCreatePost = useCallback(() => {
        if (clubId) {
            dispatch(postActions.createPost({
                clubId: parseInt(clubId),
                post: {
                    tagIdList: [],
                    title,
                    content: contents,
                    type: postType,
                    scheduling: postType === PostType.SCHEDULING ? scheduling : undefined,
                },
            }))
        }
    }, [clubId, contents, dispatch, postType, title, scheduling])

    const handleCloseErrorModal = useCallback(() => {
        setIsErrorModalOpen(false)
        dispatch(postActions.resetCreatePostError())
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
        <PostAdditionalFieldsView
            clubId={parseInt(clubId)}
            setScheduling={setScheduling}
            showDateTimePicker={postType === PostType.SCHEDULING}
            isEdit={false}
        />

        {error &&
            <UdongErrorModal
                message={getErrorMessage(error)}
                isOpen={isErrorModalOpen}
                setIsOpen={handleCloseErrorModal}
            />
        }
    </VStack>
}
