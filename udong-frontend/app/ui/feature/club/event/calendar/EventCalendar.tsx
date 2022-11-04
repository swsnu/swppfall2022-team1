import ToastUICalendar from '@toast-ui/calendar'
import ToastUIReactCalendar from '@toast-ui/react-calendar'
import dynamic from 'next/dynamic'
import React, { useEffect, useMemo, useRef, useState } from 'react'

import { HStack, VStack } from '../../../../components/Stack'
import { UdongButton } from '../../../../components/UdongButton'
import { UdongImage } from '../../../../components/UdongImage'
import UdongLoader from '../../../../components/UdongLoader'
import { UdongText } from '../../../../components/UdongText'
import arrow from '../../../../icons/IcShortArrow.png'
import { UdongColors } from '../../../../theme/ColorPalette'
import { EventType } from '../EventContainer'

interface EventCalendarProps {
    events: EventType[]
    onClickEvent: (eventId: string) => void
}

export const EventCalendar = ({ events, onClickEvent } : EventCalendarProps) => {
    const [date, setDate] = useState<{ year: number, month: number }>()
    const calendarRef = useRef<ToastUIReactCalendar>(null)

    const syncDate = () => {
        if (calendarRef.current) {
            const calendar = calendarRef.current.getInstance()
            if (calendar){
                setDate({ year: calendar.getDate().getFullYear(),
                    month: calendar.getDate().getMonth() })}
        }
    }

    const Calendar = useMemo(() => dynamic(() => import('./TUICalendar').then((mod)=>mod.Calender),
        { ssr: false, loading: () =>
            <UdongLoader/> }), [])

    useEffect(() => {
        const today = new Date()
        setDate({ year: today.getFullYear(), month: today.getMonth() })
    }, [])

    return <VStack width={'100%'}>
        <HStack
            paddingHorizontal={15}
            paddingVertical={15}
            gap={15}
            alignItems={'center'}
        >
            <UdongButton
                style={'fill'}
                onClick={()=> {
                    calendarRef.current?.getInstance()?.today()
                    syncDate()
                }}
            >Today</UdongButton>
            <UdongButton
                style={'line'}
                borderRadius={'15px'}
                padding={'8px 8px'}
                color={UdongColors.GrayNormal}
                onClick={()=> {
                    calendarRef.current?.getInstance()?.prev()
                    syncDate()
                }}
            >
                <UdongImage
                    src={arrow.src}
                    height={10}
                    width={10}
                    style={{ transform: 'scaleX(-1)' }}
                />
            </UdongButton>
            {date ? <UdongText
                style={'GeneralTitle'}
                width={'60px'}
                textAlign={'center'}
            >{date.year}.{date.month !== undefined ? date.month + 1 : undefined}</UdongText> : <></>}
            <UdongButton
                style={'line'}
                borderRadius={'15px'}
                padding={'8px 8px'}
                color={UdongColors.GrayNormal}
                onClick={()=> {
                    calendarRef.current?.getInstance()?.next()
                    syncDate()
                }}
            >
                <UdongImage
                    src={arrow.src}
                    height={10}
                    width={10}
                />
            </UdongButton>
        </HStack>
        <Calendar
            events={events}
            calendarRef={calendarRef}
            onClickEvent={onClickEvent}
        />
    </VStack>
}
