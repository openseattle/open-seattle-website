import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { ReactNode } from 'react'

import IconContainer from './IconContainer'

type CardLeftProps = {
  title: string
  description: string
  icon: ReactNode
}

const CardLeft = ({ title, description, icon }: CardLeftProps) => {
  return (
    <Card
      sx={{
        flex: '1',
        minWidth: { xs: '100%', sm: 'auto' },
        boxShadow:
          '0px 4px 8px 0px rgba(52, 61, 62, 0.08), 0px 8px 16px 0px rgba(52, 61, 62, 0.08)',
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          alignItems: 'center',
          textAlign: 'left',
          padding: '2rem',
        }}
      >
        <IconContainer>{icon}</IconContainer>
        <Typography variant="titleMedium">{title}</Typography>
        <Typography variant="bodyMedium">{description}</Typography>
      </CardContent>
    </Card>
  )
}

export default CardLeft
