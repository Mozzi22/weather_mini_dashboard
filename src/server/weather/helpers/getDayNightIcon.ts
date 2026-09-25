import { WEATHER_ICONS } from '@/utils/constants/weatherIcons'

export const getDayNightIcon = (code: number, isDay: boolean) => {
  const weather = {
    0: {
      icon: isDay ? WEATHER_ICONS.sunnyDay : WEATHER_ICONS.sunnyNight,
      description: 'Sunny'
    },
    1: {
      icon: isDay ? WEATHER_ICONS.sunnyDay : WEATHER_ICONS.sunnyNight,
      description: 'Mainly clear'
    },
    2: {
      icon: isDay
        ? WEATHER_ICONS.partlyCloudyDay
        : WEATHER_ICONS.partlyCloudyNight,

      description: 'Partly cloudy'
    }
  }

  return weather[code as keyof typeof weather]
}
