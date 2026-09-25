'use client'

import ErrorIcon from '@mui/icons-material/Error'
import RefreshIcon from '@mui/icons-material/Refresh'
import { Box, Button, Typography } from '@mui/material'

import PageWrapper from '@/components/PageWrapper'

type TErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

const ErrorPage = ({ error, reset }: TErrorProps) => (
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
      <ErrorIcon
        sx={{
          fontSize: 56,
          color: 'text.secondary'
        }}
      />

      <Typography variant="h1">Unable to load the weather</Typography>

      <Typography
        variant="body2"
        sx={{
          color: 'text.secondary',
          maxWidth: 500
        }}
      >
        {error.message}
      </Typography>

      <Button variant="contained" startIcon={<RefreshIcon />} onClick={reset}>
        Try again
      </Button>
    </Box>
  </PageWrapper>
)

export default ErrorPage
