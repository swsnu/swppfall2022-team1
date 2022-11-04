import { Spacer } from '../../../../components/Spacer'
import { HStack, VStack } from '../../../../components/Stack'
import { UdongButton } from '../../../../components/UdongButton'
import { UdongText } from '../../../../components/UdongText'
import { UdongColors } from '../../../../theme/ColorPalette'

export const PostDetailContentView = () => {
    return <VStack>
        <Spacer height={30}/>
        <UdongText
            style={'GeneralContent'}
            whiteSpace={'pre-line'}
        >
            {`안녕하세요?
            모두가 기다리던 MT를 드디어 가려고 합니다.

            날짜는 그냥 마음대로 정했습니다.
            되시는 분만 오시면 됩니다.

            MT 장소는 제주도 서귀포입니다.
            고등어회를 꼭 먹고 싶습니다. 고등어 봉초밥도 먹고싶습니다. 그냥 활어회도 좋습니다.
            봄베이 브램블에 토닉을 1:6으로 섞어 같이 먹으려고 합니다.
            소주는 밴입니다.

            많은 참석 부탁드립니다.
            이상입니다.`}
        </UdongText>

        <Spacer height={60}/>
        <VStack alignItems={'center'}>
            <UdongText
                style={'GeneralContent'}
                color={UdongColors.Primary}
            >
                현재 n명 지원
            </UdongText>
        </VStack>

        <Spacer height={30}/>
        <HStack justifyContent={'space-between'}>
            <HStack
                flex={1}
                style={{ marginLeft: 'auto' }}
            />

            <HStack flex={1}>
                <UdongButton
                    style={'fill'}
                    onClick={() => console.log('현황 보기')}
                >
                    현황 보기
                </UdongButton>

                <Spacer width={60}/>

                <UdongButton
                    style={'fill'}
                    onClick={() => console.log('지원')}
                >
                    지원하기
                </UdongButton>
            </HStack>

            <HStack
                flex={1}
                style={{ marginRight: 'auto' }}
                justifyContent={'end'}
            >
                <UdongButton
                    style={'line'}
                    onClick={() => console.log('마감')}
                >
                    마감하기
                </UdongButton>
            </HStack>
        </HStack>

        <HStack>
            <UdongText style={'ListContentXS'}>2022.09.10</UdongText>
            <Spacer width={10}/>
            <UdongText style={'ListContentXS'}>박지연</UdongText>
        </HStack>

        <Spacer height={10}/>
    </VStack>
}
