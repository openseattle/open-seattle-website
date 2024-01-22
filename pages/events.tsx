/*
 * @2023 Digital Aid Seattle
 */

import {
  Box,
  CircularProgress,
  Container,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import CardEvent from 'components/cards/CardEvent'
import { withBasicLayout } from 'components/layouts'
import { useEffect, useState } from 'react'

import SectionContainer from 'components/layout/SectionContainer'
import { eventsService } from '../src/EventsService'

type MastheadProps = {
  title: string
}

const Masthead = ({ title }: MastheadProps) => {
  const theme = useTheme()

  return (
    <Container
      sx={{
        backgroundColor: theme.palette.primary.main,
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        paddingY: '5rem',
      }}
      maxWidth={false}
    >
      <Typography
        variant="displayMedium"
        sx={{
          color: theme.palette.primary.contrastText,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {title}
      </Typography>
    </Container>
  )
}

const EventsPage = () => {
  const theme = useTheme()

  const title = 'Events'
  const [loading, setLoading] = useState(true)
  const [events, setEvents] = useState([])

  useEffect(() => {
    eventsService
      .getActiveEvents()
      .then((evs) => setEvents(evs))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <Masthead title={title} />
      <SectionContainer backgroundColor={theme.palette.background.default}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          maxWidth={'880px'}
        >
          <Stack gap={{ xs: '2.5rem', md: '2rem' }} maxWidth={'880px'}>
            {loading && <CircularProgress />}

            {!loading &&
              events.map((event) => (
                <CardEvent key={event.title} event={event} />
              ))}

            {!loading && events.length === 0 && (
              <Typography sx={{ textAlign: 'center' }}>
                All upcoming events are invite-only. Please check back in the
                future for public events.
              </Typography>
            )}
          </Stack>
        </Box>
      </SectionContainer>
    </div>
  )
}

export default withBasicLayout(EventsPage)
