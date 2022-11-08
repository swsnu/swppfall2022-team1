import { Spacer } from '../../components/Spacer'
import { HStack, VStack } from '../../components/Stack'
import { UdongButton } from '../../components/UdongButton'
import { UdongModal } from '../../components/UdongModal'
import { UdongText } from '../../components/UdongText'
import { UdongColors } from '../../theme/ColorPalette'
import { CloseModalButton } from '../home/mydong/CloseModalButton'

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
            <CloseModalButton setIsOpen={setIsOpen}/>
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
