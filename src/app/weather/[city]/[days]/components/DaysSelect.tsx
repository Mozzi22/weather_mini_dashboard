'use client'

import { MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { useRouter } from 'next/navigation'

type TProps = {
  city: string
  days: number
}

const DAYS_OPTIONS = Array.from({ length: 7 }, (_, index) => index + 1)

const DaysSelect = ({ city, days }: TProps) => {
  const router = useRouter()

  const handleChange = (event: SelectChangeEvent<number>) =>
    router.push(`/weather/${city}/${event.target.value}`)

  return (
    <Select value={days} onChange={handleChange}>
      {DAYS_OPTIONS.map((day) => (
        <MenuItem key={day} value={day}>
          {day} {day === 1 ? 'day' : 'days'}
        </MenuItem>
      ))}
    </Select>
  )
}

export default DaysSelect
