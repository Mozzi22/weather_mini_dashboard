import { z } from 'zod'

export const weatherResponseSchema = z.object({
  timezone: z.string(),

  current: z.object({
    time: z.string(),
    temperature_2m: z.number(),
    apparent_temperature: z.number(),
    wind_speed_10m: z.number(),
    weather_code: z.number(),
    is_day: z.number()
  }),

  daily: z.object({
    time: z.array(z.string()),
    temperature_2m_min: z.array(z.number()),
    temperature_2m_max: z.array(z.number()),
    precipitation_probability_max: z.array(z.number()),
    weather_code: z.array(z.number())
  })
})
