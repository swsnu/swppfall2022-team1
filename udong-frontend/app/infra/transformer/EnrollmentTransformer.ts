import { Enrollment } from '../../domain/model/Enrollment'
import { EnrollmentDto } from '../dto/EnrollmentDto'

const fromDto = (dto: EnrollmentDto): Enrollment => {
    return {
        postId: dto.post_id,
        closed: dto.closed,
        createdAt: dto.created_at,
        updatedAt: dto.updated_at,
    }
}

export const enrollmentTransformer = {
    fromDto,
}
