import { useRouter } from 'next/router'

import { PostType } from '../../../../app/domain/model/PostType'
import { PostCreateContainer } from '../../../../app/ui/feature/club/post/upsert/create/PostCreateContainer'

const PostCreatePage = () => {
    const router = useRouter()
    const { type } = router.query

    switch (type) {
        case 'announcement':
            return <PostCreateContainer postType={PostType.ANNOUNCEMENT}/>
        case 'enrollment':
            return <PostCreateContainer postType={PostType.ENROLLMENT}/>
        case 'scheduling':
            return <PostCreateContainer postType={PostType.SCHEDULING}/>
        default:
            return <PostCreateContainer postType={PostType.ANNOUNCEMENT}/>
    }
}

export default PostCreatePage
