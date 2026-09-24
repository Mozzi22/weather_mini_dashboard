import { z } from 'zod'

import {
  PHONE_REGEXP,
  POSTAL_CODE_REGEXP,
  TIME_REGEXP
} from '@/utils/constants/regexp'

export const subscriptionSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .max(100, 'Name must be 100 characters or less'),
  phone: z.string().regex(PHONE_REGEXP, 'Phone must have format +380XXXXXXXXX'),
  postalCode: z
    .string()
    .regex(POSTAL_CODE_REGEXP, 'Postal code must contain 5 digits')
    .optional()
    .or(z.literal('')),
  sendTime: z
    .string()
    .regex(TIME_REGEXP, 'Time must be between 05:00 and 11:00'),
  city: z.string().trim().min(1, 'City is required'),
  latitude: z.string().trim().min(1, 'Latitude is required'),
  longitude: z.string().trim().min(1, 'Longitude is required')
})

export type TSubscriptionFormData = z.infer<typeof subscriptionSchema>
