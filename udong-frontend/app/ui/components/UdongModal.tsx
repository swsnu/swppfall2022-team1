import styled from '@emotion/styled'
import { ReactNode, useCallback } from 'react'

import { UdongColors } from '../theme/ColorPalette'

interface UdongModalProps {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    children: ReactNode
    width?: number | string
}

export const UdongModal = (props: UdongModalProps) => {
    const { isOpen, setIsOpen, children, width } = props

    const closeModal = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation()
        if (event.target === event.currentTarget) {
            setIsOpen(false)
        }
    }, [setIsOpen])

    return <>
        {isOpen &&
            <ModalBackground onClick={closeModal}>
                <ModalContent width={width}>
                    {children}
                </ModalContent>
            </ModalBackground>
        }
    </>
}

const ModalBackground = styled.div({
    display: 'flex',
    position: 'fixed',
    width: '100vw',
    height: '100vh',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
})

const ModalContent = styled.div<{ width?: number | string }>(props => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: UdongColors.White,
    width: props.width ?? 560,
    borderRadius: 30,
}))
