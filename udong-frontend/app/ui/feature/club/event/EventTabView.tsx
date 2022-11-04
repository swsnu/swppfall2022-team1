import { useCallback } from 'react'

import { HStack } from '../../../components/Stack'

export type EventTabType = EVENT_TAB

export enum EVENT_TAB {
    CALENDAR = 'calendar',
    LIST = 'list',
}

interface EventTabViewProps {
    selectedTab?: EventTabType
    setSelectedTab: (view: EventTabType) => void
}

export const EventTabView = (props: EventTabViewProps) => {
    const { selectedTab, setSelectedTab } = props

    const handleOnViewClick = useCallback((view: EventTabType) => {
        setSelectedTab(view)
    }, [setSelectedTab])

    return <HStack height={30}>
        <button
            disabled={selectedTab === EVENT_TAB.CALENDAR}
            onClick={() => handleOnViewClick(EVENT_TAB.CALENDAR)}
        >calendar</button>
        <button
            disabled={selectedTab === EVENT_TAB.LIST}
            onClick={() => handleOnViewClick(EVENT_TAB.LIST)}
        >list</button>
    </HStack>
}
