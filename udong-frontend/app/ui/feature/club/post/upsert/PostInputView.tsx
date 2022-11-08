import dynamic from 'next/dynamic'
import { ChangeEvent, Dispatch, SetStateAction, useMemo } from 'react'

import 'react-quill/dist/quill.snow.css'
import { Spacer } from '../../../../components/Spacer'
import { HStack, VStack } from '../../../../components/Stack'
import { UdongText } from '../../../../components/UdongText'
import { UdongColors } from '../../../../theme/ColorPalette'

interface IProps {
    title: string
    setTitle: Dispatch<SetStateAction<string>>
    contents: string
    setContents: Dispatch<SetStateAction<string>>
}

export const PostInputView = (props: IProps) => {

    const { title, setTitle, contents, setContents } = props

    const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), {
        ssr: false,
        loading: () => <p>Loading ...</p>,
    }), [])

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
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

    return <VStack paddingVertical={45}>
        <HStack alignItems={'center'}>
            <UdongText style={'GeneralTitle'}>게시글 제목</UdongText>
            <Spacer width={30}/>
            <input
                type={'text'}
                value={title}
                placeholder={'제목을 입력해주세요'}
                onChange={onChange}
                style={{
                    outline: UdongColors.GrayBright,
                    border: `1px solid ${UdongColors.GrayNormal}`,
                    fontFamily: 'sans-serif',
                    fontSize: 14,
                    flexGrow: 1,
                    padding: 10,
                }}
            />
        </HStack>

        <Spacer height={20}/>

        <ReactQuill
            modules={modules}
            formats={formats}
            value={contents}
            onChange={(text: string) => {setContents(text)}}
            placeholder={'내용을 입력하세요.'}
            theme={'snow'}
            style={{
                border: `1px solid ${UdongColors.GrayNormal}`,
                outline: UdongColors.GrayNormal,
            }}
        />
    </VStack>
}
