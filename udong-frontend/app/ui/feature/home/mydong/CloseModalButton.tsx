import { VStack } from '../../../components/Stack'
import { UdongImage } from '../../../components/UdongImage'
import close from '../../../icons/IcClose.png'

interface CloseModalButtonProps {
    setIsOpen: (open: boolean) => void
}

export const CloseModalButton = (props: CloseModalButtonProps) => {
    const { setIsOpen } = props
    return <VStack
        width={'100%'}
        alignItems={'end'}
        style={{ padding: '25px 25px 0 25px' }}
    >
        <UdongImage
            src={close.src}
            height={15}
            width={15}
            onClick={() => setIsOpen(false)}
            clickable={true}
        />
    </VStack>
}
