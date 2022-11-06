import { Spacer } from '../../components/Spacer'
import { HStack, VStack } from '../../components/Stack'
import { UdongButton } from '../../components/UdongButton'
import { UdongImage } from '../../components/UdongImage'
import { UdongModal } from '../../components/UdongModal'
import { UdongText } from '../../components/UdongText'
import close from '../../icons/IcClose.png'
import { UdongColors } from '../../theme/ColorPalette'

interface DeleteModalProps {
    deleteObjectText: string
    warningText?: string
    isOpen: boolean
    setIsOpen: (open: boolean) => void
}

export const DeleteModal = (props: DeleteModalProps) => {
    const { deleteObjectText, warningText, isOpen, setIsOpen } = props
    return <UdongModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
    >
        <VStack
            width={'100%'}
            alignItems={'start'}
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
            <Spacer height={7}/>
            <VStack
                paddingHorizontal={90}
                width={'100%'}
            >
                <UdongText style={'GeneralTitle'}>{`${deleteObjectText} 삭제`}</UdongText>
                <Spacer height={30}/>
                <UdongText style={'GeneralContent'}>{`정말 ${deleteObjectText}를 삭제하시겠습니까?`}</UdongText>
                <Spacer height={5}/>
                {warningText &&
                    <UdongText style={'ListContentXS'}>{`※ ${warningText}`}</UdongText>
                }

                <Spacer height={35}/>
                <HStack justifyContent={'center'}>
                    <UdongButton
                        style={'line'}
                        color={UdongColors.Warning}
                        onClick={() => {return}}
                    >
                        삭제하기
                    </UdongButton>
                </HStack>
                <Spacer height={20}/>
            </VStack>
        </VStack>
    </UdongModal>
}
