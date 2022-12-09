import { BoardPost, PostDisplayType } from '../../domain/model/ListItemPost'
import { BoardPostDto } from '../dto/BoardPostDto'
import { eventNameTransformer } from './EventNameTransformer'
import { postTagTransformer } from './PostTagTransformer'

const fromDto = (dto: BoardPostDto): BoardPost => {
    return {
        displayType: PostDisplayType.BOARD,
        id: dto.id,
        author: dto.author,
        eventName: eventNameTransformer.fromDto(dto.event),
        eventId: dto.event?.id,
        title: dto.title,
        content: dto.content,
        type: dto.type,
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
