import dayjs from 'dayjs'

export const formatCurrentTime = (date: string) => dayjs(date).format('HH:mm')
