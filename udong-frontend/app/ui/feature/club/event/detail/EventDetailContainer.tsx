import { useRouter } from 'next/router'
import { useState } from 'react'

import { Spacer } from '../../../../components/Spacer'
import { VStack } from '../../../../components/Stack'
import { UdongButton } from '../../../../components/UdongButton'
import { UdongHeader } from '../../../../components/UdongHeader'
import { UdongText } from '../../../../components/UdongText'
import { UdongColors } from '../../../../theme/ColorPalette'
import { DeleteModal } from '../../../shared/DeleteModal'
import { ScrollToTopButton } from '../../../shared/ScrollToTopButton'

export const EventDetailContainer = () => {
    const router = useRouter()
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    return <VStack paddingHorizontal={16}>
        <UdongHeader
            title={'2022년 겨울 공연'}
            onGoBack={() => router.back()}
            rightButtons={<>
                <UdongButton
                    style={'line'}
                    color={UdongColors.Primary}
                    height={40}
                    onClick={() => {router.push('/club/1/event/1/edit')}}
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

        <UdongText style={'GeneralTitle'}>행사 시간</UdongText>
        <Spacer height={15}/>
        <VStack paddingHorizontal={16}>
            <UdongText style={'GeneralContent'}>2022.10.7     10:00     ~     2022.10.7     04:00</UdongText>
            <UdongText style={'GeneralContent'}>2022.10.8     10:00     ~     2022.10.8     04:00</UdongText>
            <UdongText style={'GeneralContent'}>2022.10.9     10:00     ~     2022.10.9     04:00</UdongText>
        </VStack>

        <Spacer height={30}/>
        <UdongText style={'GeneralTitle'}>관련 게시글</UdongText>
        <Spacer height={15}/>

        {/*{dummyEventPosts.map((post, index) => {*/}
        {/*    return <PostItem*/}
        {/*        post={post}*/}
        {/*        key={post.id + index}*/}
        {/*        isEventDetail={true}*/}
        {/*    />*/}
        {/*})}*/}

        <ScrollToTopButton/>

        <DeleteModal
            deleteObjectText={'행사'}
            warningText={'경고 문구'}
            isOpen={showDeleteModal}
            setIsOpen={setShowDeleteModal}
            onClickDelete={() => {return}}
        />
    </VStack>
}
