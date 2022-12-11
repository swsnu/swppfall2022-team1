import { UdongTextField, UdongTextFieldProps } from './UdongTextField'

export const UdongSearchBar = (props: UdongTextFieldProps) => {
    return <UdongTextField
        placeholder={'검색어를 입력해주세요'}
        {...props}
    />
}
