import { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch } from '../../../../domain/store'
import { clubSelector } from '../../../../domain/store/club/ClubSelector'
import { clubActions } from '../../../../domain/store/club/ClubSlice'
import { Spacer } from '../../../components/Spacer'
import { HStack, VStack } from '../../../components/Stack'
import { UdongButton } from '../../../components/UdongButton'
import { UdongCloseButton } from '../../../components/UdongCloseButton'
import { UdongErrorModal } from '../../../components/UdongErrorModal'
import { UdongModal } from '../../../components/UdongModal'
import { UdongText } from '../../../components/UdongText'
import { UdongTextField } from '../../../components/UdongTextField'

interface RegisterClubModalProps {
    isOpen: boolean
    setIsOpen: (open: boolean) => void
}

export const RegisterClubModal = (props: RegisterClubModalProps) => {
    const { isOpen, setIsOpen } = props
    const dispatch = useDispatch<AppDispatch>()
    const error = useSelector(clubSelector.errors).registerError

    const inputRef = useRef<HTMLInputElement | undefined>(null)
    const [code, setCode] = useState('')

    useEffect(() => {
        if (!isOpen) {
            dispatch(clubActions.resetErrors())
        }
    }, [dispatch, isOpen])

    const handleRegisterClub = useCallback(async () => {
        if (code) {
            const response = await dispatch(clubActions.registerClub(code))
            if (response.type === `${clubActions.registerClub.typePrefix}/fulfilled`) {
                setIsOpen(false)
            }
        }
    }, [dispatch, code, setIsOpen])

    if (error) {
        return <UdongErrorModal
            message={error.message}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
        />
    }
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
            <UdongText style={'GeneralTitle'}>동아리 가입</UdongText>
            <Spacer height={5}/>
            <UdongText style={'GeneralContent'}>가입하려는 동아리의 고유코드를 입력하세요</UdongText>
            <Spacer height={20}/>

            <UdongTextField
                onChange={() => setCode(inputRef.current?.value ?? '')}
                inputRef={inputRef}
                maxLength={10}
            />
            <Spacer height={27}/>

            <HStack
                width={'100%'}
                justifyContent={'center'}
            >
                <UdongButton
                    style={'fill'}
                    onClick={handleRegisterClub}
                    padding={'10px 25px'}
                >
                    가입하기
                </UdongButton>
            </HStack>

        </VStack>
    </UdongModal>
}
