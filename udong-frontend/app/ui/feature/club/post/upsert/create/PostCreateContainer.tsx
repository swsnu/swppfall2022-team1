import { useRouter } from 'next/router'
import { useState } from 'react'

import { VStack } from '../../../../../components/Stack'
import { UdongButton } from '../../../../../components/UdongButton'
import { UdongHeader } from '../../../../../components/UdongHeader'
import { UdongColors } from '../../../../../theme/ColorPalette'
import { PostAdditionalFieldsView } from '../PostAdditionalFieldsView'
import { PostInputView } from '../PostInputView'

export const PostCreateContainer = () => {
    const router = useRouter()
    const [title, setTitle] = useState<string>('')
    const [contents, setContents] = useState<string>('')

    return <VStack paddingHorizontal={16}>
        <UdongHeader
            title={'게시글 쓰기'}
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
        <PostAdditionalFieldsView/>
    </VStack>
}
