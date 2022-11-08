import { Club, dummyClubDanpung, dummyClubWaffle } from './Club'
import { dummyUserMe, dummyUserNotMe, User } from './User'

export interface Tag {
    id: number
    club: Club
    name: string
    // FIXME: temporary fields for dummy data
    users: Array<User>
}

export const dummyTagsDanpung: Array<Tag> = [
    {
        id: 1,
        club: dummyClubDanpung,
        name: '2022년 겨울 공연 1팀',
        users: [dummyUserMe, dummyUserNotMe],
    },
    {
        id: 2,
        club: dummyClubDanpung,
        name: '2022년 겨울 공연 2팀',
        users: [dummyUserNotMe],
    },
    {
        id: 3,
        club: dummyClubDanpung,
        name: '2022년 겨울 공연 3팀',
        users: [dummyUserNotMe],
    },
]

export const dummyTagsDanpung2: Array<Tag> = [
    {
        id: 1,
        club: dummyClubDanpung,
        name: '월요일 세션',
        users: [dummyUserMe, dummyUserNotMe],
    },
    {
        id: 2,
        club: dummyClubDanpung,
        name: '수요일 세션',
        users: [dummyUserNotMe],
    },
]

export const dummyTagsWaffle: Array<Tag> = [
    {
        id: 1,
        club: dummyClubWaffle,
        name: '루키즈 리엑트 세미나',
        users: [dummyUserMe, dummyUserNotMe],
    },
    {
        id: 2,
        club: dummyClubWaffle,
        name: '루키즈 장고 세미나',
        users: [dummyUserNotMe],
    },
]
