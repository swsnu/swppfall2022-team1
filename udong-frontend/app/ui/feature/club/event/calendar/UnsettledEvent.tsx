import { CSSProperties } from 'react'

import { UdongColors } from '../../../../theme/ColorPalette'

interface UnsettledEventProps {
    title: string
    onClick: () => void
}

const UnsettledEvent = (props: UnsettledEventProps & CSSProperties) => {
    const { title, onClick } = props
    return <button
        style={{
            width: '15vw',
            height: '24px',
            borderRadius: '2px',
            border: 'none',
            backgroundColor: UdongColors.GrayBright,
            color: UdongColors.GrayDark,
            cursor: 'pointer',
            fontSize: '12px',
            display: 'block',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        }}
        onClick={onClick}
    >
        {title}
    </button>

}

export default UnsettledEvent
