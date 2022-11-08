import styled from '@emotion/styled'
import { useCallback, useEffect, useState } from 'react'

import { UdongImage } from '../../components/UdongImage'
import up from '../../icons/IcScrollUp.png'
import { UdongColors } from '../../theme/ColorPalette'

export const ScrollToTopButton = () => {
    const [scrolled, setScrolled] = useState<boolean>(false)

    const scrollToTop = useCallback(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout> | null = null
        const onScroll = () => {
            if (!timeout) {
                timeout = setTimeout(() => {
                    setScrolled(document.body.scrollTop > 20 || document.documentElement.scrollTop > 20)
                    timeout = null
                }, 100)
            }
        }

        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return <ScrollUpButton
        onClick={scrollToTop}
        style={{ display: (scrolled ? 'flex' : 'none') }}
    >
        <UdongImage
            src={up.src}
            height={15}
            width={15}
            clickable
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
    cursor: 'pointer',
})
