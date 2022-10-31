import { useState } from 'react'

import { Spacer } from '../../app/ui/components/Spacer'
import { HStack, VStack } from '../../app/ui/components/Stack'
import { UdongButton } from '../../app/ui/components/UdongButton'
import { UdongChip } from '../../app/ui/components/UdongChip'
import { UdongModal } from '../../app/ui/components/UdongModal'
import { UdongText } from '../../app/ui/components/UdongText'
import { UdongTextField } from '../../app/ui/components/UdongTextField'
import { UdongColors } from '../../app/ui/theme/ColorPalette'

export const DummyPage = () => {
    const [isOpen, setIsOpen] = useState(false)

    return <VStack paddingHorizontal={32}>
        <h1>This page introduces how to use the custom-made components.</h1>

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

        <UdongButton
            style={'fill'}
            onClick={() => setIsOpen(true)}
        >
            Open MOdal
        </UdongButton>
        <UdongModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
        >
            <p>hell oworld</p>
        </UdongModal>
    </VStack>
}

export default DummyPage
