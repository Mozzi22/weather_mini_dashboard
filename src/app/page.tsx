'use client'

import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { Box, Card, CardContent, Typography } from '@mui/material'
import Link from 'next/link'

import PageWrapper from '@/components/PageWrapper'

const CITIES = [
  {
    name: 'Kyiv',
    timezone: 'Europe/Kyiv'
  },
  {
    name: 'Kamyanets-Podilskyi',
    timezone: 'Europe/Kyiv'
  },
  {
    name: 'Toronto',
    timezone: 'America/Toronto'
  }
]

const HomePage = () => {
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
          {CITIES.map((city) => (
            <Card
              key={city.name}
              component={Link}
              href={`/weather/${encodeURIComponent(city.name)}/3`}
              sx={{
                '&:hover': {
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)'
                }
              }}
            >
              <CardContent
                sx={{
                  display: 'flex',
                  gap: '1rem',
                  height: '100%',
                  boxSizing: 'border-box'
                }}
              >
                <Box sx={{ flex: 1, display: 'flex' }}>
                  <LocationOnIcon
                    sx={{
                      marginTop: '0.25rem',
                      color: 'primary.main',
                      fontSize: 20
                    }}
                  />
                  <Box>
                    <Typography variant="h2">{city.name}</Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        mt: 0.5
                      }}
                    >
                      {city.timezone}
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                  }}
                >
                  <ArrowForwardIcon sx={{ color: 'primary.main' }} />
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </PageWrapper>
  )
}

export default HomePage
