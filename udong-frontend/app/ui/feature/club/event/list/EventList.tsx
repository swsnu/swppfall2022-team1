import React, { useRef, useState } from 'react'

import { ClubEvent } from '../../../../../domain/model/ClubEvent'
import { useDebouncedSearch } from '../../../../../utility/useDebouncedSearch'
import { Spacer } from '../../../../components/Spacer'
import { VStack } from '../../../../components/Stack'
import { UdongSearchBar } from '../../../../components/UdongSearchBar'
import { UdongColors } from '../../../../theme/ColorPalette'
import { EventItem } from './EventItem'

interface EventListProps{
    events: Array<ClubEvent>
    onClickEvent: (eventId: number) => void
}

export const EventList = ({ events, onClickEvent } : EventListProps) => {
    const searchRef = useRef<HTMLInputElement | undefined>(null)
    const [searchValue, setSearchValue] = useState('')
    const [keyword, setKeyword] = useState('')
    useDebouncedSearch(searchValue, setKeyword, 300)

    return <VStack width={'100%'}>
        <UdongSearchBar
            inputRef={searchRef}
            onChange={()=>{setSearchValue(searchRef.current?.value ?? '')}}
        />
        <Spacer height={8}/>
        {events.filter((event)=>{return (event.name.includes(keyword))}).map((event) =>(
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
