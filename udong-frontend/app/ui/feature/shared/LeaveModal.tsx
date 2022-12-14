import { Spacer } from '../../components/Spacer'
import { HStack, VStack } from '../../components/Stack'
import { UdongButton } from '../../components/UdongButton'
import { UdongCloseButton } from '../../components/UdongCloseButton'
import { UdongModal } from '../../components/UdongModal'
import { UdongText } from '../../components/UdongText'
import { UdongColors } from '../../theme/ColorPalette'

interface LeaveModalProps {
    leaveObjectText: string
    isOpen: boolean
    setIsOpen: (open: boolean) => void
    onClickLeave: () => void
}

export const LeaveModal = (props: LeaveModalProps) => {
    const { leaveObjectText, isOpen, setIsOpen, onClickLeave } = props
    return <UdongModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
    >
        <VStack
            width={'100%'}
            alignItems={'start'}
        >
            <UdongCloseButton setIsOpen={setIsOpen}/>
            <Spacer height={7}/>

            <VStack
                paddingHorizontal={90}
                width={'100%'}
            >
                <UdongText style={'GeneralTitle'}>{`${leaveObjectText} 탈퇴`}</UdongText>
                <Spacer height={30}/>
                <UdongText style={'GeneralContent'}>{`정말 ${leaveObjectText}을(를) 탈퇴하시겠습니까?`}</UdongText>
                <Spacer height={5}/>

                <Spacer height={35}/>
                <HStack justifyContent={'center'}>
                    <UdongButton
                        style={'line'}
                        color={UdongColors.Warning}
                        onClick={onClickLeave}
                    >
                        탈퇴하기
                    </UdongButton>
                </HStack>
                <Spacer height={20}/>
            </VStack>
        </VStack>
    </UdongModal>
}
