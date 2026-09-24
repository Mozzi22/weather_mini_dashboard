import { notFound } from 'next/navigation'

import WeatherDetails from '@/app/weather/[city]/[days]/components/WeatherDetails'
import { getWeather } from '@/server/weather/open-meteo'

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
    const message =
      error instanceof Error ? error.message : 'Something went wrong.'

    return (
      <>
        <h1>Weather</h1>

        <p>{message}</p>

        <a href={`/weather/${city}/${days}`}>Try again</a>
      </>
    )
  }

  return <WeatherDetails weather={weather} />
}

export default WeatherPage
