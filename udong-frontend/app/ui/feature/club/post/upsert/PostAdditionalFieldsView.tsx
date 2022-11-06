import dynamic from 'next/dynamic'
import React, { useMemo, useState } from 'react'

import { Spacer } from '../../../../components/Spacer'
import { HStack, VStack } from '../../../../components/Stack'
import { UdongChip } from '../../../../components/UdongChip'
import { UdongImage } from '../../../../components/UdongImage'
import UdongLoader from '../../../../components/UdongLoader'
import { UdongRadioButton } from '../../../../components/UdongRadioButton'
import { UdongText } from '../../../../components/UdongText'
import add from '../../../../icons/IcPlus.png'
import { UdongColors } from '../../../../theme/ColorPalette'
import { AdditionalFieldItem } from './AdditionalFieldItem'

type SchedulingTimeType = 'days' | 'dates'
enum DAYS {
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY,
    SUNDAY
}

export const PostAdditionalFieldsView = () => {
    const [schedulingTimeType, setSchedulingTimeType] = useState<SchedulingTimeType>('days')
    const [time, setTime] = useState<string>()
    const [day, setDay] = useState<DAYS|undefined>()
    const [dates, setDates] = useState<Date[]>([new Date()])

    const DatePicker = useMemo(() => dynamic(() => import('../../../shared/TUIDatePicker').then((mod)=>mod.default),
        { ssr: false, loading: () =>
            <UdongLoader/> }), [])

    return <VStack>
        <HStack
            alignItems={'center'}
            justifyContent={'space-between'}
            paddingVertical={12}
        >
            <HStack alignItems={'center'}>
                <UdongText style={'GeneralTitle'}>행사</UdongText>
                <Spacer width={70}/>
                <AdditionalFieldItem item={<UdongText style={'ListContentUnderscore'}>교촌 허니콤보 먹고 싶다</UdongText>}/>
                <AdditionalFieldItem item={<UdongText style={'ListContentUnderscore'}>교촌 허니콤보 먹고 싶다</UdongText>}/>
                <AdditionalFieldItem item={<UdongText style={'ListContentUnderscore'}>교촌 허니콤보 먹고 싶다</UdongText>}/>
            </HStack>
            <UdongImage
                src={add.src}
                height={15}
                width={15}
            />
        </HStack>
        <Spacer
            height={1}
            backgroundColor={UdongColors.GrayBright}
        />

        <HStack
            alignItems={'center'}
            justifyContent={'space-between'}
            paddingVertical={12}
        >
            <HStack>
                <UdongText style={'GeneralTitle'}>태그</UdongText>
                <Spacer width={70}/>
                <AdditionalFieldItem
                    item={<UdongChip
                        style={'primary'}
                        text={'전체'}
                    />}
                />
                <AdditionalFieldItem
                    item={<UdongChip
                        style={'gray'}
                        text={'2팀'}
                    />}
                />
            </HStack>
            <UdongImage
                src={add.src}
                height={15}
                width={15}
            />
        </HStack>
        <Spacer
            height={1}
            backgroundColor={UdongColors.GrayBright}
        />

        <HStack
            alignItems={'center'}
            justifyContent={'start'}
            paddingVertical={12}
        >
            <UdongText style={'GeneralTitle'}>일정 수합</UdongText>
            <Spacer width={30}/>
            <UdongRadioButton
                text={'요일'}
                checked={schedulingTimeType === 'days'}
                onCheck={() => setSchedulingTimeType('days')}
            />
            <UdongRadioButton
                text={'날짜'}
                checked={schedulingTimeType === 'dates'}
                onCheck={() => setSchedulingTimeType('dates')}
            />
        </HStack>
        <Spacer height={30}/>
        {
            dates.map((date, i) => (
                <DatePicker
                    key={i}
                    date={date}
                    setDate={(newDate: Date) => {
                        const newDates = dates
                        newDates[i] = newDate
                        setDates(newDates)
                    }}
                />
            ))
        }

        <Spacer height={20}/>
    </VStack>
}
