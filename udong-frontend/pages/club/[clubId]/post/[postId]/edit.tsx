import { useRouter } from 'next/router'

import { PostType } from '../../../../../app/domain/model/PostType'
import { PostEditContainer } from '../../../../../app/ui/feature/club/post/upsert/edit/PostEditContainer'

const PostEditPage = () => {
    const router = useRouter()
    const { type } = router.query

    switch (type) {
        case 'announcement':
            return <PostEditContainer postType={PostType.ANNOUNCEMENT}/>
        case 'enrollment':
            return <PostEditContainer postType={PostType.ENROLLMENT}/>
        case 'scheduling':
            return <PostEditContainer postType={PostType.SCHEDULING}/>
        default:
            return <PostEditContainer postType={PostType.ANNOUNCEMENT}/>
    }
}

export default PostEditPage
