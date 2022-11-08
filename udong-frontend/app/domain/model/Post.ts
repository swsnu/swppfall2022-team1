import { dummyClubDanpung, dummyClubWaffle } from './Club'
import { dummyEvent1, Event } from './Event'
import { PostType } from './PostType'
import { dummyTagsDanpung, dummyTagsDanpung2, dummyTagsWaffle, Tag } from './Tag'
import { dummyUserMe, dummyUserNotMe, User } from './User'

export interface Post {
    id: number
    author: User
    event?: Event
    title: string
    content: string
    type: PostType
    createdAt: string
    // FIXME: temporary field for feed dummy data
    clubName: string
    tags: Array<Tag>
}

export const dummyFeedPosts: Array<Post> = [
    {
        id: 1,
        author: dummyUserMe,
        event: dummyEvent1,
        title: '겨울 공연 중요 공지!',
        content: 'hello world',
        type: PostType.ANNOUNCEMENT,
        createdAt: '12분 전',
        clubName: dummyClubDanpung.name,
        tags: dummyTagsDanpung,
    },
    {
        id: 2,
        author: dummyUserMe,
        event: dummyEvent1,
        title: '겨울 공연 일정 수합합니다.',
        content: 'hello world',
        type: PostType.SCHEDULING,
        createdAt: '1시간 전',
        clubName: dummyClubDanpung.name,
        tags: dummyTagsDanpung,
    },
    {
        id: 3,
        author: dummyUserNotMe,
        title: '루키 여러분 와플스튜디오에 들어오신 것을 환영합니다~',
        content: 'hello world',
        type: PostType.ANNOUNCEMENT,
        createdAt: '1시간 전',
        clubName: dummyClubWaffle.name,
        tags: dummyTagsWaffle,
    },
    {
        id: 4,
        author: dummyUserMe,
        event: dummyEvent1,
        title: '단풍 겨울 공연진 모집합니다.',
        content: 'hello world',
        type: PostType.ENROLLMENT,
        createdAt: '5시간 전',
        clubName: dummyClubDanpung.name,
        tags: dummyTagsDanpung2,
    },
    {
        id: 5,
        author: dummyUserNotMe,
        title: '와플스튜디오에서 와플을 구워요~',
        content: 'hello world',
        type: PostType.ANNOUNCEMENT,
        createdAt: '16시간 전',
        clubName: dummyClubWaffle.name,
        tags: dummyTagsWaffle,
    },
    {
        id: 6,
        author: dummyUserNotMe,
        title: '신나는 단풍! 웰컴 여러분~',
        content: 'hello world',
        type: PostType.ANNOUNCEMENT,
        createdAt: '16시간 전',
        clubName: dummyClubDanpung.name,
        tags: dummyTagsDanpung,
    },
]

export const dummyBoardPosts = dummyFeedPosts.filter((post) => post.clubName === dummyClubDanpung.name)

export const dummyEventPosts = dummyFeedPosts.filter((post) => post.event?.name === dummyEvent1.name)
