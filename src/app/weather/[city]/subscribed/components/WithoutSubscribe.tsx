'use client'

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { Box, Button, Typography } from '@mui/material'
import Link from 'next/link'

import PageWrapper from '@/сomponents/PageWrapper'

type TProps = {
  city: string
}

const WithoutSubscribe = ({ city }: TProps) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%'
    }}
  >
    <Box
      sx={{
        maxWidth: '550px'
      }}
    >
      <PageWrapper>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem'
          }}
        >
          <InfoOutlinedIcon sx={{ fontSize: 56, color: 'primary.main' }} />

          <Typography variant="h1">No Active Subscription</Typography>

          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            You don&apos;t have an active weather subscription for{' '}
            <strong>{city}</strong>. Fill out the subscription form to receive
            daily weather forecasts.
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              component={Link}
              href={`/weather/${encodeURIComponent(city)}/3`}
              variant="contained"
            >
              Subscribe to {city} Weather
            </Button>
          </Box>
        </Box>
      </PageWrapper>
    </Box>
  </Box>
)

export default WithoutSubscribe
