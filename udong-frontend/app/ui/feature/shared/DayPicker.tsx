import { UdongColors } from '../../theme/ColorPalette'

interface DayPickerProps {
    day: DAYS | undefined
    setDay: (day: DAYS) => void
    fixed?: boolean
}

export enum DAYS {
    MONDAY='월',
    TUESDAY='화',
    WEDNESDAY='수',
    THURSDAY='목',
    FRIDAY='금',
    SATURDAY='토',
    SUNDAY='일'
}

export const DayPicker = ({ day, setDay, fixed } : DayPickerProps) => {
    return <select
        disabled={fixed}
        value={day}
        style={{ width: 145, height: 32, color: UdongColors.GrayDark, padding: 5 }}
    >
        <option
            disabled={true}
            selected={!fixed}
            value={undefined}
        >요일을 선택하세요</option>
        <option
            value={DAYS.MONDAY}
            onChange={()=>setDay(DAYS.MONDAY)}
        >월요일</option>
        <option
            value={DAYS.TUESDAY}
            onChange={()=>setDay(DAYS.TUESDAY)}
        >화요일</option>
        <option
            value={DAYS.WEDNESDAY}
            onChange={()=>setDay(DAYS.WEDNESDAY)}
        >수요일</option>
        <option
            value={DAYS.THURSDAY}
            onChange={()=>setDay(DAYS.THURSDAY)}
        >목요일</option>
        <option
            value={DAYS.FRIDAY}
            onChange={()=>setDay(DAYS.FRIDAY)}
        >금요일</option>
        <option
            value={DAYS.SATURDAY}
            onChange={()=>setDay(DAYS.SATURDAY)}
        >토요일</option>
        <option
            value={DAYS.SUNDAY}
            onChange={()=>setDay(DAYS.SUNDAY)}
        >일요일</option>
    </select>
}
