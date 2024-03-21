/*
 * @2024 Digital Aid Seattle
 */
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Link from 'next/link'

import { OSEvent } from 'types'

const CardReservation = (props: { event: OSEvent }) => {
  return (
    <Card
      sx={{
        boxShadow:
          '0px 2px 4px 0px rgba(52, 61, 62, 0.04), 0px 4px 8px 2px rgba(52, 61, 62, 0.04)',
      }}
    >
      <CardContent
        sx={{
          padding: { xs: '2rem 1rem', lg: '2rem' },
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        <Stack alignItems="center" gap="1.5rem">
          <Typography variant="titleLarge" textAlign="center">
            Registration required
          </Typography>
          <Typography variant="labelLarge" textAlign="center">
            Free to attend
          </Typography>
          <Link href={props.event.rsvpLink} target="_blank" passHref>
            <Button
              variant="contained"
              sx={{ width: { md: 'max-content' } }}>
              RSVP
            </Button>
          </Link>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default CardReservation
