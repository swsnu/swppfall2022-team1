import dynamic from 'next/dynamic'
import {  Dispatch, SetStateAction, useMemo }  from 'react'

import { Spacer } from '../../../components/Spacer'
import { VStack } from '../../../components/Stack'
import { UdongColors } from '../../../theme/ColorPalette'

import 'react-quill/dist/quill.snow.css'

interface IProps {
    contents: string
    setContents: Dispatch<SetStateAction<string>>
}

export const PostContentView = ({ contents, setContents }: IProps) => {

    const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), {
        ssr: false,
        loading: () => <p>Loading ...</p>,
    }), [])

    const onChange = (text: string) => {
        setContents(text)
    }

    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{ 'font': [] }], // font
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }], // header
                ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'], // tool formula: optional 
                [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }], // list, indent 
                ['link', 'image', 'video'], 
                [{ 'align': [] }, { 'color': [] }, { 'background': [] }], 
                ['clean'], // clear toolbar setting
            ],
        },  
    }
    ), [])

    const formats = [
        'font',
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block', 'formula',
        'list', 'bullet', 'indent',
        'link', 'image', 'video',
        'align', 'color', 'background',        
    ]

    return <VStack>
        <Spacer
            height={1}
            backgroundColor={UdongColors.GrayDark}
        />
        <h1>이 child부터가 고동현 영역</h1>
        <p>여기서 library 쓰면 됨</p>
        <ReactQuill
            modules = {modules}
            formats = {formats}
            value = {contents}
            onChange = {onChange}
            placeholder='내용을 입력하세요.'
            theme = {'snow'}
        />
        <p>edit에서도 재사용할 예정이니 input하는 거 외에 다른 거 X (raw한 컴포넌트)</p>
    </VStack>
}
