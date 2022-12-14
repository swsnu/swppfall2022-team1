import { useCallback, useRef, useState } from 'react'

import { useImage } from '../../../../../hooks/useImage'
import { Spacer } from '../../../../components/Spacer'
import { HStack, VStack } from '../../../../components/Stack'
import { UdongImage } from '../../../../components/UdongImage'
import { UdongText } from '../../../../components/UdongText'
import { UdongTextField } from '../../../../components/UdongTextField'
import check from '../../../../icons/IcCheck.png'
import edit from '../../../../icons/IcPencil.png'
import del from '../../../../icons/IcTrash.png'

interface CommentItemProps {
    id: number
    name: string
    content: string
    isAuthor?: boolean
    onClickDelete: (commentId: number) => void
    onSubmitEditedComment: (commentId: number, content: string) => void
    imageKey: string
}

export const CommentItem = (props: CommentItemProps) => {
    const { id, name, content, isAuthor = false, onClickDelete, onSubmitEditedComment, imageKey } = props
    const inputRef = useRef<HTMLInputElement | undefined>(null)
    const [isInputVisible, setIsInputVisible] = useState(false)
    const [changedComment, setChangedComment] = useState('')

    const handleEditComment = useCallback(() => {
        if (!isInputVisible) {
            setIsInputVisible(true)
        } else {
            onSubmitEditedComment(id, changedComment)
            setIsInputVisible(false)
        }
    }, [isInputVisible, onSubmitEditedComment, changedComment, id])

    const imageUrl = useImage(imageKey)

    return <VStack>
        <Spacer height={20}/>

        <HStack justifyContent={'space-between'}>
            <HStack alignItems={'center'}>
                <UdongImage
                    src={imageUrl ?? ''}
                    height={40}
                    width={40}
                />
                <UdongText style={'GeneralContent'}>{name}</UdongText>
            </HStack>

            {isAuthor &&
                <HStack>
                    <Spacer width={30}/>
                    <UdongImage
                        src={isInputVisible ? check.src : edit.src}
                        height={20}
                        width={20}
                        onClick={handleEditComment}
                        clickable
                    />
                    <Spacer width={10}/>
                    <UdongImage
                        src={del.src}
                        height={20}
                        width={20}
                        onClick={() => onClickDelete(id)}
                        clickable
                    />
                </HStack>
            }
        </HStack>

        <Spacer height={10}/>

        {isInputVisible ?
            <UdongTextField
                inputRef={inputRef}
                defaultValue={content}
                onChange={() => setChangedComment(inputRef.current?.value ?? '')}
            />
            :
            <UdongText style={'GeneralContent'}>{content}</UdongText>
        }
    </VStack>
}
