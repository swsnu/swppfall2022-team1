import '@toast-ui/calendar/dist/toastui-calendar.css'
import { EventObject } from '@toast-ui/calendar/types/types/events'
import ToastUIReactCalendar from '@toast-ui/react-calendar'
import React from 'react'

import { UdongColors } from '../../../../theme/ColorPalette'
import { EventType } from './EventCalendarView'

const calendars = [
    {
        id: '0',
        name: 'Club Calendar',
        bgColor: UdongColors.White,
        borderColor: UdongColors.GrayNormal,
    }]

const template = {
    monthGridHeaderExceed(){
        return ''
    },
    monthGridFooterExceed(count: number) {
        return `<span>${count} more</span>`
    },
}

const theme = {
    common: {
        today: {
            color: UdongColors.White,
        },
    },
    month: {
        moreView: {
            border: 'none',
            boxShadow: '0 2px 3px 0 rgba(0,0,0,0.25)',
            height: 'auto',
            paddingBottom: '25px',
        },
        gridCell: {
            headerHeight: 35,
            footerHeight: 25,
        },
    },
}

const month = {
    isAlways6Weeks: false,
}

const randomPrimaryColor = (seed: number) => {
    if (seed % 2){
        return `hsl(234,50%,${45 + (Math.random() * 20)}%)`
    } else {
        return `hsl(234,50%,${80 + (Math.random() * 15)}%)`
    }
}

interface CalenderProps {
    events: EventType[]
    calendarRef: React.RefObject<ToastUIReactCalendar>
    onClickEvent: (id: string) => void
}

export const Calender = ( { events, calendarRef, onClickEvent } : CalenderProps ) => {
    let coloredEvents: EventObject[] = []

    events.forEach((event, i)=>{
        event.times.forEach((time: { start: string, end: string }) => {
            coloredEvents = [...coloredEvents,
                {
                    id: `${i}`, calendarId: '0', title: event.title, body: `${event.id}`,
                    backgroundColor: randomPrimaryColor(parseInt(event.id)), borderColor: 'rgba(0,0,0,0)',
                    color: parseInt(event.id) % 2 ? 'white' : 'black',
                    start: time.start, end: time.end,
                }]
        },
        )
    })

    return (
        <ToastUIReactCalendar
            ref={calendarRef}
            view={'month'}
            calendars={calendars}
            events={coloredEvents}
            isReadOnly={true}
            useDetailPopup={false}
            useFormPopup={false}
            template={template}
            theme={theme}
            month={month}
            onClickEvent={(eventInfo) => {
                onClickEvent(eventInfo.event.id)
            }}
        />
    )
}
