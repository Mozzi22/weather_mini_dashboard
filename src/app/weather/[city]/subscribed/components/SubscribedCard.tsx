'use client'

import AccessTimeIcon from '@mui/icons-material/AccessTime'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import MarkunreadMailboxIcon from '@mui/icons-material/MarkunreadMailbox'
import PersonIcon from '@mui/icons-material/Person'
import PhoneIcon from '@mui/icons-material/Phone'
import { Box, Button, Divider, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import Link from 'next/link'

import { TSubscriptionFormData } from '@/schemas/subscription'
import PageWrapper from '@/сomponents/PageWrapper'

type TSubscribedCardProps = {
  city: string
  displayCity: string
  subscription: TSubscriptionFormData
  nextForecastText: string
}

export const SubscribedCard = ({
  city,
  displayCity,
  subscription,
  nextForecastText
}: TSubscribedCardProps) => (
  <PageWrapper>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '2rem',
        gap: '0.75rem'
      }}
    >
      <CheckCircleOutlinedIcon sx={{ fontSize: 56, color: 'primary.main' }} />
      <Typography variant="h1">Subscription Successful!</Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        You are now subscribed to daily weather forecasts for&nbsp;
        <strong>{displayCity}</strong>.
      </Typography>
    </Box>

    <Typography variant="h2" sx={{ marginBottom: '1rem' }}>
      Subscriber Details
    </Typography>

    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        paddingY: '1rem',
        marginBottom: '1rem'
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '24px minmax(0, 1fr)',
          alignItems: 'center',
          columnGap: '0.75rem',
          width: {
            xs: 'calc(100vw - 4rem)',
            sm: '500px',
            md: '700px'
          }
        }}
      >
        <PersonIcon sx={{ color: 'primary.main' }} />
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="body2">Name</Typography>
          <Typography
            variant="body1"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {subscription.name}
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <LocationOnIcon sx={{ color: 'primary.main' }} aria-hidden />
        <Box>
          <Typography variant="body2">City</Typography>
          <Typography variant="body1">{displayCity}</Typography>
        </Box>
      </Box>
      <Divider />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <PhoneIcon sx={{ color: 'primary.main' }} aria-hidden />
        <Box>
          <Typography variant="body2">Phone</Typography>
          <Typography variant="body1">{subscription.phone}</Typography>
        </Box>
      </Box>
      {subscription.postalCode && (
        <>
          <Divider />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <MarkunreadMailboxIcon sx={{ color: 'primary.main' }} aria-hidden />
            <Box>
              <Typography variant="body2">Postal Code</Typography>
              <Typography variant="body1">{subscription.postalCode}</Typography>
            </Box>
          </Box>
        </>
      )}
    </Box>

    <Box
      sx={(theme) => ({
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: alpha(theme.palette.primary.main, 0.8),
        padding: '1rem',
        borderRadius: '0.5rem',
        marginBottom: '2rem'
      })}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <AccessTimeIcon sx={{ color: 'background.default' }} />
        <Typography variant="body1" sx={{ color: 'background.default' }}>
          {nextForecastText}
        </Typography>
      </Box>
    </Box>

    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Button
        component={Link}
        href={`/weather/${encodeURIComponent(city)}/3`}
        variant="contained"
        startIcon={<ArrowBackIcon />}
      >
        Back to weather forecast
      </Button>
    </Box>
  </PageWrapper>
)

export default SubscribedCard
