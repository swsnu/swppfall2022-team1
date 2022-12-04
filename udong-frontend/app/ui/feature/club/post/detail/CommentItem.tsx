import styled from '@emotion/styled'

import { Spacer } from '../../../../components/Spacer'
import { HStack, VStack } from '../../../../components/Stack'
import { UdongImage } from '../../../../components/UdongImage'
import { UdongText } from '../../../../components/UdongText'
import edit from '../../../../icons/IcPencil.png'
import del from '../../../../icons/IcTrash.png'
import { UdongColors } from '../../../../theme/ColorPalette'

interface CommentItemProps {
    id: number
    name: string
    content: string
    isAuthor?: boolean
    onClickDelete: (commentId: number) => void
}

export const CommentItem = (props: CommentItemProps) => {
    const { id, name, content, isAuthor = false, onClickDelete } = props
    return <VStack>
        <Spacer height={20}/>

        <HStack justifyContent={'space-between'}>
            <HStack alignItems={'center'}>
                <CircularProfileIcon/>
                <Spacer width={20}/>
                <UdongText style={'GeneralContent'}>{name}</UdongText>
            </HStack>

            {isAuthor &&
                <HStack>
                    <Spacer width={30}/>
                    <UdongImage
                        src={edit.src}
                        height={20}
                        width={20}
                    />
                    <Spacer width={10}/>
                    <UdongImage
                        src={del.src}
                        height={20}
                        width={20}
                        onClick={() => onClickDelete(id)}
                    />
                </HStack>
            }
        </HStack>

        <Spacer height={10}/>
        <UdongText style={'GeneralContent'}>{content}</UdongText>
    </VStack>
}

const CircularProfileIcon = styled.div({
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: UdongColors.GrayBright,
})
