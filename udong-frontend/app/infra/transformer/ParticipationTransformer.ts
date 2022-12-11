import { EnrollmentStatus } from '../../domain/model/EnrollmentStatus'
import { ParticipationDto } from '../dto/ParticipationDto'
import { userTransformer } from './UserTransformer'

const fromDto = (dto: ParticipationDto): EnrollmentStatus => {
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
