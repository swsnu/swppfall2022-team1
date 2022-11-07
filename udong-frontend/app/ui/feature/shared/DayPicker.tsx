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
        {Object.values(DAYS).map((day) => (
            <option
                key={day}
                value={day}
                onChange={()=>setDay(day)}
            >{day}요일</option>
        ))}
    </select>
}
