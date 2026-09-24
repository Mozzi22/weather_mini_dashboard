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

type TProps = {
  params: Promise<{
    city: string
  }>
}

const SubscribedPage = async ({ params }: TProps) => {
  const { city } = await params
  const rawCity = decodeURIComponent(city)
  const normalizedCity = rawCity.trim().toLowerCase()

  const cookieStore = await cookies()
  const cookieKey = `sub_${encodeURIComponent(normalizedCity)}`
  const cookieData = cookieStore.get(cookieKey)?.value

  let subscription: TSubscriptionFormData | undefined
  if (cookieData) {
    try {
      const parsed = JSON.parse(cookieData)

      const result = subscriptionSchema.safeParse(parsed)

      if (result.success) {
        subscription = result.data
      }
    } catch {
      // Ignore invalid cookie
    }
  }

  if (!subscription) {
    subscription = getSubscription(normalizedCity)
  }

  const weatherData = await getCityWeather(city)

  // todo page
  if (!weatherData) return <>City {city} was not found.</>
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
