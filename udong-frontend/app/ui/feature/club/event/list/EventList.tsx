import React from 'react'

import { Spacer } from '../../../../components/Spacer'
import { VStack } from '../../../../components/Stack'
import { UdongSearchBar } from '../../../../components/UdongSearchBar'
import { UdongColors } from '../../../../theme/ColorPalette'
import { EventType } from '../EventContainer'
import { EventItem } from './EventItem'

interface EventListProps{
    events: EventType[]
    onClickEvent: (eventId: string) => void
}

export const EventList = ({ events, onClickEvent } : EventListProps) => {
    return <VStack width={'100%'}>
        <UdongSearchBar/>
        <Spacer height={8}/>
        {events.map((event) =>(
            <EventItem
                key={event.id}
                event={event}
                onClickEvent={onClickEvent}
            />
        ))}
        <Spacer
            height={1}
            backgroundColor={UdongColors.GrayBright}
        />
    </VStack>
}
