import { EventObject } from '@toast-ui/calendar/types/types/events'
import ToastUIReactCalendar from '@toast-ui/react-calendar'
import React, { useEffect, useState } from 'react'
import '@toast-ui/calendar/dist/toastui-calendar.css'

import { ClubEvent } from '../../../../../domain/model/ClubEvent'
import { SchedulingPostType } from '../../../../../domain/model/SchedulingPostType'
import { getDatesOfDay } from '../../../../../utility/eventDateUtils'
import { UdongColors } from '../../../../theme/ColorPalette'

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
        return `hsl(234,50%,${45 + (seed * 0.2)}%)`
    } else {
        return `hsl(234,50%,${80 + (seed * 0.15)}%)`
    }
}

interface CalenderProps {
    events: Array<ClubEvent>
    calendarRef: React.RefObject<ToastUIReactCalendar>
    onClickEvent: (id: string) => void
}

export const Calender = ( { events, calendarRef, onClickEvent } : CalenderProps ) => {
    const [calendarEvents, setCalendarEvents] = useState<EventObject[]>([])

    useEffect(()=>{
        let coloredEvents: EventObject[] = []
        events.forEach((event, i)=>{
            event.times.forEach((time) => {
                const seed = ((new Date(event.createdAt)).getTime() / 17) % 100
                if (time.type === SchedulingPostType.DATES){
                    const startTime = new Date(time.startDate)
                    startTime.setTime(startTime.getTime() + (1000 * 60 * 30 * time.startTime))
                    const endTime = new Date(time.endDate)
                    endTime.setTime(endTime.getTime() + (1000 * 60 * 30 * time.endTime))
                    coloredEvents = [...coloredEvents,
                        {
                            id: `${i}`, calendarId: '0', title: event.name, body: `${event.id}`,
                            backgroundColor: randomPrimaryColor(seed), borderColor: 'rgba(0,0,0,0)',
                            color: seed % 2 ? 'white' : 'black',
                            start: startTime, end: endTime,
                        }]
                } else {
                    const newTimes = getDatesOfDay(time)
                    newTimes.forEach((newTime) => {
                        const startTime = new Date(newTime.startDate)
                        startTime.setTime(startTime.getTime() + (1000 * 60 * 30 * newTime.startTime))
                        const endTime = new Date(newTime.endDate)
                        endTime.setTime(endTime.getTime() + (1000 * 60 * 30 * newTime.endTime))
                        coloredEvents = [...coloredEvents,
                            {
                                id: `${i}`, calendarId: '0', title: event.name, body: `${event.id}`,
                                backgroundColor: randomPrimaryColor(seed), borderColor: 'rgba(0,0,0,0)',
                                color: seed % 2 ? 'white' : 'black',
                                start: startTime, end: endTime,
                            }]
                    })
                }
            },
            )
        })
        setCalendarEvents(coloredEvents)
    }, [events])

    return (
        <ToastUIReactCalendar
            ref={calendarRef}
            view={'month'}
            calendars={calendars}
            events={calendarEvents}
            isReadOnly={true}
            useDetailPopup={false}
            useFormPopup={false}
            template={template}
            theme={theme}
            month={month}
            onClickEvent={(eventInfo) => {
                onClickEvent(eventInfo.event.body)
            }}
        />
    )
}
