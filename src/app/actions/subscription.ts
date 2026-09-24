'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getFieldErrors } from '@/helpers/getFieldErrors'
import {
  subscriptionSchema,
  TSubscriptionFormData
} from '@/schemas/subscription'
import { isSubscribed, saveSubscription } from '@/server/subscription'

type TSubscriptionField = keyof TSubscriptionFormData

export type TSubscriptionState = {
  errors?: Partial<Record<TSubscriptionField, string[]>>
  message?: string
}

export const subscribe = async (
  data: TSubscriptionFormData
): Promise<TSubscriptionState> => {
  const result = subscriptionSchema.safeParse(data)

  if (!result.success) {
    return {
      errors: getFieldErrors(result.error),
      message: 'Please check the highlighted fields.'
    }
  }

  await new Promise((resolve) => setTimeout(resolve, 1500))

  const { city, phone, latitude, longitude } = result.data

  if (isSubscribed(phone, latitude, longitude)) {
    return {
      errors: {
        phone: ['This phone is already subscribed to this city.']
      },
      message: 'This subscription already exists.'
    }
  }

  saveSubscription(result.data)

  const cookieStore = await cookies()
  const cookieKey = `sub_${encodeURIComponent(city.trim().toLowerCase())}`
  cookieStore.set(cookieKey, JSON.stringify(result.data), {
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
    sameSite: 'lax'
  })

  redirect(`/weather/${encodeURIComponent(city)}/subscribed`)
}
