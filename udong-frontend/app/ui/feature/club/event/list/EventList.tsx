import React from 'react'

import { Spacer } from '../../../../components/Spacer'
import { VStack } from '../../../../components/Stack'
import { UdongColors } from '../../../../theme/ColorPalette'
import { EventType } from '../EventContainer'

interface EventListProps{
    events: EventType[]
    onClickEvent: (eventId: string) => void
}

export const EventList = ({ events, onClickEvent } : EventListProps) => {
    return <VStack width={'100%'}>
        <Spacer
            height={1}
            backgroundColor={UdongColors.GrayBright}
        />
        <p onClick={() => onClickEvent('0')}>
            {events[0].title}
        </p>
    </VStack>
}
