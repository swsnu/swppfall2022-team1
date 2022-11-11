import { StaticImageData } from 'next/image'

import { UdongImage } from './UdongImage'

interface UdongSelectableIconProps {
    selected: boolean
    selectedIcon: StaticImageData
    unselectedIcon: StaticImageData
    onClickSelected?: () => void
    onClickUnSelected?: () => void
}

export const UdongSelectableIcon =
    ({ selected, selectedIcon, unselectedIcon, onClickSelected, onClickUnSelected }: UdongSelectableIconProps) => {
        return (
            <div
                onClick={selected ? onClickSelected : onClickUnSelected}
            >
                {selected ?
                    <UdongImage
                        src={selectedIcon.src}
                        height={25}
                        width={25}
                    /> :
                    <UdongImage
                        src={unselectedIcon.src}
                        height={25}
                        width={25}
                        clickable
                    />}
            </div>
        )
    }

