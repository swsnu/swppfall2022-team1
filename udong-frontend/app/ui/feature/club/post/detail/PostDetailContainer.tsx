import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { PostType } from '../../../../../domain/model/PostType'
import { dummyTagsDanpung } from '../../../../../domain/model/Tag'
import { dummyUserMe } from '../../../../../domain/model/User'
import { postSelector } from '../../../../../domain/store/post/PostSelector'
import { Spacer } from '../../../../components/Spacer'
import { HStack, VStack } from '../../../../components/Stack'
import { UdongButton } from '../../../../components/UdongButton'
import { UdongChip } from '../../../../components/UdongChip'
import { UdongHeader } from '../../../../components/UdongHeader'
import { UdongText } from '../../../../components/UdongText'
import { UdongColors } from '../../../../theme/ColorPalette'
import { DeleteModal } from '../../../shared/DeleteModal'
import { ScrollToTopButton } from '../../../shared/ScrollToTopButton'
import { PostDetailCommentsView } from './PostDetailCommentsView'
import { PostDetailContentView } from './PostDetailContentView'
import { PostDetailEnrollmentView } from './PostDetailEnrollmentView'
import { PostDetailSchedulingView } from './PostDetailSchedulingView'

const getQueryParam = (queryParam: string | string[] | undefined): PostType => {
    if (queryParam === undefined) {
        return PostType.ANNOUNCEMENT
    }

    if (queryParam instanceof Array) {
        return queryParam.join('') as PostType
    } else {
        return queryParam as PostType
    }
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

export const PostDetailContainer = () => {
    const router = useRouter()
    // const { type } = router.query
    const [postType, setPostType] = useState<PostType>(PostType.ANNOUNCEMENT)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const post = useSelector(postSelector.selectedPost)

    // 위에 default 값은 건드리지 말고 테스트할 때 여기서 값 바꿔가면서 쓰기!
    useEffect(() => {
        if (post) {
            setPostType(post.type)
        }
    }, [])

    return <VStack paddingHorizontal={16}>
        <UdongHeader
            title={'겨울 공연 중요 공지!'}
            onGoBack={() => router.back()}
            subtitle={getSubtitle(postType)}
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
                >2022년 겨울 공연</UdongText>
                <Spacer height={15}/>
            </VStack>

            <HStack justifyContent={'center'}>
                {dummyTagsDanpung.map((tag) => {
                    return <HStack
                        key={tag.name}
                        paddingHorizontal={6}
                    >
                        <UdongChip
                            color={tag.users.includes(dummyUserMe) ? UdongColors.Primary : UdongColors.GrayNormal}
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

        {postType === PostType.ENROLLMENT && <PostDetailEnrollmentView/>}

        {postType === PostType.SCHEDULING && <PostDetailSchedulingView/>}

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
