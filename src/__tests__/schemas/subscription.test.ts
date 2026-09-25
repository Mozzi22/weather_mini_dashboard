import { subscriptionSchema } from '@/schemas/subscription'

describe('subscriptionSchema', () => {
  it('accepts valid subscription data', () => {
    const result = subscriptionSchema.safeParse({
      name: "В'ячеслав",
      phone: '+380501234567',
      postalCode: '01054',
      sendTime: '07:30',
      city: 'Odesa',
      id: 123
    })

    expect(result.success).toBe(true)
  })

  it('rejects invalid phone number', () => {
    const result = subscriptionSchema.safeParse({
      name: 'Гулак-Артемовський',
      phone: '0501234567',
      postalCode: '',
      sendTime: '07:30',
      city: 'Odesa',
      id: 123
    })

    expect(result.success).toBe(false)
  })

  it('rejects invalid send time', () => {
    const result = subscriptionSchema.safeParse({
      name: 'Ґалаґан',
      phone: '+380501234567',
      postalCode: '',
      sendTime: '12:00',
      city: 'Odesa',
      id: 123
    })

    expect(result.success).toBe(false)
  })

  it('accepts without postal code', () => {
    const result = subscriptionSchema.safeParse({
      name: 'Nataliia',
      phone: '+380501234567',
      postalCode: '',
      sendTime: '07:00',
      city: 'Odesa',
      id: 123
    })

    expect(result.success).toBe(true)
  })
})
