/*
 * @2024 Digital Aid Seattle
 */
import { ReactNode, useContext, useEffect, useState } from 'react';

import { urlForImage } from '../sanity/lib/image';

import {
  Box,
  Breadcrumbs,
  Button,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import SectionContainer from 'components/layout/SectionContainer';

import { BlockComponent, LoadingContext, withBasicLayout } from 'components/layouts';
// icons for role cards
import { NavigateNextSharp } from '@mui/icons-material';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CardReservation from 'components/cards/CardReservation';
import { Section, Subheader } from 'components/style-utils';
import Link from 'next/link';
import Markdown from 'react-markdown';
import { OSEvent } from 'types';
import { eventsService } from './api/EventsService';
/*********/

const Labels = {
  contact: 'Interested in this event?',
  rsvp: 'RSVP',
  about: 'About this event',
  dateAndTime: 'Date and time',
  location: 'Location',
  homeCrumb: 'Home',
  eventsCrumb: 'Events'
}

const HeaderSection = (props: { event: OSEvent }) => {
  const theme = useTheme()
  const largeScreen = useMediaQuery(theme.breakpoints.up('lg'))
  const extraSmallScreen = useMediaQuery(theme.breakpoints.down('md'))

  const BreadCrumbSection = (props: { event: OSEvent }) => {
    return (
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<NavigateNextSharp fontSize="small" color={'primary'} />}
      >
        <Link href={'./'} >
          <Typography color="textPrimary">{Labels.homeCrumb}</Typography>
        </Link>
        <Link href={'./events'}>
          <Typography color="textPrimary">{Labels.eventsCrumb}</Typography>
        </Link>
        <Typography color="textPrimary">{props.event.title}</Typography>
      </Breadcrumbs>
    )
  }

  function MobileSection() {
    return (
      <Box sx={{
        backgroundColor: theme.palette.background.default
      }}>
        <Box
          sx={{
            backgroundColor: theme.palette.primary.main,
            width: '100%',
            height: '28.75rem',
            position: 'absolute',
            zIndex: '0',
          }}
        ></Box>
        <Stack
          spacing="2rem"
          sx={{
            position: 'relative',
            padding: '4rem 1rem 0rem 1rem',
            color: theme.palette.primary.contrastText,
          }}
        >
          <Stack>
            <Typography variant="headlineMedium" component="h2">
              Event
            </Typography>
            <Typography variant="displayMedium" component="h1">
              {props.event.title}
            </Typography>
            <Typography variant="headlineMedium" component="h2">
              {props.event.date}
            </Typography>
          </Stack>

          {props.event.image && props.event.image.asset && <img
            src={urlForImage(props.event.image).url()}
            style={{
              width: '100%',
              aspectRatio: '1 / 1',
              display: 'block'
            }}
          />
          }
          <Stack spacing="1rem">
            <BreadCrumbSection event={props.event} />
          </Stack>
        </Stack>
      </Box>
    )
  }

  function DesktopSection() {
    return (
      <>
        <Box
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            paddingTop: { md: '5.5rem', lg: '14.5rem' },
            paddingBottom: '1rem',
            width: '100%',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              margin: '0 auto',
              maxWidth: '880px',
              paddingX: { xs: '1rem', md: '2rem', lg: '0' },
            }}>
            <Stack>
              <Typography
                variant={largeScreen ? 'headlineLarge' : 'headlineMedium'}
                component="h2" >
                Event
              </Typography>
              <Typography
                variant={largeScreen ? 'displayLarge' : 'displayMedium'}
                sx={{
                  width: { md: '40vw', lg: '25rem' },
                }}
                component="h1" >
                {props.event.title}
              </Typography>
              <Typography
                variant={largeScreen ? 'headlineLarge' : 'headlineMedium'}
                component="h2" >
                {props.event.date}
              </Typography>
            </Stack>

            {props.event.image && props.event.image.asset &&
              <Box
                sx={{
                  width: { md: 'min(40vw, 18rem)', lg: '25rem' },
                  position: 'absolute',
                  right: { xs: '1rem', md: '2rem', lg: '0' },
                  bottom: '-6rem',
                  zIndex: '2',
                }}
              >
                <img
                  src={urlForImage(props.event.image).url()}
                  style={{
                    width: '100%',
                    display: 'block'
                  }} />
              </Box>
            }
          </Box>
        </Box>

        <Box
          sx={{
            backgroundColor: theme.palette.background.default,
            width: '100%',
            paddingY: '1rem',
          }}
        >
          <Stack
            spacing="1rem"
            width={{ md: 'auto', lg: '880px' }}
            sx={{
              color: theme.palette.primary.main,
              margin: '0 auto',
              paddingLeft: { md: '2rem', lg: '0' },
            }}
          >
            <BreadCrumbSection event={props.event} />
          </Stack>
        </Box>
      </>
    )
  }

  return event ? (extraSmallScreen ? <MobileSection /> : <DesktopSection />) : <></>
}

