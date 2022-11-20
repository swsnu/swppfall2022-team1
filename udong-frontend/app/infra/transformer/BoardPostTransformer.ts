import { BoardPost, PostDisplayType } from '../../domain/model/ListItemPost'
import { BoardPostDto } from '../dto/BoardPostDto'
import { postTagTransformer } from './PostTagTransformer'

const fromDto = (dto: BoardPostDto): BoardPost => {
    return {
        displayType: PostDisplayType.BOARD,
        id: dto.id,
        eventName: dto.event,
        title: dto.title,
        content: dto.content,
        type: dto.type,
        closed: dto.closed,
        includedTags: dto.included_tags?.map(postTagTransformer.fromDto),
        excludedTags: dto.excluded_tags?.map(postTagTransformer.fromDto),
        createdAt: dto.created_at,
        updatedAt: dto.updated_at,
    }
}

export const boardPostTransformer = {
    fromDto,
}
