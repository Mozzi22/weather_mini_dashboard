import { TOpenMeteoResponse } from '@/server/weather/types'

export const isValidWeatherResponse = (
  data: TOpenMeteoResponse,
  days: number
): boolean => {
  const current = data.current
  const daily = data.daily

  if (
    !current ||
    typeof current.time !== 'string' ||
    typeof current.temperature_2m !== 'number' ||
    typeof current.apparent_temperature !== 'number' ||
    typeof current.wind_speed_10m !== 'number' ||
    typeof current.weather_code !== 'number'
  ) {
    return false
  }

  if (
    !daily ||
    !Array.isArray(daily.time) ||
    !Array.isArray(daily.temperature_2m_min) ||
    !Array.isArray(daily.temperature_2m_max) ||
    !Array.isArray(daily.precipitation_probability_max)
  ) {
    return false
  }

  return (
    daily.time.length >= days &&
    daily.temperature_2m_min.length >= days &&
    daily.temperature_2m_max.length >= days &&
    daily.precipitation_probability_max.length >= days
  )
}
