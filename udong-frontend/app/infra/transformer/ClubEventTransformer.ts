import { ClubEvent } from '../../domain/model/ClubEvent'
import { Time } from '../../domain/model/Time'
import { ClubEventDto, ClubEventEditDto } from '../dto/ClubEventDto'
import { timeTransformer } from './TimeTransformer'

const fromDto = (dto: ClubEventDto): ClubEvent => {
    return {
        id: dto.id,
        name: dto.name,
        times: dto.time?.map(timeTransformer.fromDto) ?? [],
        createdAt: dto.created_at,
        updatedAt: dto.updated_at,
    }
}

const toEditDto = (name: string | null, time: Time[] | null): ClubEventEditDto => {
    return {
        ...(name ? { name } : {}),
        ...(time ? { new_time: time.map(timeTransformer.toDto) } : {}),
    }
}

export const clubEventTransformer = {
    fromDto,
    toEditDto,
}
