'use client'

import { CssBaseline, ThemeProvider } from '@mui/material'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter'
import { ReactNode } from 'react'

import { theme } from './theme'

type TProps = { children: ReactNode }

const ThemeRegistry = ({ children }: TProps) => (
  <AppRouterCacheProvider>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  </AppRouterCacheProvider>
)

export default ThemeRegistry
