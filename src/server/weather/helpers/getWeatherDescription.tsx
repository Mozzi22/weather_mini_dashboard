import { getDayNightIcon } from '@/server/weather/helpers/getDayNightIcon'
import { WEATHER_CODES } from '@/utils/constants/weatherIcons'

export const getWeatherDescription = (code: number, isDay: boolean) => {
  if (code >= 0 && code <= 2) return getDayNightIcon(code, isDay)

  return (
    WEATHER_CODES[code] ?? {
      icon: '/weather/clear-day.svg',
      description: 'Unknown weather conditions'
    }
  )
}
