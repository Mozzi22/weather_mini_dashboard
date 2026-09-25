import { z } from 'zod'

export const geocodingResponseSchema = z.object({
  results: z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
        latitude: z.number(),
        longitude: z.number(),
        timezone: z.string(),
        feature_code: z.string()
      })
    )
    .optional()
})
