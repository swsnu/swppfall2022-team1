import { User } from './User'

export interface Tag {
    id: number
    name: string
    users: Array<User>
    createdAt: string
    updatedAt: string
}

export interface BasicTag {
    id: number
    name: string
    createdAt: string
    updatedAt: string
}

export type PostTag = BasicTag

export type ClubTag = BasicTag
