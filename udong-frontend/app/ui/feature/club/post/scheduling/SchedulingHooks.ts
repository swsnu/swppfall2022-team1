import { useSelector } from 'react-redux'

import { ClubUser } from '../../../../../domain/model/ClubUser'
import { DateSchedulingPost } from '../../../../../domain/model/DateSchedulingPost'
import { RoleType } from '../../../../../domain/model/RoleType'
import { SchedulingPost } from '../../../../../domain/model/SchedulingPost'
import { WeekdaySchedulingPost } from '../../../../../domain/model/WeekdaySchedulingPost'
import { clubSelector } from '../../../../../domain/store/club/ClubSelector'
import { schedulingSelector } from '../../../../../domain/store/post/scheduling/SchedulingSelector'
import { userSelector } from '../../../../../domain/store/user/UserSelector'
import { new2dArray } from '../../../../../utility/functions'
import { CellIdx } from '../../../shared/TimeTable'

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

export const getDayCnt = (scheduling: DateSchedulingPost | WeekdaySchedulingPost) => (
    'dates' in scheduling ? scheduling.dates.length : scheduling.weekdays.filter(x => x).length
)

export const parseUsers = (users: ClubUser[], myId: number): SchedulingListUserType[] => (
    users.map(({ user, role }) =>  ({
        id: user.id,
        name: user.name,
        isMe: user.id === myId,
        isAdmin: role === RoleType.ADMIN,
    }))
)

export const useData = () => {
    const schedulingStatus = useSelector(schedulingSelector.schedulingStatus)
    const me = useSelector(userSelector.userMe)
    const myId = me?.id
    const myTimeTable = me?.timeTable
    const clubUsers = useSelector(clubSelector.members)

    if(!schedulingStatus) {
        return {}
    }

    const allUsers = clubUsers.map(({ user, role }) => ({
        id: user.id,
        name: user.name,
        isMe: user.id === myId,
        isAdmin: role === RoleType.ADMIN,
    }))

    const participatedUserIds = schedulingStatus.availableTime.map(({ user }) => user.id)

    const cnt = schedulingStatus.availableTime.reduce(
        (v, { time }) => v.map((colData, colIdx) => colData.map((x, rowIdx) => x + (time[colIdx][rowIdx] ? 1 : 0))),
        new2dArray(
            getDayCnt(schedulingStatus),
            schedulingStatus.endTime - schedulingStatus.startTime,
            0,
        ),
    )

    const calculateDay = (colIdx: number) => {
        if('dates' in schedulingStatus) {
            const d = new Date(schedulingStatus.dates[colIdx])
            return `${d.getMonth() + 1}/${d.getDate()}`
        }
        else {
            return ['월', '화', '수', '목', '금', '토', '일'].filter((_, idx) => schedulingStatus.weekdays?.[idx])[colIdx]
        }
    }

    const best = cnt.reduce(
        (v, colData, colIdx) => v.concat(
            colData.map((x, rowIdx) => ({ cnt: x, day: calculateDay(colIdx), time: rowIdx + schedulingStatus.startTime })),
        ),
        [] as ({ cnt: number, day: string, time: number })[],
    ).sort((a, b) => b.cnt - a.cnt).slice(0, 3)

    return { schedulingStatus, allUsers, participatedUserIds, cnt, best, myTimeTable }
}

export const getHeader = (data: DateSchedulingPost | WeekdaySchedulingPost) => (
    'dates' in data ?
        data.dates.map(date => {
            const d = new Date(date)
            return `${d.getMonth() + 1}/${d.getDate()}`
        })
        : ['SUN', 'MON', 'TUE', 'WED', 'THR', 'FRI', 'SAT'].filter((_, idx) => data.weekdays?.[idx])
)

export const getAva = (data: SchedulingPost, hover: CellIdx|null) => (
    data.availableTime.filter(({ time }) => (hover && time[hover.col][hover.row])).map(({ user }) => user.id)
)

export const getInc = (data: SchedulingPost, selected: boolean[][]) => (
    data.availableTime.filter(({ time }) => (
        selected !== null && time.map((timeRow, col) => timeRow.map((x, row) => x && selected[col][row]).some(x => x)).some(x => x)
    )).map(({ user }) => user.id)
)
