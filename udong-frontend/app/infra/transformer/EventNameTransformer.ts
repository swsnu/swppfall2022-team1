import { EventName } from '../../domain/model/ClubEvent'
import { EventNameDto } from '../dto/EventNameDto'

const fromDto = (dto?: EventNameDto): EventName | undefined => {
    if (!dto) {
        return
    }
    return {
        id: dto.id,
        name: dto.name,
    }
}

export const eventNameTransformer = {
    fromDto,
}
