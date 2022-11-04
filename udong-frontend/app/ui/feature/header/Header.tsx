import { HStack } from '../../components/Stack'
import { UdongImage } from '../../components/UdongImage'
import Logo from '../../icons/Logo.png'

interface HeaderViewProps {

}

export const HeaderView = () => {
    return (
        <HStack height={80}>
            <UdongImage
                src={Logo.src}
                height={50}
                width={160}
            />

        </HStack>
    )

}