const InfoSection = (props: { event: OSEvent }) => {
  const theme = useTheme()

  const extraSmallScreen = useMediaQuery(theme.breakpoints.down('md'))

  const renderItem = (title: string,
    icon: ReactNode,
    description: string[]) => {
    return <>
      <Typography variant="headlineMedium">
        {title}
      </Typography>
      <Box mt="1rem">
        <ListItem
          sx={{
            borderColor: theme.palette.background.default,
            backgroundColor: theme.palette.background.default
          }}>
          <ListItemIcon >
            {icon}
          </ListItemIcon>
          <ListItemText>
            <Stack>
              {description.map((d, idx) =>
                <Box key={idx}>{d}</Box>
              )}
            </Stack>
          </ListItemText>
        </ListItem>
      </Box>
    </>
  }

  function MobileSection() {
    return (<Stack>
      {props.event.rsvpLink &&
        <CardReservation event={props.event} />
      }
      <Box marginTop={"1rem"}>
        {renderItem(
          Labels.dateAndTime,
          <EventAvailableOutlinedIcon />,
          [props.event.date, eventsService.getTimeString(props.event)]
        )}
      </Box>
      <Box>
        {renderItem(
          Labels.location,
          <LocationOnIcon />,
          [props.event.location]
        )}
      </Box>
    </Stack>)
  }

  function DesktopSection() {

    return (
      <Box
        sx={{
          display: 'grid',
          gridAutoFlow: 'columns',
          gridTemplateColumns: { xs: 'repeat(1), minmax(15rem, 1fr)', md: `repeat(2, minmax(15rem, 1fr))`, lg: 'repeat(2, minmax(15rem, 1fr))' },
          justifyContent: 'center',
          gap: { xs: '1rem', md: '2rem' },
          width: '100%',
        }}
      >
        <Stack>
          <Box>
            {renderItem(
              Labels.dateAndTime,
              <EventAvailableOutlinedIcon />,
              [props.event.date, eventsService.getTimeString(props.event)]
            )}
          </Box>
          <Box >
            {renderItem(
              Labels.location,
              <LocationOnIcon />,
              [props.event.location]
            )}
          </Box>
        </Stack>
        {props.event.rsvpLink &&
          <Stack sx={{ alignItems: "flex-end" }}>
            <Box sx={{ width: { md: '40vw', lg: '25rem' } }}>
              <CardReservation event={props.event} />
            </Box>
          </Stack>
        }
      </Box>
    )
  }

  return extraSmallScreen ? <MobileSection /> : <DesktopSection />
}

const AboutSection = (props: { event: OSEvent }) => {

  return (props.event && props.event.about &&
    <Stack>
      <Typography variant="headlineLarge" component="h1">
        {Labels.about}
      </Typography>
      <Markdown className='markdown'>{props.event.about}</Markdown>
    </Stack>
  )
}

const ContactUsSection = (props: { event: OSEvent }) => {
  const theme = useTheme()

  return (props.event.rsvpLink &&
    <SectionContainer backgroundColor={theme.palette.background.paper}>
      <Section>
        <Subheader variant="headlineMedium">
          {Labels.contact}
        </Subheader>
        <Link href={props.event.rsvpLink} target="_blank"
          passHref>
          <Button variant="contained">{Labels.rsvp}</Button>
        </Link>
      </Section>
    </SectionContainer>)
}

const ActivitySection = (props: { event: OSEvent }) => {
  const theme = useTheme()
  const extraSmallScreen = useMediaQuery(theme.breakpoints.down('md'))
  const width = extraSmallScreen ? "100%" : "50%"

  return (props.event.activity && props.event.activity.asset &&
    <Section  >
      <img
        src={urlForImage(props.event.activity).url()}
        style={{
          width: width,
          // TODO A drop shadow would be nice, but centering needs work
          // borderRadius: '20px',
          // boxShadow:
          //   '0px 0px 0px 0px rgba(52, 61, 62, 0.08), 1px 1px 1px 1px rgba(52, 61, 62, 0.08)',
        }}
      />
    </Section>)
}

const EventPage = () => {
  const theme = useTheme()

  const [event, setEvent] = useState<OSEvent>()
  const { setLoading } = useContext(LoadingContext)

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams(window.location.search)
    eventsService
      .getOne(params.get('name'))
      .then((data) => {
        // should reroute if no data
        setEvent(data)
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  }, [setLoading])

  return (
    <>
      <BlockComponent block={!event}>
        {event &&
          <>
            <HeaderSection event={event} />
            <SectionContainer backgroundColor={theme.palette.background.default}>
              <Stack
                gap={{ xs: '1rem', lg: '2rem' }}
                maxWidth="880px"
                margin="0 auto" >
                <InfoSection event={event} />
                <AboutSection event={event} />
                <ActivitySection event={event} />
              </Stack>
            </SectionContainer>
            {event.rsvpLink && <ContactUsSection event={event} />}
          </>
        }
      </BlockComponent>
    </>
  )
}

export default withBasicLayout(EventPage)
