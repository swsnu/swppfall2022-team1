import { useRouter } from 'next/router'
import { useState } from 'react'

import { PostType } from '../../../../../../domain/model/PostType'
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
    const router = useRouter()
    const [title, setTitle] = useState<string>('')
    const [contents, setContents] = useState<string>('')

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
                    onClick={() => {router.push('/club/1/post/1?type=scheduling')}}
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
