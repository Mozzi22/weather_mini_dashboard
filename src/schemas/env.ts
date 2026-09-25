import { z } from 'zod'

export const envSchema = z.object({
  OPEN_METEO_API_URL: z.string().url('Invalid URL'),
  OPEN_METEO_GEOCODING_URL: z.string().url('Invalid URL'),
  OPEN_METEO_TIMEOUT: z.coerce
    .number()
    .int('Must be an integer')
    .positive('Must be greater than 0')
})

export const env = envSchema.parse({
  OPEN_METEO_API_URL: process.env.OPEN_METEO_API_URL,
  OPEN_METEO_GEOCODING_URL: process.env.OPEN_METEO_GEOCODING_URL,
  OPEN_METEO_TIMEOUT: process.env.OPEN_METEO_TIMEOUT
})
