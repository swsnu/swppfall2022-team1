import { useCallback, useMemo } from 'react'

import { new2dArray } from '../../../../../utility/functions'
import { CellIdx } from '../../../shared/TimeTable'

const schedulingDummy = {
    startTime: 12,
    endTime: 18,
    dates: [
        new Date(2022, 11, 6),
        new Date(2022, 11, 9),
        new Date(2022, 11, 10),
        new Date(2022, 11, 11),
    ],
    //dates: null,
    weekdays: [true, true, true, false, true, false, false],
    availableTime: [
        {
            user: { id: 1, name: 'user1', auth: 'A' },
            time: [
                [true, true, true, true, true, true],
                [true, true, false, false, true, false],
                [true, true, false, false, true, false],
                [false, false, false, false, false, false],
            ],
        },
        {
            user: { id: 2, name: 'user2', auth: 'M' },
            time: [
                [false, false, false, false, false, false],
                [true, true, true, true, true, true],
                [true, true, false, false, true, false],
                [true, true, false, false, true, false],
            ],
        },
    ],
}

export type BestType = {
    cnt: number
    day: string
    time: number
}

export type SchedulingListUserType = {
    id: number
    name: string
    isMe: boolean
    isAdmin: boolean
}

const myId = 1

export const useData = () => {
    const data = useMemo(() => schedulingDummy, [])

    const header = useMemo(() => (
        data.dates ?
            data.dates.map(date => `${date.getMonth()}/${date.getDate()}`)
            : ['SUN', 'MON', 'TUE', 'WED', 'THR', 'FRI', 'SAT'].filter((_, idx) => data.weekdays?.[idx])
    ), [data])

    const users = useMemo<SchedulingListUserType[]>(() => (
        schedulingDummy.availableTime.map(({ user: { id, name, auth } }) =>  ({ id, name, isMe: id === myId, isAdmin: auth === 'A' }))
    ), [])

    const cnt = useMemo<number[][]>(() => data.availableTime.reduce(
        (v, { time }) => v.map((colData, colIdx) => colData.map((x, rowIdx) => x + (time[colIdx][rowIdx] ? 1 : 0))),
        new2dArray(
            data.dates ? data.dates.length : data.weekdays.filter(x => x).length,
            data.endTime - data.startTime,
            0,
        ),
    ), [data])

    const calculateDay = useCallback((colIdx: number) => {
        if(data.dates !== null) {
            return `${data.dates[colIdx].getMonth()}/${data.dates[colIdx].getDate()}`
        }
        else {
            return ['월', '화', '수', '목', '금', '토', '일'].filter((_, idx) => data.weekdays[idx])[colIdx]
        }
    }, [data])

    const best = useMemo<BestType[]>(() => cnt.reduce(
        (v, colData, colIdx) => v.concat(
            colData.map((x, rowIdx) => ({ cnt: x, day: calculateDay(colIdx), time: rowIdx + data.startTime })),
        ),
        [] as ({ cnt: number, day: string, time: number })[],
    ).sort((a, b) => b.cnt - a.cnt).slice(0, 3), [cnt, calculateDay, data])

    return { data, header, users, cnt, best }
}

export const getAva = (data: { availableTime: { user: { id: number }, time: boolean[][] }[] }, hover: CellIdx|null) => (
    data.availableTime.filter(({ time }) => (hover && time[hover.col][hover.row])).map(({ user }) => user.id)
)

export const getInc = (data: { availableTime: { user: { id: number }, time: boolean[][] }[] }, selected: boolean[][]) => (
    data.availableTime.filter(({ time }) => (
        selected !== null && time.map((timeRow, col) => timeRow.map((x, row) => x && selected[col][row]).some(x => x)).some(x => x)
    )).map(({ user }) => user.id)
)
