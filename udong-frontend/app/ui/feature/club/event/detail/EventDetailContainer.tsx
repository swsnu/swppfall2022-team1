import { useRouter } from 'next/router'

import { Spacer } from '../../../../components/Spacer'
import { VStack } from '../../../../components/Stack'
import { UdongButton } from '../../../../components/UdongButton'
import { UdongHeader } from '../../../../components/UdongHeader'
import { UdongText } from '../../../../components/UdongText'
import { UdongColors } from '../../../../theme/ColorPalette'
import { PostItem } from '../../../shared/PostItem'

export const EventDetailContainer = () => {
    const router = useRouter()

    return <VStack paddingHorizontal={16}>
        <UdongHeader
            title={'MT'}
            onGoBack={() => router.back()}
            rightButtons={<>
                <UdongButton
                    style={'line'}
                    color={UdongColors.Primary}
                    height={40}
                    onClick={() => {return}}
                >
                    수정하기
                </UdongButton>

                <Spacer width={15}/>

                <UdongButton
                    style={'line'}
                    color={UdongColors.Warning}
                    height={40}
                    onClick={() => {return}}
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

        <PostItem isEventDetail={true}/>
        <PostItem isEventDetail={true}/>
        <PostItem isEventDetail={true}/>
        <PostItem isEventDetail={true}/>
    </VStack>
}
