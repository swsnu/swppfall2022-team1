import { useRouter } from 'next/router'

import { PostCreateContainer } from '../../../../app/ui/feature/club/post/upsert/create/PostCreateContainer'

const PostCreatePage = () => {
    const router = useRouter()
    const { type } = router.query

    switch (type) {
        case 'announcement':
            return <PostCreateContainer postType={'announcement'}/>
        case 'enrollment':
            return <PostCreateContainer postType={'enrollment'}/>
        case 'scheduling':
            return <PostCreateContainer postType={'scheduling'}/>
        default:
            return <PostCreateContainer postType={'announcement'}/>
    }
}

export default PostCreatePage
