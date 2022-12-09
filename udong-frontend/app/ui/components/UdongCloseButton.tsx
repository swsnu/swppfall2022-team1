import close from '../icons/IcClose.png'
import { VStack } from './Stack'
import { UdongImage } from './UdongImage'

interface UdongCloseButtonProps {
    setIsOpen: (open: boolean) => void
}

export const UdongCloseButton = (props: UdongCloseButtonProps) => {
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
