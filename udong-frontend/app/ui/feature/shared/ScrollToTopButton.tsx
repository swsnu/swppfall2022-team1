import styled from '@emotion/styled'
import { useCallback } from 'react'

import { UdongImage } from '../../components/UdongImage'
import up from '../../icons/IcScrollUp.png'
import { UdongColors } from '../../theme/ColorPalette'

export const ScrollToTopButton = () => {
    const scrollToTop = useCallback(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])

    return <ScrollUpButton onClick={scrollToTop}>
        <UdongImage
            src={up.src}
            height={15}
            width={15}
        />
    </ScrollUpButton>
}

const ScrollUpButton = styled.div({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    position: 'fixed',
    bottom: 32,
    right: 32,
    borderRadius: 25,
    boxShadow: `1px 1px 2px 2px ${UdongColors.GrayBright}`,
    backgroundColor: UdongColors.White,
})
