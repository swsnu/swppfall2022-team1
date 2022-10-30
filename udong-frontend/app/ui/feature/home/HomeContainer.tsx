import { useRouter } from 'next/router'
import { useCallback } from 'react'

import { Spacer } from '../../components/Spacer'
import { HStack, VStack } from '../../components/Stack'
import { UdongButton } from '../../components/UdongButton'
import { UdongChip } from '../../components/UdongChip'
import { UdongText } from '../../components/UdongText'
import { UdongTextField } from '../../components/UdongTextField'
import { UdongColors } from '../../theme/ColorPalette'
import { FeedView } from './feed/FeedView'
import { HomeTabType, HomeTabView } from './HomeTabView'
import { MyDongView } from './mydong/MyDongView'

interface HomeContainerProps {
    tab: HomeTabType
}

export const HomeContainer = (props: HomeContainerProps) => {
    const { tab } = props
    const router = useRouter()

    const handleCurrentTab = useCallback((selectedTab: HomeTabType) => {
        router.replace(`/?tab=${selectedTab}`)
    }, [])

    return (
        <VStack paddingHorizontal={16}>
            <UdongText
                style={'ListTitle'}
                color={UdongColors.Primary}
            >
                Home containerrrrrr
            </UdongText>

            <VStack gap={16}>
                <UdongButton
                    onClick={() => console.log('hello world')}
                    style={'fill'}
                >
                    제출 제출
                </UdongButton>
                <UdongButton
                    onClick={() => console.log('hello world')}
                    style={'line'}
                >
                    제출 제출
                </UdongButton>
                <UdongButton
                    onClick={() => console.log('hello world')}
                    style={'line'}
                    color={UdongColors.Warning}
                >제출 제출</UdongButton>
            </VStack>

            <Spacer height={16}/>
            <HStack gap={16}>
                <UdongChip
                    style={'primary'}
                    onClick={() => console.log('hello world')}
                    text={'hello world'}
                />
                <UdongChip
                    style={'gray'}
                    onClick={() => console.log('hello world')}
                    text={'hello world'}
                />
                <UdongChip
                    style={'secondary'}
                    onClick={() => console.log('hello world')}
                    text={'hello world'}
                />
                <UdongChip
                    style={'line'}
                    onClick={() => console.log('hello world')}
                    text={'hello world'}
                />
            </HStack>

            <Spacer height={16}/>
            <HStack>
                <UdongTextField defaultValue={''}/>
            </HStack>

            <Spacer height={24}/>
            <HomeTabView
                selectedTab={tab}
                setSelectedTab={handleCurrentTab}
            />

            <Spacer height={24}/>
            {tab === 'feed' ?
                <FeedView/>
                :
                <MyDongView/>
            }
        </VStack>
    )
}
