import { Spacer } from '../../../../components/Spacer'
import { HStack, VStack } from '../../../../components/Stack'
import { UdongChip } from '../../../../components/UdongChip'
import { UdongText } from '../../../../components/UdongText'
import { UdongColors } from '../../../../theme/ColorPalette'
import { DetailPageHeader } from '../../../shared/DetailPageHeader'
import { PostDetailCommentsView } from './PostDetailCommentsView'
import { PostDetailContentView } from './PostDetailContentView'

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
    return <VStack paddingHorizontal={16}>
        <DetailPageHeader
            type={'post'}
            title={'MT 수요조사입니다'}
            subtitle={'인원 모집 중입니다'}
        />
        <Spacer height={45}/>

        <VStack alignItems={'center'}>
            <UdongText style={'ListContentUnderscore'}>MT</UdongText>
            <Spacer height={15}/>

            <HStack justifyContent={'center'}>
                {tags.map((tag) => {
                    return <HStack
                        key={tag.name}
                        paddingHorizontal={6}
                    >
                        <UdongChip
                            style={tag.isUserIncluded ? 'primary' : 'gray'}
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
        <Spacer
            height={1}
            backgroundColor={UdongColors.GrayBright}
        />

        <PostDetailCommentsView/>
    </VStack>
}
