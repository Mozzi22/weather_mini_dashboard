import { isValidWeatherResponse } from '@/server/weather/helpers/getIsValidWeatherResponse'
import { getWeatherDescription } from '@/server/weather/helpers/getWeatherDescription'
import {
  TGeocodingResponse,
  TOpenMeteoResponse,
  TWeatherData
} from '@/server/weather/types'

const GEOCODING_API = 'https://geocoding-api.open-meteo.com/v1/search'
const WEATHER_API = 'https://api.open-meteo.com/v1/forecast'

const REQUEST_TIMEOUT = 5000

const fetchWithTimeout = async (url: string): Promise<Response> => {
  try {
    return await fetch(url, {
      signal: AbortSignal.timeout(REQUEST_TIMEOUT),
      cache: 'no-store'
    })
  } catch (error) {
    if (error instanceof DOMException && error.name === 'TimeoutError')
      throw new Error('Weather service is taking too long to respond.')

    throw new Error('Unable to connect to the weather service.')
  }
}

export const getWeather = async (
  city: string,
  days: number
): Promise<TWeatherData> => {
  const searchParams = new URLSearchParams({
    name: city,
    count: '1',
    language: 'en',
    format: 'json'
  })

  const geocodingResponse = await fetchWithTimeout(
    `${GEOCODING_API}?${searchParams}`
  )

  const geocodingData = (await geocodingResponse.json()) as TGeocodingResponse

  const location = geocodingData.results?.[0]

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
    `${WEATHER_API}?${weatherParams}`
  )

  const weatherData = (await weatherResponse.json()) as TOpenMeteoResponse

  if (!isValidWeatherResponse(weatherData, days)) {
    throw new Error('Weather service returned data in an unexpected format.')
  }

  const { current, daily } = weatherData

  return {
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
