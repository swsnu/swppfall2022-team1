import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Tag } from '../../../../../domain/model/Tag'
import { AppDispatch } from '../../../../../domain/store'
import { postSelector } from '../../../../../domain/store/post/PostSelector'
import { postActions } from '../../../../../domain/store/post/PostSlice'
import { userSelector } from '../../../../../domain/store/user/UserSelector'
import { userActions } from '../../../../../domain/store/user/UserSlice'
import { Spacer } from '../../../../components/Spacer'
import { HStack, VStack } from '../../../../components/Stack'
import { UdongButton } from '../../../../components/UdongButton'
import { UdongChip } from '../../../../components/UdongChip'
import { UdongImage } from '../../../../components/UdongImage'
import { UdongModal } from '../../../../components/UdongModal'
import { UdongText } from '../../../../components/UdongText'
import check from '../../../../icons/IcCheck.png'
import close from '../../../../icons/IcClose.png'
import { UdongColors } from '../../../../theme/ColorPalette'

interface TagListModalProps {
    isOpen: boolean
    setIsOpen: (open: boolean) => void
    tags: Array<Tag>
}

export const TagListModal = (props: TagListModalProps) => {
    const { isOpen, setIsOpen, tags } = props
    const dispatch = useDispatch<AppDispatch>()
    const userMe = useSelector(userSelector.userMe)
    const selectedTags = useSelector(postSelector.createPostTags)

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
            height={600}
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

            {tags.length > 0 &&
                <VStack
                    width={'100%'}
                    height={'50vh'}
                    alignItems={'start'}
                    style={{ overflow: 'scroll', paddingBottom: 15 }}
                >
                    {tags.map((tag, index) => {
                        return <VStack
                            key={`${tag.id} + ${index}`}
                            width={'100%'}
                        >
                            <HStack
                                justifyContent={'space-between'}
                                paddingVertical={14}
                                onClick={() => dispatch(postActions.toggleCreatePostTagSelection(tag))}
                            >
                                <UdongChip
                                    color={tag.users.some(user => user.id === userMe.id) ? UdongColors.Primary : UdongColors.GrayNormal}
                                    style={'fill'}
                                    text={tag.name}
                                />
                                {selectedTags.some(item => item.id === tag.id) &&
                                    <UdongImage
                                        src={check.src}
                                        height={20}
                                        width={20}
                                        clickable={true}
                                    />
                                }
                            </HStack>
                            <Spacer
                                height={1}
                                backgroundColor={UdongColors.GrayBright}
                            />
                        </VStack>
                    })}
                </VStack>
            }

            <UdongButton
                style={'line'}
                onClick={() => setIsOpen(false)}
            >
                완료
            </UdongButton>
            <Spacer height={50}/>
        </VStack>
    </UdongModal>
}
