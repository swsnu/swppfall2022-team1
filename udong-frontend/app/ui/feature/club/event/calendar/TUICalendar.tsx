
import '@toast-ui/calendar/dist/toastui-calendar.css'
import { EventObject } from '@toast-ui/calendar/types/types/events'
import ToastUIReactCalendar from '@toast-ui/react-calendar'
import { useRef } from 'react'

import { UdongColors } from '../../../../theme/ColorPalette'

const calendars = [
    {
        id: '0',
        name: 'Club Calendar',
        bgColor: UdongColors.White,
        borderColor: UdongColors.GrayNormal,
    }]

const template = {
}

type CalenderProps = {
    events: EventObject[]
}

export const Calender = ( { events } : CalenderProps ) => {
    const calenderRef = useRef<ToastUIReactCalendar>(null)

    return (
        <div>
            <button onClick={()=> {calenderRef.current?.getInstance()?.prev()}}>prev</button>
            <button onClick={()=> {calenderRef.current?.getInstance()?.today()}}>today</button>
            <button onClick={()=> {calenderRef.current?.getInstance()?.next()}}>next</button>
            <ToastUIReactCalendar
                ref={calenderRef}
                height={'700px'}
                view={'month'}
                calendars={calendars}
                events={events}
                isReadOnly={true}
                template={template}
                useDetailPopup={false}
                useFormPopup={false}
                onClickEvent={(eventInfo) => {
                    alert(`go to ${eventInfo.event.title}`)
                }}
            />
        </div>)
}
