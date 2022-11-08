import { UdongColors } from '../../theme/ColorPalette'

interface DayPickerProps {
    selectedDay: DAYS | ''
    setSelectedDay: (day: DAYS|'') => void
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

export const DayPicker = ({ selectedDay, setSelectedDay, fixed } : DayPickerProps) => {

    return <select
        disabled={fixed}
        value={selectedDay}
        style={{ width: 145, height: 32, color: UdongColors.GrayDark, padding: 5 }}
        onChange={(e) => {
            setSelectedDay(e.target.value as DAYS)}
        }
    >
        <option
            disabled={true}
            value={''}
        >요일을 선택하세요</option>
        {Object.values(DAYS).map((day) => (
            <option
                key={day}
                value={day}
            >{day}요일</option>
        ))}
    </select>
}
