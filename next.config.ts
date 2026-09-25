import type { NextConfig } from 'next'

import { envSchema } from '@/schemas/env'

const result = envSchema.safeParse({
  OPEN_METEO_API_URL: process.env.OPEN_METEO_API_URL,
  OPEN_METEO_GEOCODING_URL: process.env.OPEN_METEO_GEOCODING_URL,
  OPEN_METEO_TIMEOUT: process.env.OPEN_METEO_TIMEOUT
})

if (!result.success) {
  console.error('Invalid environment variables:')

  result.error.issues.forEach((issue) => {
    console.error(`- ${issue.path.join('.')}: ${issue.message}`)
  })

  throw new Error('Invalid environment variables')
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'openweathermap.org',
        pathname: '/img/wn/**'
      }
    ]
  }
}

export default nextConfig
