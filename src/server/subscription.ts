import type { TSubscriptionFormData } from '@/schemas/subscription'

const subscriptions: TSubscriptionFormData[] = []

export const isSubscribed = (phone: string, id: number) =>
  subscriptions.some(
    (subscription) => subscription.phone === phone && subscription.id === id
  )

export const saveSubscription = (subscription: TSubscriptionFormData) =>
  subscriptions.push(subscription)

export const getSubscription = (
  cityId: number
): TSubscriptionFormData | undefined => {
  for (let i = subscriptions.length - 1; i >= 0; i--) {
    if (subscriptions[i].id === cityId) {
      return subscriptions[i]
    }
  }

  return undefined
}
