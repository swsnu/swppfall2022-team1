import IcSearch from '../icons/IcSearch.png'
import { UdongTextField } from './UdongTextField'

export const UdongSearchBar = () => {
    return <UdongTextField
        defaultValue={'검색어를 입력해주세요'}
        imageSrc={IcSearch.src}
    />
}
