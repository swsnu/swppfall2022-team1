import { useRouter } from 'next/router'

import { PostEditContainer } from '../../../../../app/ui/feature/club/post/upsert/edit/PostEditContainer'

const PostEditPage = () => {
    const router = useRouter()
    const { type } = router.query

    switch (type) {
        case 'announcement':
            return <PostEditContainer postType={'announcement'}/>
        case 'enrollment':
            return <PostEditContainer postType={'enrollment'}/>
        case 'scheduling':
            return <PostEditContainer postType={'scheduling'}/>
        default:
            return <PostEditContainer postType={'announcement'}/>
    }
}

export default PostEditPage
