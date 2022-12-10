import { BoardPost, PostDisplayType } from '../../domain/model/BoardPost'
import { BoardPostDto } from '../dto/BoardPostDto'
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
        club: dto.club,
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

export const boardPostTransformer = {
    fromDto,
}
