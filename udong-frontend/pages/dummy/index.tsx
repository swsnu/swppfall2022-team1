/* eslint-disable no-console */
import { useState } from 'react'

import { Spacer } from '../../app/ui/components/Spacer'
import { HStack, VStack } from '../../app/ui/components/Stack'
import { UdongButton } from '../../app/ui/components/UdongButton'
import { UdongChip } from '../../app/ui/components/UdongChip'
import { UdongModal } from '../../app/ui/components/UdongModal'
import { UdongText } from '../../app/ui/components/UdongText'
import { DraggableTimeTable } from '../../app/ui/feature/shared/DraggableTimeTable'
import { CellIdx } from '../../app/ui/feature/shared/TimeTable'
import { UdongColors } from '../../app/ui/theme/ColorPalette'

const DummyPage = () => {
    const [isOpen, setIsOpen] = useState(false)

    const [hoverIdx, setHoverIdx] = useState<CellIdx | null>(null)
    const [selected, setSelected] = useState([
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
    ])
    console.log('hover', hoverIdx)

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
                color={UdongColors.Primary}
                style={'fill'}
                onClick={() => console.log('hello world')}
                text={'hello world'}
            />
            <UdongChip
                color={UdongColors.GrayNormal}
                style={'fill'}
                onClick={() => console.log('hello world')}
                text={'hello world'}
            />
            <UdongChip
                color={UdongColors.Secondary}
                style={'fill'}
                onClick={() => console.log('hello world')}
                text={'hello world'}
            />
            <UdongChip
                color={UdongColors.Primary}
                style={'line'}
                onClick={() => console.log('hello world')}
                text={'hello world'}
            />
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
        <DraggableTimeTable
            days={['Mon', 'Tue', 'Wed', 'Thu', 'Fri']}
            data={[
                [0, 0, 1, 1, 0, 1, 1, 1],
                [2, 2, 1, 0, 0, 1, 1, 1],
                [0, 0, 1, 1, 0, 1, 1, 1],
                [2, 1, 1, 0, 0, 1, 1, 1],
                [2, 1, 1, 0, 0, 1, 1, 1],
            ]}
            gray={[
                [true, false, false, false, false, false, false, false],
                [true, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false],
                [true, true, false, false, false, false, false, false],
                [true, true, false, false, false, false, false, false],
            ]}
            startTime={5}
            style={{ marginTop: 20 }}
            onHover={setHoverIdx}
            onClick={(idx) => console.log('click', idx)}
            selected={selected}
            setSelected={setSelected}
        />
    </VStack>
}

export default DummyPage
