import { Spacer } from '../../components/Spacer'
import { HStack, VStack } from '../../components/Stack'
import { UdongChip } from '../../components/UdongChip'
import { UdongText } from '../../components/UdongText'
import { UdongColors } from '../../theme/ColorPalette'

export const PostItem = () => {
    return <VStack>
        <Spacer
            height={1}
            backgroundColor={UdongColors.GrayBright}
        />

        <VStack
            paddingVertical={12}
            paddingHorizontal={20}
            gap={12}
        >
            <HStack alignItems={'center'}>
                <UdongText style={'ListContentUnderscore'}>
                    단풍
                </UdongText>
                <UdongText
                    style={'ListContentS'}
                    margin={'0 4px'}
                >
                    {'>'}
                </UdongText>
                <UdongText style={'ListContentUnderscore'}>
                    2022년 겨울 공연
                </UdongText>

                <Spacer width={30}/>

                <UdongChip
                    style={'primary'}
                    onClick={() => console.log('TAG!')}
                    text={'2022년 겨울 공연 3팀'}
                />
                <Spacer width={12}/>
                <UdongChip
                    style={'gray'}
                    onClick={() => console.log('TAG!')}
                    text={'2022년 겨울 공연 4팀'}
                />
            </HStack>

            <UdongText style={'ListTitle'}>
                이번 스프린트도 파이팅입니다
            </UdongText>

            <HStack>
                <UdongText
                    style={'ListContentXS'}
                    fontWeight={'bold'}
                    color={UdongColors.Primary}
                >
                    인원 모집 중
                </UdongText>

                <Spacer width={30}/>

                <UdongText style={'ListContentXS'}>
                    5시간 전
                </UdongText>
            </HStack>
        </VStack>
    </VStack>
}
