import { Spacer } from '../../../../components/Spacer'
import { VStack } from '../../../../components/Stack'
import { UdongText } from '../../../../components/UdongText'
import { DetailPageHeader } from '../../../shared/DetailPageHeader'
import { PostItem } from '../../../shared/PostItem'

export const EventDetailContainer = () => {
    return <VStack paddingHorizontal={16}>
        <DetailPageHeader
            type={'event'}
            title={'MT'}
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
