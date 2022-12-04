import { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch } from '../../../../../domain/store'
import { commentSelector } from '../../../../../domain/store/comment/CommentSelector'
import { commentActions } from '../../../../../domain/store/comment/CommentSlice'
import { userSelector } from '../../../../../domain/store/user/UserSelector'
import { Spacer } from '../../../../components/Spacer'
import { HStack, VStack } from '../../../../components/Stack'
import { UdongImage } from '../../../../components/UdongImage'
import { UdongTextField } from '../../../../components/UdongTextField'
import send from '../../../../icons/IcSend.png'
import { DeleteModal } from '../../../shared/DeleteModal'
import { CommentItem } from './CommentItem'

interface PostDetailCommentsViewProps {
    postId: number
}

export const PostDetailCommentsView = (props: PostDetailCommentsViewProps) => {
    const { postId } = props
    const dispatch = useDispatch<AppDispatch>()
    const comments = useSelector(commentSelector.postComments)
    const user = useSelector(userSelector.userMe)

    const [commentInput, setCommentInput] = useState('')
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const inputRef = useRef<HTMLInputElement | undefined>(null)

    useEffect(() => {
        dispatch(commentActions.getComments(postId))
    }, [dispatch, postId])

    const handleCommentSubmit = useCallback(() => {
        if (user) {
            dispatch(commentActions.createComment({ postId, user, content: commentInput }))
        }
        setCommentInput('')
    }, [commentInput, user, postId, dispatch])

    return <VStack>
        <Spacer height={20}/>

        <HStack alignItems={'center'}>
            <UdongTextField
                placeholder={'댓글을 입력해주세요'}
                inputRef={inputRef}
                onChange={() => setCommentInput(inputRef.current?.value ?? '')}
                isCleared={commentInput === ''}
            />
            <Spacer width={20}/>
            <UdongImage
                src={send.src}
                height={24}
                width={24}
                onClick={handleCommentSubmit}
            />
        </HStack>

        {comments.map((comment) => {
            return <CommentItem
                isAuthor={user?.id === comment.user.id}
                key={`${comment.user.name}` + `${comment.id}`}
                name={comment.user.name}
                content={comment.content}
                showDeleteModal={setShowDeleteModal}
            />
        })}

        <Spacer height={20}/>

        <DeleteModal
            deleteObjectText={'댓글'}
            warningText={'경고 문구'}
            isOpen={showDeleteModal}
            setIsOpen={setShowDeleteModal}
        />
    </VStack>
}
