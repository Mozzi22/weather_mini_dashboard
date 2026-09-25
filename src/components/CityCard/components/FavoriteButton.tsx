'use client'

import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { IconButton } from '@mui/material'

type Props = {
  city: string
  isFavorite: boolean
  onToggle: (city: string, isFavorite: boolean) => void
}

const FavoriteButton = ({ isFavorite, onToggle, city }: Props) => (
  <IconButton
    onClick={() => onToggle(city, isFavorite)}
    aria-label={
      isFavorite ? `Remove ${city} from favorites` : `Add ${city} to favorites`
    }
    sx={{
      '&:hover': {
        backgroundColor: 'transparent'
      },
      '&:active': {
        backgroundColor: 'transparent'
      },
      '&:focus': {
        backgroundColor: 'transparent'
      },
      '&:focus-visible': {
        backgroundColor: 'transparent'
      }
    }}
  >
    {isFavorite ? (
      <FavoriteIcon sx={{ color: 'primary.main' }} />
    ) : (
      <FavoriteBorderIcon sx={{ color: 'text.secondary' }} />
    )}
  </IconButton>
)

export default FavoriteButton
