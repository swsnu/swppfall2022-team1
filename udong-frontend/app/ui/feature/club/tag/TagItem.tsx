import { useCallback } from 'react'

import { Spacer } from '../../../components/Spacer'
import { HStack, VStack } from '../../../components/Stack'
import { UdongChip } from '../../../components/UdongChip'
import { UdongImage } from '../../../components/UdongImage'
import { UdongText } from '../../../components/UdongText'
import edit from '../../../icons/IcPencil.png'
import trash from '../../../icons/IcTrash.png'
import { UdongColors } from '../../../theme/ColorPalette'

// TODO: 나중에는 tag 타입 전체를 props로 넘기는게 좋을듯
interface TagItemProps {
    name: string
    isUserIncluded: boolean
    showEditModal: (showEditModal: boolean) => void
    onClickDelete: (showDeleteModal: boolean) => void
}

export const TagItem = (props: TagItemProps) => {
    const { name, isUserIncluded, showEditModal, onClickDelete } = props

    const handleOnClickEdit = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        showEditModal(true)
    }, [showEditModal])

    const handleOnClickDelete = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        onClickDelete(true)
    }, [onClickDelete])

    return <VStack>
        <Spacer
            height={1}
            backgroundColor={UdongColors.GrayBright}
        />

        <HStack
            paddingVertical={14}
            justifyContent={'space-between'}
        >
            <UdongChip
                color={isUserIncluded ? UdongColors.Primary : UdongColors.GrayNormal}
                style={'fill'}
                onClick={() => console.log('tag!')}
                text={name}
            />

            <HStack>
                <Spacer width={30}/>
                <UdongText
                    style={'ListContentS'}
                    whiteSpace={'nowrap'}
                >
                    생성일: 2012.04.13
                </UdongText>
                <Spacer width={30}/>
                <UdongText
                    style={'ListContentS'}
                    whiteSpace={'nowrap'}
                >
                    수정일: 2022.11.01
                </UdongText>

                <Spacer width={30}/>
                <VStack onClick={handleOnClickEdit}>
                    <UdongImage
                        src={edit.src}
                        height={20}
                        width={20}
                        clickable={true}
                    />
                </VStack>

                <Spacer width={10}/>
                <VStack onClick={handleOnClickDelete}>
                    <UdongImage
                        src={trash.src}
                        height={20}
                        width={20}
                        clickable={true}
                    />
                </VStack>
            </HStack>
        </HStack>
    </VStack>
}
