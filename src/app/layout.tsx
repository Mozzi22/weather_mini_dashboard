import './globals.css'

import type { Metadata } from 'next'

import ThemeRegistry from '@/theme/ThemeWrapper'

export const metadata: Metadata = {
  title: 'Weather Mini Dashboard',
  description: 'Check the current weather and forecast for your favorite cities'
}

const RootLayout = ({ children }: LayoutProps<'/'>) => (
  <html lang="en">
    <body>
      <ThemeRegistry>
        <main>{children}</main>
      </ThemeRegistry>
    </body>
  </html>
)

export default RootLayout
