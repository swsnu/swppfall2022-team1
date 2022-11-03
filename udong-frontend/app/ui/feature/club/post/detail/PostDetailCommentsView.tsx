import { Spacer } from '../../../../components/Spacer'
import { HStack, VStack } from '../../../../components/Stack'
import { UdongImage } from '../../../../components/UdongImage'
import { UdongTextField } from '../../../../components/UdongTextField'
import send from '../../../../icons/IcSend.png'
import { CommentItem } from './CommentItem'

export const PostDetailCommentsView = () => {
    return <VStack>
        <Spacer height={20}/>

        <HStack alignItems={'center'}>
            <UdongTextField defaultValue={'댓글을 입력해주세요'}/>
            <Spacer width={20}/>
            <UdongImage
                src={send.src}
                height={24}
                width={24}
            />
        </HStack>

        <CommentItem
            isAuthor={true}
            name={'박지연'}
            content={'안녕하세요! 이 편지는 서울특별시 송파구 투썸플레이스 롯데월드점에서 시작되어 현재 총 12033명에게 전달되었으며, 당신은 12034번째 수신인입니다.'}
        />
        <CommentItem
            isAuthor={false}
            name={'임유진'}
            content={'안녕하세요! 이 편지는 서울특별시 송파구 투썸플레이스 롯데월드점에서 시작되어 현재 총 12033명에게 전달되었으며, 당신은 12034번째 수신인입니다.' +
                '안녕하세요! 이 편지는 서울특별시 송파구 투썸플레이스 롯데월드점에서 시작되어 현재 총 12033명에게 전달되었으며, 당신은 12034번째 수신인입니다.'
            }
        />

        <Spacer height={20}/>
    </VStack>
}
