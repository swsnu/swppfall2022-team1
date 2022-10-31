import { Spacer } from '../../../components/Spacer'
import { HStack, VStack } from '../../../components/Stack'
import { UdongButton } from '../../../components/UdongButton'
import { UdongImage } from '../../../components/UdongImage'
import { UdongModal } from '../../../components/UdongModal'
import { UdongText } from '../../../components/UdongText'
import { UdongTextField } from '../../../components/UdongTextField'
import close from '../../../icons/IcClose.png'

interface RegisterClubModalProps {
    isOpen: boolean
    setIsOpen: (open: boolean) => void
}

export const RegisterClubModal = (props: RegisterClubModalProps) => {
    const { isOpen, setIsOpen } = props
    return <UdongModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
    >
        <VStack
            width={'100%'}
            alignItems={'end'}
            style={{ padding: '25px 25px 0 25px' }}
        >
            <UdongImage
                src={close.src}
                height={15}
                width={15}
                onClick={() => setIsOpen(false)}
            />
        </VStack>

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
                defaultValue={''}
            />
            <Spacer height={27}/>

            <HStack
                width={'100%'}
                justifyContent={'center'}
            >
                <UdongButton
                    style={'fill'}
                    onClick={() => setIsOpen(true)}
                    padding={'10px 25px'}
                >
                    가입하기
                </UdongButton>
            </HStack>

        </VStack>
    </UdongModal>
}
