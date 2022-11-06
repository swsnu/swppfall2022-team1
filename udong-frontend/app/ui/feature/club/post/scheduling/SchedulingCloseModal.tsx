import { UdongModal } from '../../../../components/UdongModal'

interface UdongModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export const SchedulingCloseModal = (props: UdongModalProps) => {
    const { isOpen, setIsOpen } = props
    return <UdongModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
    >일정 수합 마감</UdongModal>
}
