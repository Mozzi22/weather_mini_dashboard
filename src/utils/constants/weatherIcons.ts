export const WEATHER_ICONS = {
  sunnyDay: '/weather/clear-day.svg',
  sunnyNight: '/weather/clear-night.svg',
  partlyCloudyDay: '/weather/partly-cloudy-day.svg',
  partlyCloudyNight: '/weather/partly-cloudy-night.svg',
  cloudy: '/weather/overcast.svg',
  fog: '/weather/fog.svg',
  drizzle: '/weather/drizzle.svg',
  freeze: '/weather/sleet.svg',
  rain: '/weather/rain.svg',
  snow: '/weather/snow.svg',
  thunderstorm: '/weather/thunderstorms.svg'
} as const

export const WEATHER_CODES: Record<
  number,
  { icon: string; description: string }
> = {
  3: {
    icon: WEATHER_ICONS.cloudy,
    description: 'Overcast'
  },

  45: {
    icon: WEATHER_ICONS.fog,
    description: 'Fog'
  },
  48: {
    icon: WEATHER_ICONS.fog,
    description: 'Depositing rime fog'
  },

  51: {
    icon: WEATHER_ICONS.drizzle,
    description: 'Light drizzle'
  },
  53: {
    icon: WEATHER_ICONS.drizzle,
    description: 'Moderate drizzle'
  },
  55: {
    icon: WEATHER_ICONS.drizzle,
    description: 'Dense drizzle'
  },
  56: {
    icon: WEATHER_ICONS.drizzle,
    description: 'Light freezing drizzle'
  },
  57: {
    icon: WEATHER_ICONS.drizzle,
    description: 'Dense freezing drizzle'
  },

  61: {
    icon: WEATHER_ICONS.rain,
    description: 'Slight rain'
  },
  63: {
    icon: WEATHER_ICONS.rain,
    description: 'Moderate rain'
  },
  65: {
    icon: WEATHER_ICONS.rain,
    description: 'Heavy rain'
  },
  66: {
    icon: WEATHER_ICONS.rain,
    description: 'Light freezing rain'
  },
  67: {
    icon: WEATHER_ICONS.rain,
    description: 'Heavy freezing rain'
  },

  71: {
    icon: WEATHER_ICONS.snow,
    description: 'Slight snow fall'
  },
  73: {
    icon: WEATHER_ICONS.snow,
    description: 'Moderate snow fall'
  },
  75: {
    icon: WEATHER_ICONS.snow,
    description: 'Heavy snow fall'
  },
  77: {
    icon: WEATHER_ICONS.snow,
    description: 'Snow grains'
  },

  80: {
    icon: WEATHER_ICONS.freeze,
    description: 'Slight rain showers'
  },
  81: {
    icon: WEATHER_ICONS.freeze,
    description: 'Moderate rain showers'
  },
  82: {
    icon: WEATHER_ICONS.freeze,
    description: 'Violent rain showers'
  },

  85: {
    icon: WEATHER_ICONS.snow,
    description: 'Slight snow showers'
  },
  86: {
    icon: WEATHER_ICONS.snow,
    description: 'Heavy snow showers'
  },

  95: {
    icon: WEATHER_ICONS.thunderstorm,
    description: 'Thunderstorm'
  },
  96: {
    icon: WEATHER_ICONS.thunderstorm,
    description: 'Thunderstorm with slight hail'
  },
  99: {
    icon: WEATHER_ICONS.thunderstorm,
    description: 'Thunderstorm with heavy hail'
  }
}
