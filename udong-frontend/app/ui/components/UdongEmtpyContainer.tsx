import { VStack } from './Stack'
import { UdongText } from './UdongText'

interface UdongEmtpyContainerProps {
    emptyObject: string
}

export const UdongEmtpyContainer = (props: UdongEmtpyContainerProps) => {
    const { emptyObject } = props
    return <VStack
        justifyContent={'center'}
        alignItems={'center'}
        height={'70vh'}
    >
        <UdongText style={'GeneralTitle'}>{`${emptyObject}이 없습니다.`}</UdongText>
    </VStack>
}
