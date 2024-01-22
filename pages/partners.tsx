import {
  AccountBalanceOutlined,
  AdminPanelSettingsOutlined,
  ConstructionOutlined,
  DataObjectOutlined,
  DevicesOutlined,
  HandymanOutlined,
  VolunteerActivismOutlined,
} from '@mui/icons-material'
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import CardGridContainer from 'components/cards/CardGridContainer'
import CardOne, { ICON_STYLE } from 'components/cards/CardOne'
import CardLeft from 'components/cards/CardLeft'
import SectionContainer from 'components/layout/SectionContainer'
import { withBasicLayout } from 'components/layouts'
import { designColor } from 'theme/theme'
import MastheadWithImage from 'components/MastheadWithImage'

const PartnerImage = '/images/partnerWithUs.png'

/* eslint-disable @next/next/no-img-element */

const processContent = [
  'Apply for help using the “Partner with us” button.',
  'You will receive an invitation for an interview within a few days.',
  "By detailing your situation, experiences, and aspirations, help us compose a vision of the solution we'll be creating for you.",
  'Once work has begun, you will get weekly updates on the progress.',
]

const provideContent = [
  {
    title: 'Internal tools',
    description:
      'Every organization needs infrastructure. Support comes in part from good tooling, and we help design and develop effective tools that help teams thrive. As a bonus, we help teams implement good practices and level up on those tools, too.',
    icon: <AdminPanelSettingsOutlined style={ICON_STYLE} />,
  },
  {
    title: 'External tools',
    description:
      'The organizations we support serve individuals in need. Those folks often do not have access to resources and our aim is to streamline and facilitate success, whatever shape that takes.',
    icon: <DevicesOutlined style={ICON_STYLE} />,
  },
  {
    title: 'Technical problems',
    description:
      'No matter the size, any organization in business today is bound to face technical challenges. Digital Aid Seattle partners with non-profits and other organizations to navigate these challenges.',
    icon: <HandymanOutlined style={ICON_STYLE} />,
  },
]

const criteriaContent = [
  {
    title: 'Nonprofits',
    description:
      'We strive to bring enterprise-level operational maturity to nonprofits in need.',
    icon: <VolunteerActivismOutlined style={ICON_STYLE} />,
  },
  {
    title: 'Governments',
    description:
      'Local governmental organizations aimed at building a better community deserve a helping hand.',
    icon: <AccountBalanceOutlined style={ICON_STYLE} />,
  },
  {
    title: 'Open Source',
    description:
      'Whenever possible, we will cooperate using open source assets that can be leveraged by anyone.',
    icon: <DataObjectOutlined style={ICON_STYLE} />,
  },
  {
    title: 'Maintainability',
    description:
      "When we build, we don't just build for today. Our services and tools are designed for long-term usability and scale.",
    icon: <ConstructionOutlined style={ICON_STYLE} />,
  },
]

const PartnersPage = () => {
  const theme = useTheme()
  const palette = theme.palette
  const isSmallScreen = useMediaQuery('(max-width:600px)')

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <MastheadWithImage
        imageSrc={PartnerImage}
        imageText="Partner graphic"
      >
        <>
          <Typography
            variant={isSmallScreen ? 'displayMedium' : 'displayLarge'}
            sx={{ color: theme.palette.primary.contrastText }}
            component="h1"
          >
            Partner with us
          </Typography>
          <Typography
            variant="headlineLarge"
            sx={{
              color: theme.palette.primary.contrastText,
            }}
            component="span"
          >
            Digital Aid Seattle works with Seattle-based nonprofits to create
            customized digital solutions for their needs, for free.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            href={'https://airtable.com/shrVmFy3j3TVWxVBG'}
            target="_blank"
            sx={{
              alignSelf: 'flex-start',
            }}
          >
            Partner with us
          </Button>
        </>
      </MastheadWithImage>
      <SectionContainer backgroundColor={designColor.background}>
        <Stack
          gap={{ xs: '64px', md: '80px' }}
          sx={{
            textAlign: 'center',
          }}
          maxWidth={'880px'}
        >
          <Typography variant="headlineLarge" component="h2">
            Our criteria
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                md: 'repeat(2, minmax(0, 1fr))',
                lg: 'repeat(4, minmax(0, 1fr))',
              },
              gap: '2rem',
            }}
            component="ul"
          >
            {criteriaContent.map((item) => (
              <CardOne
                smallerTitle
                key={item.title}
                title={item.title}
                description={item.description}
                icon={item.icon}
              />
            ))}
          </Box>
          <Typography variant="headlineLarge" component="h2">
            How we can help
          </Typography>
          <CardGridContainer columns={3}>
            {provideContent.map((item) => (
              <CardLeft
                key={item.title}
                title={item.title}
                description={item.description}
                icon={item.icon}
              />
            ))}
          </CardGridContainer>
        </Stack>
      </SectionContainer>
      <SectionContainer backgroundColor={designColor.white}>
        <Stack
          gap={{ xs: '64px', md: '80px' }}
          sx={{
            textAlign: 'left',
          }}
          maxWidth={'880px'}
        >
          <Stack gap={{ xs: 2, md: 4 }}>
            <Typography variant="headlineLarge" component="h2">
              The process
            </Typography>
            <ol>
              {processContent.map((item, index) => (
                <li key={index + 1} style={{ marginBottom: '2rem' }}>
                  <Typography
                    variant="titleLarge"
                    color={palette.primary.main}
                  >{`${index + 1}.`}</Typography>
                  <Typography variant="bodyLarge" mx={2}>
                    {item}
                  </Typography>
                </li>
              ))}
            </ol>
            <div>
              <Button
                variant="contained"
                color="primary"
                href={'https://airtable.com/shrVmFy3j3TVWxVBG'}
                target="_blank"
              >
                Partner with us
              </Button>
            </div>
          </Stack>
          <Stack gap={{ xs: 2, md: 4 }}>
            <Typography variant="headlineLarge" component="h2">
              Partner expectations
            </Typography>
            <Typography variant="bodyLarge">
              Partners should plan to maintain projects after handoff, and to
              provide Digital Aid Seattle volunteers with the necessary
              documentation for timely project completion. All Digital Aid
              Seattle projects are open and accessible by default.
            </Typography>
          </Stack>
          <Stack gap={{ xs: 2, md: 4 }}>
            <Typography variant="headlineLarge" component="h2">
              Volunteer expectations
            </Typography>
            <Typography variant="bodyLarge">
              All of our volunteers are vetted for experience, and sign a
              volunteer agreement before commencing work with Digital Aid
              Seattle.
            </Typography>
          </Stack>
        </Stack>
      </SectionContainer>
      <SectionContainer backgroundColor={theme.palette.background.default}>
        <Stack
          gap={{ xs: '2rem', md: '2.5rem' }}
          sx={{
            textAlign: 'center',
          }}
          maxWidth={'880px'}
        >
          <Typography variant="headlineLarge" component="h2">
            Interested in partnering with Digital Aid Seattle?
          </Typography>

          <Button
            variant="contained"
            color="secondary"
            href={'https://airtable.com/shrVmFy3j3TVWxVBG'}
            target="_blank"
            sx={{
              alignSelf: 'center',
            }}
          >
            Partner with us
          </Button>
        </Stack>
      </SectionContainer>
    </Container>
  )
}

export default withBasicLayout(PartnersPage)
