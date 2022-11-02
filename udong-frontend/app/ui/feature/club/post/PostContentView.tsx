import dynamic from 'next/dynamic'
import {  Dispatch, SetStateAction, useRef }  from 'react'
import ReactQuill from 'react-quill'

import { Spacer } from '../../../components/Spacer'
import { VStack } from '../../../components/Stack'
import { UdongColors } from '../../../theme/ColorPalette'

import 'react-quill/dist/quill.snow.css'

interface IProps {
    contents: string
    setContents: Dispatch<SetStateAction<string>>
}

export const PostContentView = ({ contents, setContents }: IProps) => {

    const ReactQuill = dynamic(() => import('react-quill'), {
        ssr: false,
        loading: () => <p>Loading ...</p>,
    })

    const quill = useRef<ReactQuill>()

    const onChange = (text: string) => {
        setContents(text)
    }

    return <VStack>
        <Spacer
            height={1}
            backgroundColor={UdongColors.GrayDark}
        />
        <h1>이 child부터가 고동현 영역</h1>
        <p>여기서 library 쓰면 됨</p>
        <ReactQuill
            ref = {(element: ReactQuill | null) => {
                if (element !== null) {
                    quill.current = element
                }
            }}
            value = {contents}
            onChange = {onChange}
            theme = {'snow'}
        />
        <p>edit에서도 재사용할 예정이니 input하는 거 외에 다른 거 X (raw한 컴포넌트)</p>
    </VStack>
}
