// day: 0 ~ 6 Mon ~ Sun

import moment, { Moment } from 'moment'

import { SchedulingPostType } from '../domain/model/SchedulingPostType'
import { DayTime, WeekdayTime } from '../domain/model/Time'
import { DayTimeWithIdType } from '../ui/feature/club/event/upsert/EventDateSchedule'
import { WeekdayTimeWithIdType } from '../ui/feature/club/event/upsert/EventDaySchedule'
import { DateRangeType } from '../ui/feature/shared/DateRangePicker'
import { DAYS } from '../ui/feature/shared/DayPicker'

export const getDatesOfDay = (time: WeekdayTime) : Array<DayTime> => {
    const result: Array<DayTime> = []
    const firstDateOfMonth = new Date()
    firstDateOfMonth.setDate(1)
    const lastDateOfMonth = (new Date(2008, firstDateOfMonth.getMonth() + 1, 0)).getDate()
    const dayDiff = ((time.weekday + 7) - (firstDateOfMonth.getDay() - 1)) % 7
    let date = 1 + dayDiff
    while (date <= lastDateOfMonth){
        result.push({
            type: SchedulingPostType.DATES,
            startTime: time.startTime,
            endTime: time.endTime,
            startDate:
                `${firstDateOfMonth.getFullYear()}-${`${firstDateOfMonth.getMonth()}`.padStart(2, '0')}-${`${date}`.padStart(2, '0')}`,
            endDate: `${firstDateOfMonth.getFullYear()}-${firstDateOfMonth.getMonth()}-${date}`,
        })
        date = date + 7
    }
    return result
}

const isMomentOverlapped = (momentList: Array<{ start: Moment, end: Moment }>) => {
    for (let i = 0; i < momentList.length; i++){
        if (momentList[i].start.diff(momentList[i].end, 'minute') > 0){
            return true
        }
        for (let j = i + 1; j < momentList.length; j++){
            if (((momentList[i].start.diff(momentList[j].end, 'minute') <= 0) &&
                (momentList[i].end.diff(momentList[j].end, 'minute') >= 0)) ||
                ((momentList[i].start.diff(momentList[j].start, 'minute') <= 0) &&
                (momentList[i].end.diff(momentList[j].start, 'minute') >= 0))){
                return true
            }
        }
    }
    return false
}

export const checkDayTimesValid = (dayTimesWithId: Array<DayTimeWithIdType>):boolean => {
    const momentList:Array<{ start: Moment, end: Moment }> = []
    dayTimesWithId.forEach((dayTimeWithId)=>{
        momentList.push({
            start: moment(`${dayTimeWithId.start.date} ${dayTimeWithId.start.time}`, 'YYYY-MM-DD HH:mm'),
            end: moment(`${dayTimeWithId.end.date} ${dayTimeWithId.end.time}`, 'YYYY-MM-DD HH:mm'),
        })
    })
    return !isMomentOverlapped(momentList)
}

export const checkWeekdayTimesValid = (weekdayTimesWithId: Array<WeekdayTimeWithIdType>) => {
    let valid = true
    const dayDict: { [key: string]: Array<{ start: Moment, end: Moment }> } = {}
    Object.values(DAYS).forEach((target) => {
        dayDict[target] = []
    })
    weekdayTimesWithId.forEach((weekdayTimeWithId)=>{
        if (weekdayTimeWithId.day === ''){
            valid = false
        }
        dayDict[weekdayTimeWithId.day].push({
            start: moment(weekdayTimeWithId.time.start, 'HH:mm'),
            end: moment(weekdayTimeWithId.time.end, 'HH:mm') })
    })
    Object.values(dayDict).forEach((momentList) => {
        if (isMomentOverlapped(momentList)){
            valid = false
        }
    })
    return valid
}

export const toDayTimeWithIdFormatter = (id: number, dayTime: DayTime) : DayTimeWithIdType => {
    return {
        id: id,
        start: {
            date: dayTime.startDate,
            time: `${`${dayTime.startTime / 2}`.padStart(2, '0')}:${`${(dayTime.startTime % 2) * 30}`.padStart(2, '0')}`,
        },
        end: {
            date: dayTime.endDate,
            time: `${`${dayTime.endTime / 2}`.padStart(2, '0')}:${`${(dayTime.endTime % 2) * 30}`.padStart(2, '0')}`,
        },
    }
}

export const toDayTimeFormatter = (dayTimeWithId: DayTimeWithIdType) : DayTime => {
    return {
        type: SchedulingPostType.DATES,
        startTime: parseInt(dayTimeWithId.start.time.slice(0, 2)) * 2 + parseInt(dayTimeWithId.start.time.slice(3, 5)) / 30,
        endTime: parseInt(dayTimeWithId.end.time.slice(0, 2)) * 2 + parseInt(dayTimeWithId.end.time.slice(3, 5)) / 30,
        startDate: dayTimeWithId.start.date,
        endDate: dayTimeWithId.end.date,
    }
}

export const toWeekdayTimeWithIdFormatter = () => {}

export const dayToNum = (day: DAYS|'') => {
    switch (day) {
        case DAYS.MONDAY:
            return 0
        case DAYS.TUESDAY:
            return 1
        case DAYS.WEDNESDAY:
            return 2
        case DAYS.THURSDAY:
            return 3
        case DAYS.FRIDAY:
            return 4
        case DAYS.SATURDAY:
            return 5
        case DAYS.SUNDAY:
            return 6
        default:
            return 0
    }
}

export const toWeekdayTimeFormatter = (weekdayTimeWithId: WeekdayTimeWithIdType, weekdayRange: DateRangeType): WeekdayTime => {
    return {
        type: SchedulingPostType.DAYS,
        startTime: (parseInt(weekdayTimeWithId.time.start.slice(0, 2)) * 2) + ((parseInt(weekdayTimeWithId.time.start.slice(3, 5))) / 30),
        endTime: (parseInt(weekdayTimeWithId.time.end.slice(0, 2)) * 2) + ((parseInt(weekdayTimeWithId.time.end.slice(3, 5))) / 30),
        repeatStart: weekdayRange.start,
        repeatEnd: weekdayRange.end,
        weekday: dayToNum(weekdayTimeWithId.day),
    }
}
