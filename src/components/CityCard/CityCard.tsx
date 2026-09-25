import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { Box, Card, CardContent, Typography } from '@mui/material'
import Link from 'next/link'

import FavoriteButton from '@/components/CityCard/components/FavoriteButton'

type TProps = {
  city: {
    name: string
    timezone: string
  }
  isFavorite: boolean
  onToggle: (city: string, isFavorite: boolean) => void
}

const CityCard = ({ city, isFavorite, onToggle }: TProps) => (
  <Card
    sx={{
      position: 'relative',
      '&:hover': {
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)'
      }
    }}
  >
    <CardContent
      component={Link}
      href={`/weather/${encodeURIComponent(city.name)}/3`}
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
    <Box
      sx={{
        position: 'absolute',
        top: '2.5rem',
        right: '0.5rem'
      }}
    >
      <FavoriteButton
        isFavorite={isFavorite}
        onToggle={onToggle}
        city={city.name}
      />
    </Box>
  </Card>
)

export default CityCard
