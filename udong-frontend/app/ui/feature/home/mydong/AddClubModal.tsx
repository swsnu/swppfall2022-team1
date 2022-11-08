import { Spacer } from '../../../components/Spacer'
import { HStack, VStack } from '../../../components/Stack'
import { UdongImage } from '../../../components/UdongImage'
import { UdongModal } from '../../../components/UdongModal'
import { UdongText } from '../../../components/UdongText'
import close from '../../../icons/IcClose.png'
import create from '../../../icons/IcCreateClub.png'
import register from '../../../icons/IcRegisterClub.png'
import { UdongColors } from '../../../theme/ColorPalette'

interface AddClubModalProps {
    isOpen: boolean
    setIsOpen: (open: boolean) => void
    onRegisterClubClick: () => void
    onCreateClubClick: () => void
}

export const AddClubModal = (props: AddClubModalProps) => {
    const { isOpen, setIsOpen, onRegisterClubClick, onCreateClubClick } = props
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
                clickable={true}
            />
        </VStack>
        <HStack
            justifyContent={'space-evenly'}
            width={'100%'}
            style={{ paddingBottom: 20 }}
        >
            <VStack
                alignItems={'center'}
                paddingHorizontal={40}
                onClick={onRegisterClubClick}
            >
                <Spacer height={40}/>
                <UdongImage
                    src={register.src}
                    height={80}
                    width={80}
                    clickable={true}
                />
                <Spacer height={34}/>
                <UdongText style={'GeneralTitle'}>동아리 가입</UdongText>
                <Spacer height={40}/>
            </VStack>

            <Spacer
                width={1}
                backgroundColor={UdongColors.GrayBright}
            />

            <VStack
                alignItems={'center'}
                paddingHorizontal={40}
                onClick={onCreateClubClick}
            >
                <Spacer height={40}/>
                <UdongImage
                    src={create.src}
                    height={80}
                    width={80}
                    clickable={true}
                />
                <Spacer height={34}/>
                <UdongText style={'GeneralTitle'}>동아리 생성</UdongText>
                <Spacer height={40}/>
            </VStack>
        </HStack>
    </UdongModal>
}

