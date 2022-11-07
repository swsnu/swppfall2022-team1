import styled from '@emotion/styled'

import { UdongColors } from '../../theme/ColorPalette'

export const SlashedBox = styled.div(() => ({
    background: `repeating-linear-gradient(
        56deg,
        transparent,
        transparent 8px,
        ${UdongColors.GrayNormal} 8px,
        ${UdongColors.GrayNormal} 9px
    )`,
}))
