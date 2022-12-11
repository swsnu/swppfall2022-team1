import { Dispatch, SetStateAction, useEffect } from 'react'

export function useDebouncedSearch(value: string, setKeyword: Dispatch<SetStateAction<string>>, delay:number ) {
    // State and setters for debounced value
    useEffect(
        () => {
            // Update debounced value after delay
            const handler = setTimeout(() => {
                setKeyword(value)
            }, delay)
            // Cancel the timeout if value changes (also on delay change or unmount)
            // This is how we prevent debounced value from updating if value is changed ...
            // .. within the delay period. Timeout gets cleared and restarted.
            return () => {
                clearTimeout(handler)
            }
        },
        [value, delay, setKeyword], // Only re-call effect if value or delay changes
    )
}
