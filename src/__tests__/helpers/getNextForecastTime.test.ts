import { getNextForecastTime } from '@/helpers/getNextForecastTime'

describe('getNextForecastTime', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('returns today if send time has not passed', () => {
    jest.setSystemTime(new Date('2026-09-25T06:30:00+03:00'))
    const result = getNextForecastTime('07:30', 'Europe/Kyiv')

    expect(result.date).toBe('Friday, 25 September 2026')
    expect(result.time).toBe('07:30')
    expect(result.hoursLeft).toBe(1)
    expect(result.minutesLeft).toBe(0)
  })

  it('returns tomorrow if today time has passed', () => {
    jest.setSystemTime(new Date('2026-09-25T08:00:00+03:00'))
    const result = getNextForecastTime('07:15', 'Europe/Kyiv')

    expect(result.date).toBe('Saturday, 26 September 2026')
    expect(result.time).toBe('07:15')
    expect(result.hoursLeft).toBe(23)
    expect(result.minutesLeft).toBe(15)
  })
})
