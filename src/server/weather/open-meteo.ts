import { env } from '@/schemas/env'
import { geocodingResponseSchema } from '@/schemas/geocodingResponse'
import { weatherResponseSchema } from '@/schemas/weatherResponse'
import { getWeatherDescription } from '@/server/weather/helpers/getWeatherDescription'
import { TWeatherData } from '@/types/OpenMeteo'

const fetchWithTimeout = async (url: string): Promise<Response> => {
  try {
    return await fetch(url, {
      signal: AbortSignal.timeout(env.OPEN_METEO_TIMEOUT),
      cache: 'no-store'
    })
  } catch (error) {
    if (error instanceof DOMException && error.name === 'TimeoutError')
      throw new Error('Weather service is taking too long to respond.')

    throw new Error('Unable to connect to the weather service.')
  }
}

export const getCityWeather = async (city: string) => {
  const searchParams = new URLSearchParams({
    name: city,
    count: '1',
    language: 'en',
    format: 'json'
  })
  const geocodingResponse = await fetchWithTimeout(
    `${env.OPEN_METEO_GEOCODING_URL}?${searchParams}`
  )

  const data: unknown = await geocodingResponse.json()
  const result = geocodingResponseSchema.safeParse(data)
  if (!result.success) {
    throw new Error('Weather service returned data in an unexpected format.')
  }
  const geocodingData = result.data

  return geocodingData.results?.[0]
}

export const getWeather = async (
  city: string,
  days: number
): Promise<TWeatherData> => {
  const location = await getCityWeather(city)

  if (!location) throw new Error(`City "${city}" was not found.`)

  const weatherParams = new URLSearchParams({
    latitude: String(location.latitude),
    longitude: String(location.longitude),
    current: [
      'temperature_2m',
      'apparent_temperature',
      'wind_speed_10m',
      'weather_code',
      'is_day'
    ].join(','),
    daily: [
      'temperature_2m_min',
      'temperature_2m_max',
      'precipitation_probability_max',
      'weather_code'
    ].join(','),
    forecast_days: String(days),
    timezone: 'auto',
    wind_speed_unit: 'ms'
  })

  const weatherResponse = await fetchWithTimeout(
    `${env.OPEN_METEO_API_URL}?${weatherParams}`
  )

  const data: unknown = await weatherResponse.json()
  const result = weatherResponseSchema.safeParse(data)
  if (!result.success) {
    throw new Error('Weather service returned data in an unexpected format.')
  }
  const weatherData = result.data

  const { current, daily } = weatherData

  return {
    id: location.id,
    city: location.name,
    current: {
      temperature: Math.round(current.temperature_2m!),
      apparentTemperature: Math.round(current.apparent_temperature!),
      windSpeed: current.wind_speed_10m,
      weatherCode: current.weather_code,
      time: current.time,
      isDay: !!current.is_day
    },
    forecast: daily.time.slice(0, days).map((date, index) => ({
      date,
      minTemperature: Math.round(daily.temperature_2m_min[index]),
      maxTemperature: Math.round(daily.temperature_2m_max[index]),
      precipitationProbability: daily.precipitation_probability_max[index],
      weatherCode: getWeatherDescription(daily.weather_code[index], true).icon
    }))
  }
}
