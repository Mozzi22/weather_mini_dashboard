'use client'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Box, Button, Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Fragment } from 'react'

import DaysSelect from '@/app/weather/[city]/[days]/components/DaysSelect'
import SubscriptionForm from '@/app/weather/[city]/[days]/components/SubscriptionForm'
import PageWrapper from '@/components/PageWrapper'
import { formatCurrentTime } from '@/helpers/formatCurrentTime'
import { formatForecastDate } from '@/helpers/formatForecastDate'
import { getWeatherDescription } from '@/server/weather/helpers/getWeatherDescription'
import { TWeatherData } from '@/server/weather/types'

type TProps = {
  weather: TWeatherData
}

const WeatherDetails = ({ weather }: TProps) => {
  const router = useRouter()

  const { city, latitude, longitude } = weather
  const weatherInfo = getWeatherDescription(
    weather.current.weatherCode,
    weather.current.isDay
  )

  const daysCount = weather.forecast.length

  return (
    <PageWrapper>
      <Box>
        <Button startIcon={<ArrowBackIcon />} onClick={() => router.push('/')}>
          Back
        </Button>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          gap: '2rem',
          marginBottom: '2rem'
        }}
      >
        <Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'end',
              gap: '1rem',
              marginBottom: '1rem'
            }}
          >
            <Typography variant="h1">{weather.city}, </Typography>
            <Typography variant="h2">{weather.current.temperature}°</Typography>
          </Box>
          <Typography variant="body2">
            Feels like {weather.current.apparentTemperature}°
          </Typography>
          <Typography variant="body1">
            Wind {weather.current.windSpeed.toFixed(1)} m/s
          </Typography>

          <Typography variant="body1">{weatherInfo.description}</Typography>
          <Typography variant="body2">
            Updated at {formatCurrentTime(weather.current.time)}
          </Typography>
        </Box>

        <Image
          src={weatherInfo.icon}
          alt={weatherInfo.description}
          width={128}
          height={128}
          loading="eager"
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: { sm: '2rem', md: '4rem' },
          rowGap: '2rem',
          flexDirection: {
            xs: 'column',
            md: 'row'
          }
        }}
      >
        <Box sx={{ maxWidth: '400px', width: '100%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography
              variant="h2"
              sx={{ marginRight: { xs: 0, sm: '1rem' } }}
            >
              {daysCount}-Day Weather Forecast
            </Typography>
            <DaysSelect days={daysCount} city={city} />
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 80px 40px',
              alignItems: 'center'
            }}
          >
            {weather.forecast.map((day, index) => (
              <Fragment key={day.date}>
                <Typography variant="body1">
                  {formatForecastDate(day.date, index)}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ display: 'flex', justifyContent: 'center' }}
                >
                  {day.minTemperature}° / {day.maxTemperature}°
                </Typography>

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                >
                  <Image
                    src={day.weatherCode}
                    alt=""
                    width={48}
                    height={48}
                    loading="eager"
                  />
                </Box>

                <Typography variant="body2">
                  {day.precipitationProbability}%
                </Typography>
              </Fragment>
            ))}
          </Box>
        </Box>
        <SubscriptionForm
          city={city}
          latitude={latitude}
          longitude={longitude}
        />
      </Box>
    </PageWrapper>
  )
}

export default WeatherDetails
