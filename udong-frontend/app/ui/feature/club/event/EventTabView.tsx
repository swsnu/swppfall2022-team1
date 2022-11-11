import { useCallback } from 'react'

import { Spacer } from '../../../components/Spacer'
import { HStack, VStack } from '../../../components/Stack'
import { UdongSelectableIcon } from '../../../components/UdongSelectableIcon'
import IcCalendarOff from '../../../icons/IcCalendarOff.png'
import IcCalendarOn from '../../../icons/IcCalendarOn.png'
import IcListOff from '../../../icons/IcListOff.png'
import IcListOn from '../../../icons/IcListOn.png'
import { UdongColors } from '../../../theme/ColorPalette'

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

    const handleOnViewClick = useCallback((tab: EventTabType) => {
        setSelectedTab(tab)
    }, [setSelectedTab])

    return <HStack
        height={30}
        gap={10}
    >
        <VStack
            width={35}
            justifyContent={'space-between'}
        >
            <HStack
                width={35}
                justifyContent={'center'}
            >
                <UdongSelectableIcon
                    selected={selectedTab === EVENT_TAB.CALENDAR}
                    selectedIcon={IcCalendarOn}
                    unselectedIcon={IcCalendarOff}
                    onClickUnSelected={()=>handleOnViewClick(EVENT_TAB.CALENDAR)}
                />
            </HStack>
            {selectedTab === EVENT_TAB.CALENDAR ?
                <Spacer
                    height={2}
                    backgroundColor={UdongColors.Primary}
                /> : <Spacer
                    height={1}
                    backgroundColor={UdongColors.GrayBright}
                />
            }
        </VStack>
        <VStack
            width={35}
            justifyContent={'space-between'}
        >
            <HStack
                width={35}
                justifyContent={'center'}
            >
                <UdongSelectableIcon
                    selected={selectedTab === EVENT_TAB.LIST}
                    selectedIcon={IcListOn}
                    unselectedIcon={IcListOff}
                    onClickUnSelected={()=>handleOnViewClick(EVENT_TAB.LIST)}
                />
            </HStack>
            {selectedTab === EVENT_TAB.LIST ?
                <Spacer
                    height={2}
                    backgroundColor={UdongColors.Primary}
                /> : <Spacer
                    height={1}
                    backgroundColor={UdongColors.GrayBright}
                />
            }
        </VStack>
    </HStack>
}
