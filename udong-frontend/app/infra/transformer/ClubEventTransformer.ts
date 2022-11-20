import { ClubEvent } from '../../domain/model/ClubEvent'
import { ClubEventDto } from '../dto/ClubEventDto'
import { timeTransformer } from './TimeTransformer'

const fromDto = (dto: ClubEventDto): ClubEvent => {
    return {
        id: dto.id,
        name: dto.name,
        times: dto.time?.map(timeTransformer.fromDto),
        createdAt: dto.created_at,
        updatedAt: dto.updated_at,
    }
}

export const clubEventTransformer = {
    fromDto,
}
