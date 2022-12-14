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
    const commentId = useSelector(commentSelector.selectedCommentId)
    const user = useSelector(userSelector.userMe)

    const inputRef = useRef<HTMLInputElement | undefined>(null)
    const [commentInput, setCommentInput] = useState('')
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    useEffect(() => {
        if (postId) {
            dispatch(commentActions.getComments(postId))
        }
    }, [dispatch, postId])

    const handleCommentSubmit = useCallback(() => {
        if (user) {
            dispatch(commentActions.createComment({ postId, user, content: commentInput }))
        }
        setCommentInput('')
    }, [commentInput, user, postId, dispatch])

    const handleConfirmCommentEdit = useCallback((id: number, content: string) => {
        if (user) {
            dispatch(commentActions.setSelectedCommentId(id))
            dispatch(commentActions.editComment({ commentId: id, content, user }))
        }
    }, [dispatch, user])

    const handleClickCommentDelete = useCallback((id: number) => {
        dispatch(commentActions.setSelectedCommentId(id))
        setShowDeleteModal(true)
    }, [dispatch])

    const handleConfirmCommentDelete = useCallback(() => {
        if (commentId) {
            dispatch(commentActions.deleteComment(commentId))
            setShowDeleteModal(false)
        }
    }, [dispatch, commentId])

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
                clickable
            />
        </HStack>

        {comments.map((comment) => {
            return <CommentItem
                key={`${comment.user.name}` + `${comment.id}`}
                imageKey={comment.user.imageUrl}
                id={comment.id}
                name={comment.user.name}
                content={comment.content}
                isAuthor={user?.id === comment.user.id}
                onClickDelete={handleClickCommentDelete}
                onSubmitEditedComment={handleConfirmCommentEdit}
            />
        })}

        <Spacer height={20}/>

        <DeleteModal
            deleteObjectText={'댓글'}
            warningText={'해당 댓글은 영구적으로 삭제됩니다.'}
            isOpen={showDeleteModal}
            setIsOpen={setShowDeleteModal}
            onClickDelete={handleConfirmCommentDelete}
        />
    </VStack>
}
