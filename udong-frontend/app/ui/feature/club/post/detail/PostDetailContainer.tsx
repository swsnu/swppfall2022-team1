import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { Spacer } from '../../../../components/Spacer'
import { HStack, VStack } from '../../../../components/Stack'
import { UdongButton } from '../../../../components/UdongButton'
import { UdongChip } from '../../../../components/UdongChip'
import { UdongHeader } from '../../../../components/UdongHeader'
import { UdongText } from '../../../../components/UdongText'
import { UdongColors } from '../../../../theme/ColorPalette'
import { DeleteModal } from '../../../shared/DeleteModal'
import { ScrollToTopButton } from '../../../shared/ScrollToTopButton'
import { PostType } from '../upsert/create/PostCreateContainer'
import { PostDetailCommentsView } from './PostDetailCommentsView'
import { PostDetailContentView } from './PostDetailContentView'
import { PostDetailEnrollmentView } from './PostDetailEnrollmentView'
import { PostDetailSchedulingView } from './PostDetailSchedulingView'

const tags = [
    {
        name: '전체',
        isUserIncluded: true,
    },
    {
        name: '2022 겨울 공연 1팀',
        isUserIncluded: true,
    },
    {
        name: '2022 겨울 공연 3팀',
        isUserIncluded: false,
    },
    {
        name: '2022 겨울 공연 4팀',
        isUserIncluded: false,
    },
    {
        name: '2022 겨울 공연 2팀',
        isUserIncluded: false,
    },
]

export const PostDetailContainer = () => {
    const router = useRouter()
    const [postType, setPostType] = useState<PostType>('announcement')
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    // 위에 default 값은 건드리지 말고 테스트할 때 여기서 값 바꿔가면서 쓰기!
    useEffect(() => {
        setPostType('scheduling')
    }, [])

    return <VStack paddingHorizontal={16}>
        <UdongHeader
            title={'MT 수요조사입니다'}
            onGoBack={() => router.back()}
            rightButtons={<>
                <UdongButton
                    style={'line'}
                    color={UdongColors.Primary}
                    height={40}
                    onClick={() => router.push(`/club/1/post/1/edit/?type=${postType}`)}
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
            <VStack onClick={() => router.push('/club/1/event/1')}>
                <UdongText
                    style={'ListContentUnderscore'}
                    cursor={'pointer'}
                >MT</UdongText>
                <Spacer height={15}/>
            </VStack>

            <HStack justifyContent={'center'}>
                {tags.map((tag) => {
                    return <HStack
                        key={tag.name}
                        paddingHorizontal={6}
                    >
                        <UdongChip
                            color={tag.isUserIncluded ? UdongColors.Primary : UdongColors.GrayNormal}
                            style={'fill'}
                            text={tag.name}
                        />
                    </HStack>
                })}
            </HStack>
            <Spacer height={15}/>
        </VStack>

        <Spacer
            height={1}
            backgroundColor={UdongColors.GrayBright}
        />
        <PostDetailContentView/>

        {postType === 'enrollment' && <PostDetailEnrollmentView/>}

        {postType === 'scheduling' && <PostDetailSchedulingView/>}

        <HStack>
            <UdongText style={'ListContentXS'}>2022.09.10</UdongText>
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
