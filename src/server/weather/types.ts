export type TWeatherDay = {
  date: string
  minTemperature: number
  maxTemperature: number
  precipitationProbability: number
  weatherCode: string
}

export type TWeatherData = {
  id: number
  city: string
  current: {
    temperature: number
    apparentTemperature: number
    windSpeed: number
    weatherCode: number
    time: string
    isDay: boolean
  }
  forecast: TWeatherDay[]
}

export type TGeocodingResponse = {
  results?: Array<{
    id: number
    name: string
    latitude: number
    longitude: number
    timezone: string
  }>
}

export type TOpenMeteoResponse = {
  timezone: string

  current: {
    time: string
    temperature_2m: number
    apparent_temperature: number
    wind_speed_10m: number
    weather_code: number
    is_day: 1 | 0
  }

  daily: {
    time: string[]
    temperature_2m_min: number[]
    temperature_2m_max: number[]
    precipitation_probability_max: number[]
    weather_code: number[]
  }
}
