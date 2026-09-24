import type { Metadata } from 'next'
import { cookies } from 'next/headers'

import SubscribedCard from '@/app/weather/[city]/subscribed/components/SubscribedCard'
import WithoutSubscribe from '@/app/weather/[city]/subscribed/components/WithoutSubscribe'
import { getNextForecastTime } from '@/helpers/getNextForecastTime'
import {
  subscriptionSchema,
  TSubscriptionFormData
} from '@/schemas/subscription'
import { getSubscription } from '@/server/subscription'
import { getCityWeather } from '@/server/weather/open-meteo'

export const generateMetadata = async ({
  params
}: TProps): Promise<Metadata> => {
  const { city } = await params
  const rawCity = decodeURIComponent(city)

  return {
    title: `${rawCity} Weather Subscription | Weather Mini Dashboard`,
    description: `Your daily weather forecast subscription for ${rawCity}.`
  }
}

type TProps = {
  params: Promise<{
    city: string
  }>
}

const SubscribedPage = async ({ params }: TProps) => {
  const { city } = await params

  const weatherData = await getCityWeather(city)
  // todo page
  if (!weatherData) return <>City {city} was not found.</>

  const cookieStore = await cookies()
  const cookieData = cookieStore.get(weatherData.id.toString())?.value

  let subscription: TSubscriptionFormData | undefined
  if (cookieData) {
    try {
      const parsed = JSON.parse(cookieData)

      const result = subscriptionSchema.safeParse(parsed)

      if (result.success) subscription = result.data
    } catch {
      // Ignore invalid cookie
    }
  }

  if (!subscription) {
    subscription = getSubscription(weatherData.id)
  }

  if (!subscription) return <WithoutSubscribe city={weatherData.name} />

  const nextForecast = getNextForecastTime(
    subscription.sendTime,
    weatherData.timezone
  )
  const nextForecastText = `Your first forecast will arrive on ${nextForecast.date} at ${nextForecast.time} ${weatherData.name} time, in ${nextForecast.hoursLeft} hours ${nextForecast.minutesLeft} minutes.`

  return (
    <SubscribedCard
      city={city}
      displayCity={weatherData.name}
      subscription={subscription}
      nextForecastText={nextForecastText}
    />
  )
}

export default SubscribedPage
