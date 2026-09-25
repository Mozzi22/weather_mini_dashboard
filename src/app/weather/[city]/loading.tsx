import { Box, CircularProgress } from '@mui/material'

const Loading = () => (
  <Box
    sx={{
      minHeight: '50vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 2
    }}
  >
    <CircularProgress color="primary" />
  </Box>
)

export default Loading
