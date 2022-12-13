// day: 0 ~ 6 Mon ~ Sun

import { SchedulingPostType } from '../domain/model/SchedulingPostType'
import { DayTime, Time } from '../domain/model/Time'

export const getDatesOfDay = (day: number, originalTime: Time) : Array<DayTime> => {
    const result: Array<DayTime> = []
    const firstDateOfMonth = new Date()
    firstDateOfMonth.setDate(1)
    const lastDateOfMonth = (new Date(2008, firstDateOfMonth.getMonth() + 1, 0))
    const dayDiff = ((day + 7) - (firstDateOfMonth.getDay() - 1)) % 7
    const date = new Date()
    date.setDate(1 + dayDiff)
    while (date.getDate() <= lastDateOfMonth.getDate()){
        result.push({
            type: SchedulingPostType.DATES,
            startTime: originalTime.startTime,
            endTime: originalTime.endTime,
            startDate: date.toISOString(),
            endDate: date.toISOString() })
        date.setDate(date.getDate() + 7)
    }
    return result
}

