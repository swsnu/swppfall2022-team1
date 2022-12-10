import { DateRangeTypeWithId } from '../ui/feature/club/post/upsert/PostDateSchedule'
import { DAYS } from '../ui/feature/club/post/upsert/PostDaySchedule'

export const DateTimeFormatter = (() => {

    // example: 2022-11-14T12:09:37.308826Z
    const formatDateTime = (timeDate: string): string => {
        return timeDate
    }

    const getBoolNum = (bool: boolean): string => {
        return bool ? '1' : '0'
    }

    const parseWeekdays = (weekdays: DAYS[]): string => {
        return getBoolNum(weekdays.includes(DAYS.MONDAY)) +
            getBoolNum(weekdays.includes(DAYS.TUESDAY)) +
            getBoolNum(weekdays.includes(DAYS.WEDNESDAY)) +
            getBoolNum(weekdays.includes(DAYS.THURSDAY)) +
            getBoolNum(weekdays.includes(DAYS.FRIDAY)) +
            getBoolNum(weekdays.includes(DAYS.SATURDAY)) +
            getBoolNum(weekdays.includes(DAYS.SUNDAY))
    }

    const parseTimeTableTime = (time: string): number => {
        let timeNum: number
        const hours = parseInt(time.slice(0, 2))
        timeNum = hours * 2

        const minutes = parseInt(time.slice(3))
        if (minutes === 30) {
            timeNum += 1
        }
        return timeNum
    }

    const parseDateRanges = (dates: DateRangeTypeWithId[]): Array<string> => {
        const result: Array<string> = []
        for (const date of dates) {
            if (date.start === '' || date.end === '') {
                continue
            }
            const start = new Date(`${date.start}`)
            const end = new Date(`${date.end}`)
            const diff = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)

            if (!result.includes(`${start.toLocaleDateString('en-CA')}`)) {
                result.push(`${start.toLocaleDateString('en-CA')}`)
            }
            for (let i = 1; i < diff; i++) {
                const nextDate = new Date(start.getTime() + ((1000 * 60 * 60 * 24) * i)).toLocaleDateString('en-ZA')
                if (!result.includes(`${nextDate}`)) {
                    result.push(`${nextDate}`)
                }
            }
            if (diff > 0) {
                if (!result.includes(`${end.toLocaleDateString('en-CA')}`)) {
                    result.push(`${end.toLocaleDateString('en-CA')}`)
                }
            }
        }
        return result
    }

    return Object.freeze({
        formatDateTime,
        parseWeekdays,
        parseTimeTableTime,
        parseDateRanges,
    })
})()
