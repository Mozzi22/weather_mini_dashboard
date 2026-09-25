'use client'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import LocationOffIcon from '@mui/icons-material/LocationOff'
import { Box, Button, Typography } from '@mui/material'
import Link from 'next/link'

import PageWrapper from '@/components/PageWrapper'

const NotFound = () => (
  <PageWrapper>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        gap: '1rem'
      }}
    >
      <LocationOffIcon
        sx={{
          fontSize: 56,
          color: 'text.secondary'
        }}
      />

      <Typography variant="h1">City not found</Typography>

      <Typography
        variant="body2"
        sx={{
          color: 'text.secondary',
          maxWidth: 500
        }}
      >
        We couldn&apos;t find weather data for this city. Please check the city
        name and try again.
      </Typography>

      <Button
        component={Link}
        href="/"
        variant="contained"
        startIcon={<ArrowBackIcon />}
      >
        Back to cities
      </Button>
    </Box>
  </PageWrapper>
)

export default NotFound
