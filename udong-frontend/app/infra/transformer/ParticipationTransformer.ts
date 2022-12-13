import { Participation } from '../../domain/model/Participation'
import { ParticipationDto } from '../dto/ParticipationDto'
import { userTransformer } from './UserTransformer'

const fromDto = (dto: ParticipationDto): Participation => {
    return {
        id: dto.id,
        users: dto.user.map(userTransformer.fromDto),
        enrollmentId: dto.enrollment_id,
        createdAt: dto.created_at,
        updatedAt: dto.updated_at,
    }
}

export const participationTransformer = {
    fromDto,
}
