import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import IconContainer from './IconContainer'
import { ReactNode } from 'react'
import Button from '@mui/material/Button'
import { designColor } from 'theme/theme'

export const ICON_STYLE = {
  color: designColor.white,
  height: '100%',
  width: '100%',
}

type CardOneProps = {
  title?: string
  description: string
  icon: ReactNode
  buttonText?: string
  buttonLink?: string
}

const CardOne = ({
  title,
  description,
  icon,
  buttonText,
  buttonLink,
}: CardOneProps) => {
  return (
    <Card
      sx={{
        flex: '1',
        marginTop: 5,
        minWidth: { xs: '100%', sm: 'min-content' },
        boxShadow:
          '0px 12px 24px rgba(86, 96, 97, 0.12), 0px 6px 12px rgba(86, 96, 97, 0.12)',
        height: '100%',
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          alignItems: 'center',
          textAlign: 'center',
          padding: { xs: '2rem', sm: '1rem' },
          justifyContent: 'space-between',
          // marginBottom: '3rem',
        }}
      >
        <IconContainer>{icon}</IconContainer>
        {title && <Typography variant="titleLarge">{title}</Typography>}
        <Typography variant="bodyLarge">{description}</Typography>
        {buttonText && (
          <Button variant="contained" color="secondary" href={buttonLink}>
            {buttonText}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

export default CardOne
