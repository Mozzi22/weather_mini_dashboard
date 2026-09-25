import { isSubscribed, saveSubscription } from '@/server/subscription'

describe('subscriptions', () => {
  it('rejects the same city and phone', () => {
    saveSubscription({
      name: "В'ячеслав",
      phone: '+380501234567',
      postalCode: '01054',
      sendTime: '07:30',
      city: 'Odesa',
      id: 123
    })

    expect(isSubscribed('+380501234567', 123)).toBe(true)
  })

  it('accepts the same phone for another city', () => {
    expect(isSubscribed('+380501234567', 456)).toBe(false)
  })
})
