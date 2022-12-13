import { Participation } from '../../domain/model/Participation'
import { ParticipationDto } from '../dto/ParticipationDto'
import { userTransformer } from './UserTransformer'

const fromDto = (dto: ParticipationDto): Participation => {
    return {
        id: dto.id,
        user: userTransformer.fromDto(dto.user),
        enrollmentId: dto.enrollment_id,
        createdAt: dto.created_at,
        updatedAt: dto.updated_at,
    }
}

export const participationTransformer = {
    fromDto,
}
