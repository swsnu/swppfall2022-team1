import { BoardPost, PostDisplayType } from '../../domain/model/BoardPost'
import { BoardPostDto, BoardPostEditDto } from '../dto/BoardPostDto'
import { clubTransformer } from './ClubTransformer'
import { enrollmentTransformer } from './EnrollmentTransformer'
import { eventNameTransformer } from './EventNameTransformer'
import { postTagTransformer } from './PostTagTransformer'
import { postTypeTransformer } from './PostTypeTransformer'
import { schedulingTransformer } from './SchedulingTransformer'

const fromDto = (dto: BoardPostDto, displayType: PostDisplayType): BoardPost => {
    return {
        displayType,
        id: dto.id,
        author: dto.author,
        club: dto.club && clubTransformer.fromDto(dto.club),
        eventName: eventNameTransformer.fromDto(dto.event),
        eventId: dto.event?.id,
        title: dto.title,
        content: dto.content,
        type: postTypeTransformer.fromDto(dto.type),
        scheduling: dto.scheduling ? schedulingTransformer.fromDto(dto.scheduling) : undefined,
        enrollment: dto.enrollment ? enrollmentTransformer.fromDto(dto.enrollment) : undefined,
        closed: dto.closed,
        includedTags: dto.include_tag?.map(postTagTransformer.fromDto),
        excludedTags: dto.exclude_tag?.map(postTagTransformer.fromDto),
        createdAt: dto.created_at,
        updatedAt: dto.updated_at,
    }
}

const toEditDto = (post: BoardPost, tagIdList: Array<number>): BoardPostEditDto => {
    return {
        id: post.id,
        event: post.eventName,
        title: post.title,
        content: post.content,
        type: postTypeTransformer.toDto(post.type),
        created_at: post.createdAt,
        updated_at: post.updatedAt,
        tag_list: tagIdList,
        event_id: post.eventId,
    }
}

export const boardPostTransformer = {
    fromDto,
    toEditDto,
}
