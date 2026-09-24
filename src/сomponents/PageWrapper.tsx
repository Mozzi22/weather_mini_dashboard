import { Box } from '@mui/material'
import { ReactNode } from 'react'

import { CARD_SHADOW } from '@/theme/theme'

type TProps = { children: ReactNode }

const PageWrapper = ({ children }: TProps) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center'
    }}
  >
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: 'fit-content',
        padding: '2rem',
        marginX: '1rem',
        borderRadius: '1rem',
        boxShadow: { sx: 'none', sm: CARD_SHADOW }
      }}
    >
      {children}
    </Box>
  </Box>
)

export default PageWrapper
