import { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch } from '../../../../domain/store'
import { clubSelector } from '../../../../domain/store/club/ClubSelector'
import { clubActions, ClubRegisterAPIErrorType } from '../../../../domain/store/club/ClubSlice'
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
    const error = useSelector(clubSelector.clubRegisterError)

    const inputRef = useRef<HTMLInputElement | undefined>(null)
    const [code, setCode] = useState('')

    useEffect(() => {
        if (!isOpen) {
            dispatch(clubActions.resetClubRegisterErrror())
        }
    }, [dispatch, isOpen])

    const handleRegisterClub = useCallback(() => {
        if (code) {
            dispatch(clubActions.registerClub(code))
        }
    }, [dispatch, code])

    const getErrorMessage = useCallback((error: ClubRegisterAPIErrorType): string => {
        if (error === 'already_registered') {
            return '이미 가입된 동아리입니다.'
        } else if (error === 'invalid_code') {
            return '코드가 유효하지 않습니다.'
        } else {
            return '오류가 발생했습니다.'
        }
    }, [])

    if (error) {
        return <UdongErrorModal
            message={getErrorMessage(error)}
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
