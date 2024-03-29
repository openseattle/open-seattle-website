/*
 * @2023 Digital Aid Seattle
 */

import {
  Box,
  Container,
  Stack,
  Typography,
  useTheme
} from '@mui/material'
import CardEvent from 'components/cards/CardEvent'
import { BlockComponent, LoadingContext, withBasicLayout } from 'components/layouts'
import { useContext, useEffect, useState } from 'react'

import SectionContainer from 'components/layout/SectionContainer'
import { OSEvent } from 'types'
import { eventsService } from './api/EventsService'

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
  const { setLoading } = useContext(LoadingContext);
  const [events, setEvents] = useState<OSEvent[] | null>([])
  const [init, setInit] = useState(false)

  useEffect(() => {
    setLoading(true);
    eventsService
      .getActiveEvents()
      .then((evs) => setEvents(evs))
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false)
        setInit(true)
      })
  }, [setLoading])

  return (
    <>
      <Masthead title={title} />
      <BlockComponent block={!init}>
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

              {events.map((event) => (
                <CardEvent key={event.title} event={event} />
              ))}

              {events.length === 0 && (
                <Typography sx={{ textAlign: 'center' }}>
                  All upcoming events are invite-only. Please check back in the
                  future for public events.
                </Typography>
              )}
            </Stack>
          </Box>
        </SectionContainer>
      </BlockComponent>
    </>
  )
}

export default withBasicLayout(EventsPage)
