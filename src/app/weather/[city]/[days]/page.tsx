import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import WeatherDetails from '@/components/WeatherDetails/WeatherDetails'
import { getWeather } from '@/server/weather/open-meteo'

export const generateMetadata = async ({
  params
}: TProps): Promise<Metadata> => {
  const { city, days: daysParam } = await params

  const rawCity = decodeURIComponent(city)
  const days = Number(daysParam)

  if (!Number.isInteger(days) || days < 1 || days > 7) {
    return {
      title: 'Weather | Weather Mini Dashboard'
    }
  }

  return {
    title: `${rawCity} Weather Forecast | Weather Mini Dashboard`,
    description: `Check the current weather and ${days}-day forecast for ${rawCity}.`
  }
}

type TProps = {
  params: Promise<{
    city: string
    days: string
  }>
}

const WeatherPage = async ({ params }: TProps) => {
  const { city, days: daysParam } = await params

  const days = Number(daysParam)

  if (!Number.isInteger(days) || days < 1 || days > 7) {
    notFound()
  }

  let weather

  try {
    weather = await getWeather(city, days)
  } catch (error) {
    const isError = error instanceof Error

    if (isError && error.message === `City "${city}" was not found.`) {
      notFound()
    }

    const message = isError ? error.message : 'Something went wrong.'
    throw new Error(message)
  }

  return <WeatherDetails city={city} weather={weather} />
}

export default WeatherPage
