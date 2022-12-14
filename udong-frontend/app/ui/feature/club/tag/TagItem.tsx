import { useCallback } from 'react'

import { DateTimeFormatter } from '../../../../utility/dateTimeFormatter'
import { Spacer } from '../../../components/Spacer'
import { HStack, VStack } from '../../../components/Stack'
import { UdongChip } from '../../../components/UdongChip'
import { UdongImage } from '../../../components/UdongImage'
import { UdongText } from '../../../components/UdongText'
import edit from '../../../icons/IcPencil.png'
import trash from '../../../icons/IcTrash.png'
import { UdongColors } from '../../../theme/ColorPalette'

interface TagItemProps {
    name: string
    createdAt: string
    updatedAt: string
    isUserIncluded: boolean
    showEditModal: (showEditModal: boolean) => void
    onClickDelete: (showDeleteModal: boolean) => void
    isAdmin: boolean
}

export const TagItem = (props: TagItemProps) => {
    const { name, createdAt, updatedAt, isUserIncluded, showEditModal, onClickDelete, isAdmin } = props

    const handleOnClickEdit = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        showEditModal(true)
    }, [showEditModal])

    const handleOnClickDelete = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        onClickDelete(true)
    }, [onClickDelete])

    return <VStack width={'100%'}>
        <HStack
            paddingVertical={14}
            justifyContent={'space-between'}
        >
            <UdongChip
                color={isUserIncluded ? UdongColors.Primary : UdongColors.GrayNormal}
                style={'fill'}
                onClick={() => {return}}
                text={name}
                clickable
            />

            <HStack>
                <Spacer width={30}/>
                <UdongText
                    style={'ListContentS'}
                    whiteSpace={'nowrap'}
                >
                    {`생성일: ${DateTimeFormatter.formatDateTime(createdAt, false)}`}
                </UdongText>

                <Spacer width={30}/>
                <UdongText
                    style={'ListContentS'}
                    whiteSpace={'nowrap'}
                >
                    {`수정일: ${DateTimeFormatter.formatDateTime(updatedAt, false)}`}
                </UdongText>

                {isAdmin ?
                    <HStack>
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
                    :
                    <Spacer width={80}/>
                }
            </HStack>
        </HStack>

        <Spacer
            height={1}
            backgroundColor={UdongColors.GrayBright}
        />
    </VStack>
}

export const DefaultTagItem = () => {
    return <VStack width={'100%'}>
        <HStack
            paddingVertical={14}
            justifyContent={'space-between'}
        >
            <UdongChip
                color={UdongColors.Primary}
                style={'fill'}
                onClick={() => {return}}
                text={'전체'}
                clickable
            />

            <HStack>
                <Spacer width={30}/>
                <UdongText style={'ListContentS'}>{`기본 생성`}</UdongText>

                <Spacer width={200}/>
                <UdongText style={'ListContentS'}>{`수정 불가`}</UdongText>

                <Spacer width={150}/>
            </HStack>
        </HStack>

        <Spacer
            height={1}
            backgroundColor={UdongColors.GrayBright}
        />
    </VStack>
}
