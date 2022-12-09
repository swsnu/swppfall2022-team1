import { useCallback, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

import { AppDispatch } from '../../../../domain/store'
import { clubActions } from '../../../../domain/store/club/ClubSlice'
import { Spacer } from '../../../components/Spacer'
import { HStack, VStack } from '../../../components/Stack'
import { UdongButton } from '../../../components/UdongButton'
import { UdongCloseButton } from '../../../components/UdongCloseButton'
import { UdongModal } from '../../../components/UdongModal'
import { UdongText } from '../../../components/UdongText'
import { UdongTextField } from '../../../components/UdongTextField'
import { UdongColors } from '../../../theme/ColorPalette'

interface CreateClubModalProps {
    isOpen: boolean
    setIsOpen: (open: boolean) => void
}

export const CreateClubModal = (props: CreateClubModalProps) => {
    const { isOpen, setIsOpen } = props
    const dispatch = useDispatch<AppDispatch>()
    const inputRef = useRef<HTMLInputElement | undefined>(null)
    const [name, setName] = useState('')

    const handleCreateClub = useCallback(() => {
        if (name) {
            dispatch(clubActions.createClub(name))
            setIsOpen(false)
        }
    }, [dispatch, name])

    return <UdongModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
    >
        <UdongCloseButton setIsOpen={setIsOpen}/>

        <VStack
            style={{ padding: '7px 90px 20px 90px' }}
            width={'100%'}
            alignItems={'start'}
        >
            <UdongText style={'GeneralTitle'}>동아리 생성</UdongText>
            <Spacer height={5}/>
            <UdongText style={'GeneralContent'}>생성하려는 동아리의 이름을 정해주세요</UdongText>
            <Spacer height={20}/>

            <UdongTextField
                onChange={() => setName(inputRef.current?.value ?? '')}
                inputRef={inputRef}
            />
            <Spacer height={27}/>

            <HStack
                width={'100%'}
                justifyContent={'center'}
            >
                <UdongButton
                    style={'fill'}
                    color={name ? UdongColors.Primary : UdongColors.GrayNormal}
                    onClick={handleCreateClub}
                    padding={'10px 25px'}
                >
                    생성하기
                </UdongButton>
            </HStack>

        </VStack>
    </UdongModal>
}
