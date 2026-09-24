import type { TSubscriptionFormData } from '@/schemas/subscription'

const subscriptions: TSubscriptionFormData[] = []

export const isSubscribed = (
  phone: string,
  latitude: string,
  longitude: string
) =>
  subscriptions.some(
    (subscription) =>
      subscription.phone === phone &&
      subscription.latitude === latitude &&
      subscription.longitude === longitude
  )

export const saveSubscription = (subscription: TSubscriptionFormData) =>
  subscriptions.push(subscription)

export const getSubscription = (
  normalizedCity: string
): TSubscriptionFormData | undefined => {
  for (let i = subscriptions.length - 1; i >= 0; i--) {
    if (subscriptions[i].city.trim().toLowerCase() === normalizedCity) {
      return subscriptions[i]
    }
  }

  return undefined
}
