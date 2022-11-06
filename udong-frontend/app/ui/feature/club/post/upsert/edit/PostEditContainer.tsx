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
}

export const PostEditContainer = (props: PostEditContainerProps) => {
    const { postType } = props
    const router = useRouter()
    const [title, setTitle] = useState<string>('')
    const [contents, setContents] = useState<string>('Hello World!!!')

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
        {/*코드 중복 일어날 것 같아..*/}

        <PostInputView
            title={title}
            setTitle={setTitle}
            contents={contents}
            setContents={setContents}
        />
        <PostAdditionalFieldsView showDateTimePicker={postType === 'scheduling'}/>
    </VStack>}
