import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(timezone)

export const getNextForecastTime = (sendTime: string, timezone: string) => {
  const now = dayjs().tz(timezone)

  const [hours, minutes] = sendTime.split(':').map(Number)

  let nextForecast = now.hour(hours).minute(minutes).second(0).millisecond(0)

  if (!nextForecast.isAfter(now)) {
    nextForecast = nextForecast.add(1, 'day')
  }

  const totalMinutes = nextForecast.diff(now, 'minute')
  const hoursLeft = Math.floor(totalMinutes / 60)
  const minutesLeft = totalMinutes % 60

  return {
    date: nextForecast.format('dddd, D MMMM YYYY'),
    time: nextForecast.format('HH:mm'),
    hoursLeft,
    minutesLeft
  }
}
