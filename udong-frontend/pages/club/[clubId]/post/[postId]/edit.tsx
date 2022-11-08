import { useRouter } from 'next/router'

import { PostCreateContainer } from '../../../../../app/ui/feature/club/post/upsert/create/PostCreateContainer'
import { PostEditContainer } from '../../../../../app/ui/feature/club/post/upsert/edit/PostEditContainer'

export const PostEditPage = () => {
    const router = useRouter()
    const { type } = router.query

    switch (type) {
        case 'announcement':
            return <PostEditContainer postType={'announcement'}/>
        case 'enrollment':
            return <PostEditContainer postType={'enrollment'}/>
        case 'scheduling':
            return <PostCreateContainer postType={'scheduling'}/>
        default:
            return <PostEditContainer postType={'announcement'}/>
    }
}

export default PostEditPage
