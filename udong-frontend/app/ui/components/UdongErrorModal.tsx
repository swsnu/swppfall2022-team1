import { UdongColors } from '../theme/ColorPalette'
import { Spacer } from './Spacer'
import { UdongCloseButton } from './UdongCloseButton'
import { UdongModal } from './UdongModal'
import { UdongText } from './UdongText'

interface UdongErrorModalProps {
    message: string
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
}

export const UdongErrorModal = (props: UdongErrorModalProps) => {
    const { message, isOpen, setIsOpen } = props

    return <UdongModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
    >
        <UdongCloseButton setIsOpen={setIsOpen}/>
        <Spacer height={50}/>
        <UdongText
            style={'GeneralTitle'}
            color={UdongColors.Warning}
        >요청을 실패하였습니다.</UdongText>
        <Spacer height={20}/>
        <UdongText style={'GeneralContent'}>{message}</UdongText>
        <Spacer height={70}/>
    </UdongModal>
}
