
import '@toast-ui/calendar/dist/toastui-calendar.css'
import { EventObject } from '@toast-ui/calendar/types/types/events'
import ToastUIReactCalendar from '@toast-ui/react-calendar'
import { useEffect, useRef, useState } from 'react'

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
            backgroundColor: 'white',
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
            footerHeight: 35,
        },
    },
}

const randomPrimaryColor = (seed: number) => {
    if (seed % 2){
        return `hsl(234,50%,${45 + (Math.random() * 20)}%)`
    } else {
        return `hsl(234,50%,${75 + (Math.random() * 20)}%)`
    }
}

interface CalenderProps {
    events: EventObject[]
}

export const Calender = ( { events } : CalenderProps ) => {
    const calendarRef = useRef<ToastUIReactCalendar>(null)
    const [date, setDate] = useState<{ year: number, month: number }>()
    const coloredEvents: EventObject[] = events.map((event)=>({
        id: `${event.id}`, calendarId: '0', title: event.title,
        backgroundColor: randomPrimaryColor(event.id), borderColor: 'rgba(0,0,0,0)', color: event.id % 2 ? 'white' : 'black',
        start: event.start, end: event.end }),
    )

    const syncDate = () => {
        if (calendarRef.current && calendarRef.current.getInstance() !== null) {
            setDate({ year: calendarRef.current.getInstance().getDate().getFullYear(),
                month: calendarRef.current.getInstance().getDate().getMonth() })}
    }

    useEffect(() => {
        syncDate()
    }, [calendarRef.current])

    return (
        <div>
            <button
                onClick={()=> {
                    calendarRef.current?.getInstance()?.prev()
                    syncDate()
                }}
            >prev</button>
            <button
                onClick={()=> {
                    calendarRef.current?.getInstance()?.today()
                    syncDate()
                }}
            >today</button>
            <span>{date.year}.{date.month ? date.month + 1 : undefined}</span>
            <button
                onClick={()=> {
                    calendarRef.current?.getInstance()?.next()
                    syncDate()
                }}
            >next</button>

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
                onClickEvent={(eventInfo) => {
                    alert(`go to ${eventInfo.event.title}`)
                }}
            />
        </div>)
}
