'use client'

import { Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

import CityCard from '@/components/CityCard/CityCard'
import PageWrapper from '@/components/PageWrapper'
import { CITIES } from '@/utils/constants/cities'

const FAVORITE_CITY_KEY = 'favorite-city'

const HomePage = () => {
  const [favoriteCity, setFavoriteCity] = useState<string | null>(null)

  useEffect(() => {
    const savedCity = localStorage.getItem(FAVORITE_CITY_KEY)

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFavoriteCity(savedCity)
  }, [])

  const handleToggle = (city: string, isFavorite: boolean) => {
    if (isFavorite) {
      localStorage.removeItem(FAVORITE_CITY_KEY)
      setFavoriteCity(null)

      return
    }

    localStorage.setItem(FAVORITE_CITY_KEY, city)
    setFavoriteCity(city)
  }

  return (
    <PageWrapper>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          width: '100%'
        }}
      >
        <Box>
          <Typography variant="h1">Weather Forecast</Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mt: 1 }}>
            Choose the city to see the current weather and forecast.
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)'
            },
            gap: '1.5rem'
          }}
        >
          {CITIES.map((city) => {
            const isFavorite = favoriteCity === city.name

            return (
              <CityCard
                key={`${city.name}-${isFavorite}`}
                isFavorite={isFavorite}
                city={city}
                onToggle={() => handleToggle(city.name, isFavorite)}
              />
            )
          })}
        </Box>
      </Box>
    </PageWrapper>
  )
}

export default HomePage
