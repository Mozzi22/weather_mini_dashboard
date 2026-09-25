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
