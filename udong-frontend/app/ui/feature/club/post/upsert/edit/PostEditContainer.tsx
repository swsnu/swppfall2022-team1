import { useRouter } from 'next/router'
import { useState } from 'react'

import { VStack } from '../../../../../components/Stack'
import { UdongButton } from '../../../../../components/UdongButton'
import { UdongHeader } from '../../../../../components/UdongHeader'
import { UdongColors } from '../../../../../theme/ColorPalette'
import { PostType } from '../create/PostCreateContainer'
import { PostAdditionalFieldsView } from '../PostAdditionalFieldsView'
import { PostInputView } from '../PostInputView'

interface PostEditContainerProps {
    postType: PostType
    // 코드 중복 제거를 위해 일단 더미부터 넣음 ㅋ
    content?: string
}

export const PostEditContainer = (props: PostEditContainerProps) => {
    const { postType, content = 'Hello World!' } = props
    const router = useRouter()
    const [title, setTitle] = useState<string>('')
    const [contents, setContents] = useState<string>(content)

    return <VStack paddingHorizontal={16}>
        <UdongHeader
            title={'게시글 수정하기'}
            subtitle={'일반 공지글'}
            onGoBack={() => router.back()}
            rightButtons={
                <UdongButton
                    style={'line'}
                    color={UdongColors.Primary}
                    height={40}
                    onClick={() => {return}}
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
            showDateTimePicker={postType === 'scheduling'}
            isEdit={true}
        />
    </VStack>}
