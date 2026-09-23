import dayjs from 'dayjs'

export const formatForecastDate = (date: string, index: number) => {
  if (index === 0) return 'Today'
  if (index === 1) return 'Tomorrow'

  return dayjs(date).format('dd, D MMM')
}
