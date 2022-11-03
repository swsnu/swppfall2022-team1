import { VStack } from '../../../components/Stack'
import { EventCalendarView } from './calendar/EventCalendarView'

export const EventContainer = () => {

    return <VStack>
        <h1>Event container</h1>
        <p>hello world</p>
        <EventCalendarView/>
    </VStack>
}
