import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'

import { PostType } from '../../../../../../domain/model/PostType'
import { AppDispatch } from '../../../../../../domain/store'
import { postActions } from '../../../../../../domain/store/post/PostSlice'
import { convertQueryParamToString } from '../../../../../../utility/handleQueryParams'
import { VStack } from '../../../../../components/Stack'
import { UdongButton } from '../../../../../components/UdongButton'
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

export const PostCreateContainer = (props: PostCreateContainerProps) => {
    const { postType } = props
    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()
    const { clubId: rawClubId } = router.query
    const clubId = convertQueryParamToString(rawClubId)

    const [title, setTitle] = useState<string>('')
    const [contents, setContents] = useState<string>('')

    const handleCreatePost = useCallback(() => {
        console.log(contents)
        if (clubId) {
            dispatch(postActions.createPost({
                clubId: parseInt(clubId),
                post: {
                    tagIdList: [],
                    title,
                    content: contents,
                    type: postType,
                },
            }))
        }
        // router.push('/club/1/post/1?type=scheduling')
    }, [clubId, contents, dispatch, postType, title])

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
            showDateTimePicker={postType === PostType.SCHEDULING}
            isEdit={false}
        />
    </VStack>
}
