import { createTheme } from '@mui/material/styles'

const primaryColor = '#9379E0'
const backgroundColor = '#FFFFFF'
const primaryTextColor = '#171717'
const secondaryTextColor = '#666666'

export const CARD_SHADOW = '0 4px 20px rgba(0, 0, 0, 0.1)'

export const theme = createTheme({
  palette: {
    primary: {
      main: primaryColor
    },
    background: {
      default: backgroundColor,
      paper: backgroundColor
    },
    text: {
      primary: primaryTextColor,
      secondary: secondaryTextColor
    }
  },
  typography: {
    fontFamily: 'Arial, Helvetica, sans-serif',
    h1: {
      color: primaryColor,
      fontSize: '24px',
      fontStyle: 'normal',
      fontWeight: 500,
      lineHeight: '32px'
    },
    h2: {
      color: primaryColor,
      fontSize: '18px',
      fontStyle: 'normal',
      fontWeight: 500,
      lineHeight: '28px'
    },
    h3: {
      color: primaryColor,
      fontSize: '16px',
      fontStyle: 'normal',
      fontWeight: 500,
      lineHeight: '24px'
    },
    body1: {
      color: primaryTextColor,
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '24px'
    },
    body2: {
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '20px',
      color: secondaryTextColor
    }
  },
  shape: {
    borderRadius: 12
  },
  components: {
    MuiSelect: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none'
          }
        },
        select: {
          padding: 0
        }
      },
      defaultProps: {
        MenuProps: {
          slotProps: {
            paper: {
              sx: {
                maxHeight: 280,
                '&::-webkit-scrollbar': {
                  width: '6px'
                },
                '&::-webkit-scrollbar-track': {
                  background: 'transparent'
                },
                '&::-webkit-scrollbar-thumb': {
                  background: `${secondaryTextColor}60`,
                  borderRadius: '10px'
                }
              }
            }
          }
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: '100%',
          '@media (min-width: 900px)': {
            width: '350px'
          }
        }
      },
      defaultProps: {
        slotProps: {
          inputLabel: {
            shrink: true
          }
        }
      }
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536
    }
  }
})
