import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Tag } from '../../../../../domain/model/Tag'
import { AppDispatch } from '../../../../../domain/store'
import { userSelector } from '../../../../../domain/store/user/UserSelector'
import { userActions } from '../../../../../domain/store/user/UserSlice'
import { Spacer } from '../../../../components/Spacer'
import { VStack } from '../../../../components/Stack'
import { UdongImage } from '../../../../components/UdongImage'
import { UdongModal } from '../../../../components/UdongModal'
import { UdongText } from '../../../../components/UdongText'
import close from '../../../../icons/IcClose.png'
import { UdongColors } from '../../../../theme/ColorPalette'
import { TagItem } from '../../tag/TagItem'

interface TagListModalProps {
    isOpen: boolean
    setIsOpen: (open: boolean) => void
    tags: Array<Tag>
}

export const TagListModal = (props: TagListModalProps) => {
    const { isOpen, setIsOpen, tags } = props
    const dispatch = useDispatch<AppDispatch>()
    const userMe = useSelector(userSelector.userMe)

    useEffect(() => {
        dispatch(userActions.getMyProfile())
    }, [dispatch])

    const handleOnClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        setIsOpen(false)
        e.stopPropagation()
    }, [setIsOpen])

    if (!userMe) {
        return null
    }

    return <UdongModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
    >
        <VStack
            width={'100%'}
            paddingHorizontal={40}
            alignItems={'center'}
            style={{ padding: '25px 40px 0 40px' }}
        >
            <VStack
                width={'100%'}
                alignItems={'end'}
                onClick={handleOnClick}
            >
                <UdongImage
                    src={close.src}
                    height={15}
                    width={15}
                    clickable
                />
            </VStack>
            <Spacer height={5}/>

            <UdongText style={'GeneralTitle'}>{'태그 목록'}</UdongText>
            <Spacer height={45}/>

            <VStack width={'100%'}>
                <Spacer
                    height={1}
                    backgroundColor={UdongColors.GrayBright}
                />
            </VStack>

            {tags.length > 0 ?
                <VStack
                    width={'100%'}
                    height={'50vh'}
                    alignItems={'start'}
                    style={{ overflow: 'scroll', paddingBottom: 15 }}
                >
                    {tags.map((tag, index) => {
                        return <TagItem
                            key={`${tag.id} + ${index}`}
                            name={tag.name}
                            isUserIncluded={tag.users.some(user => user.id === userMe.id)}
                        />
                    })}
                </VStack>
                :
                <VStack paddingVertical={100}>
                    <UdongText style={'GeneralContent'}>유저가 없습니다.</UdongText>
                    <Spacer height={50}/>
                </VStack>
            }
        </VStack>
    </UdongModal>
}
