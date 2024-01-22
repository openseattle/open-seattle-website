/* eslint-disable @next/next/no-img-element */
import {
  AccessAlarmOutlined,
  Apartment,
  AutoGraphOutlined,
  Code,
  DataObjectOutlined,
  Diversity1Outlined,
  Diversity3,
  DrawOutlined,
  EmojiObjectsOutlined,
  Gavel,
  LibraryMusicOutlined,
  ManageAccountsOutlined,
  MenuBook,
  MilitaryTechOutlined,
  ScreenSearchDesktopOutlined,
  Storefront,
  SupervisorAccountOutlined,
  TerminalOutlined,
  VolunteerActivismOutlined,
} from '@mui/icons-material'
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import CardOne from 'components/cards/CardOne'
import CardRowContainer from 'components/cards/CardRowContainer'
import SectionContainer from 'components/layout/SectionContainer'
import { withBasicLayout } from 'components/layouts'
import ListItemWithIcon from 'components/list/ListItemWithIcon'
import { designColor } from 'theme/theme'

import MastheadWithImage from 'components/MastheadWithImage'

const AboutUsImage = '/images/aboutUs.png'
const AppleLogo = '/images/aboutUsIcons/apple.svg'
const GeneticsIcon = '/images/aboutUsIcons/genetics.svg'
const GoogleLogo = '/images/aboutUsIcons/google.svg'
const HCIIcon = '/images/aboutUsIcons/hci.svg'
const MicrosoftLogo = '/images/aboutUsIcons/microsoft.svg'
const NOAALogo = '/images/aboutUsIcons/noaa.svg'
const NonProfitManagementIcon = '/images/aboutUsIcons/non_profit_management.svg'
const PhysicsIcon = '/images/aboutUsIcons/physics.svg'
const StarbucksLogo = '/images/aboutUsIcons/starbucks.svg'
const VerizonLogo = '/images/aboutUsIcons/verizon.svg'

const AboutPage = () => {
  const theme = useTheme()

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <AboutUsHeroSection />
      <WhatWeDoSection theme={theme} />
      <OurValueSection theme={theme} />
      <OurVisionSection theme={theme} />
      <OurTeamSection />
    </Container>
  )
}

export default withBasicLayout(AboutPage)

const AboutUsSection = ({ backgroundColor, children }) => (
  <SectionContainer backgroundColor={backgroundColor}>
    <Stack
      gap={{ xs: '64px', md: '80px' }}
      sx={{
        textAlign: 'center',
      }}
      maxWidth={'880px'}
    >
      {children}
    </Stack>
  </SectionContainer>
)

const AboutUsHeroSection = () => {
  const theme = useTheme()
  const extraSmallScreen = useMediaQuery(theme.breakpoints.only('xs'))
  return (
    <MastheadWithImage
      imageSrc={AboutUsImage}
      imageText="About Us page graphic"
    >
      <>
        <Typography
          variant={extraSmallScreen ? 'displayMedium' : 'displayLarge'}
          sx={{ color: theme.palette.primary.contrastText }}
          component="h1"
        >
          About us
        </Typography>
        <Typography
          variant="bodyLarge"
          sx={{
            color: theme.palette.primary.contrastText,
          }}
        >
          Digital Aid Seattle comprises a group of seasoned professionals with
          experience in web development, software engineering, digital strategy,
          visual and content design, and more. We leverage this vast experience
          to transform the nonprofit sector—to make it more efficient,
          effective, and accessible to all.
        </Typography>
      </>
    </MastheadWithImage>
  )
}

const WhatWeDoSection = ({ theme }) => (
  <AboutUsSection backgroundColor={designColor.white}>
    <Typography variant="headlineMedium" component="h2">
      What we do
    </Typography>
    <Typography variant="bodyLarge">
      Digital Aid Seattle partners with other nonprofits to amplify their impact
      and to uplift communities through the power of technology.
    </Typography>
    <Box textAlign="center">
      <Button
        variant="contained"
        href={'/cadre'}
        sx={{ width: 'fit-content' }}
      >
        View our leadership team
      </Button>
    </Box>
  </AboutUsSection>
)

const OurValueSection = ({ theme }) => (
  <AboutUsSection backgroundColor={theme.palette.background.default}>
    <Typography variant="headlineMedium" component="h2">
      Our values
    </Typography>
    <CardRowContainer>
      <CardOne
        title="Excellence"
        description="Striving for professional excellence means taking an uncompromising approach to the service we endeavor to provide. We ensure the utmost quality in what we deliver."
        icon={
          <MilitaryTechOutlined
            style={{ color: designColor.white, fontSize: '40px' }}
          />
        }
      />
      <CardOne
        title="Efficacy"
        description="What we do will have impact. We will apply the pareto principle (and other frameworks) to ensure that we are optimizing our efforts at every step in our process from engagement to delivery."
        icon={
          <AutoGraphOutlined
            style={{ color: designColor.white, fontSize: '40px' }}
          />
        }
      />
      <CardOne
        title="Efficiency"
        description="We work with a steady and speedy cadence whenever possible. We maintain a MLP (minimum loveable product) mindset without sacrificing the quality of our work."
        icon={
          <AccessAlarmOutlined
            style={{ color: designColor.white, fontSize: '40px' }}
          />
        }
      />
    </CardRowContainer>
  </AboutUsSection>
)

const OurVisionSection = ({ theme }) => (
  <AboutUsSection backgroundColor={designColor.white}>
    <Typography variant="headlineMedium" component="h2">
      Our vision
    </Typography>
    <Typography variant="bodyLarge" align="center" display="block">
      We envision a network of highly functional non-profits in the Puget Sound
      area, working in tandem with one another and with the municipal government
      in order to enable the highest echelon of public service.
    </Typography>
  </AboutUsSection>
)

const OurTeamSection = () => {
  const theme = useTheme()
  const extraSmallScreen = useMediaQuery(theme.breakpoints.only('xs'))
  const isMediumOrSmallerScreen = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <AboutUsSection backgroundColor={theme.palette.background.default}>
      <Typography variant="headlineMedium" component="h2">
        Our team
      </Typography>
      <Typography variant="bodyLarge" align="center" display="block">
        The Digital Aid Seattle cadre is made up of highly skilled and committed
        volunteers, dedicated to serving the greater Seattle area.
      </Typography>
      <Typography
        variant="titleMedium"
        align="center"
        display="block"
        component="h3"
      >
        We’ve worked in tech and management for companies like:
      </Typography>
      <Grid container spacing={2} component="ul">
        {companiesList.map((item) => (
          <Grid item xs={6} md={4} key={item.label}>
            <ListItemWithIcon
              listIcon={item.icon}
              listText={!isMediumOrSmallerScreen && item.label}
            />
          </Grid>
        ))}
      </Grid>
      <Typography
        variant="titleMedium"
        align="center"
        display="block"
        component="h3"
      >
        We collectively hold experience in:
      </Typography>
      <Grid container spacing={2} component="ul">
        {experienceContent.map((item) => (
          <Grid item xs={12} sm={6} lg={4} key={item.label}>
            <ListItemWithIcon
              sxProps={!isMediumOrSmallerScreen && { height: '56px' }}
              listIcon={!isMediumOrSmallerScreen && item.icon}
              listText={item.label}
            />
          </Grid>
        ))}
      </Grid>
      <Typography
        variant="titleMedium"
        align="center"
        display="block"
        component="h3"
      >
        We have graduate and post-graduate degrees in:
      </Typography>
      <Grid container spacing={2} component="ul">
        {degreeContent.map((item) => (
          <Grid item xs={12} sm={6} lg={4} key={item.label}>
            <ListItemWithIcon
              sxProps={!isMediumOrSmallerScreen && { height: '56px' }}
              listIcon={!isMediumOrSmallerScreen && item.icon}
              listText={item.label}
            />
          </Grid>
        ))}
      </Grid>
    </AboutUsSection>
  )
}

const companiesList = [
  {
    label: 'Apple',
    icon: <img src={AppleLogo} alt="Apple logo" width="40px" />,
  },
  {
    label: 'Google',
    icon: <img src={GoogleLogo} alt="Google logo" width="40px" />,
  },
  {
    label: 'Verizon',
    icon: <img src={VerizonLogo} alt="Verizon logo" width="40px" />,
  },
  {
    label: 'Microsoft',
    icon: <img src={MicrosoftLogo} alt="Microsoft logo" width="40px" />,
  },
  {
    label: 'Starbucks',
    icon: <img src={StarbucksLogo} alt="Starbucks logo" width="40px" />,
  },
  {
    label: 'NOAA',
    icon: <img src={NOAALogo} alt="NOAA logo" width="40px" />,
  },
]

const experienceContent = [
  {
    label: 'Executive, Admissions, & Marketing Directing',
    icon: <SupervisorAccountOutlined />,
  },
  {
    label: 'Business Management & Marketing',
    icon: <Storefront />,
  },
  { label: 'Technology Entrepreneurship', icon: <EmojiObjectsOutlined /> },
  {
    label: 'Nonprofit Management',
    icon: (
      <img src={NonProfitManagementIcon} alt="NOAA logo" width="24px" />
    ),
  },
  { label: 'Operations Management', icon: <ManageAccountsOutlined /> },
  { label: 'Technology Leadership', icon: <Diversity3 /> },
  { label: 'Volunteer Management', icon: <Diversity1Outlined /> },

  { label: 'Back-end Development', icon: <DataObjectOutlined /> },
  { label: 'UX Research & Design', icon: <ScreenSearchDesktopOutlined /> },
  { label: 'Graphic Design & Illustration', icon: <DrawOutlined /> },
  { label: 'Nonprofit Contribution', icon: <VolunteerActivismOutlined /> },

  { label: 'Front-end Development', icon: <Code /> },
]

const degreeContent = [
  {
    label: 'Informatics & Human Computer Interaction',
    icon: <img src={HCIIcon} alt="" width="24px" />,
  },
  {
    label: 'Computer Science / Engineering',
    icon: <TerminalOutlined />,
  },
  { label: 'English Literature', icon: <MenuBook /> },
  { label: 'Music Production', icon: <LibraryMusicOutlined /> },
  { label: 'Architecture', icon: <Apartment /> },
  {
    label: 'Life Sciences',
    icon: <img src={GeneticsIcon} alt="" width="24px" />,
  },
  { label: 'Law', icon: <Gavel /> },
  {
    label: 'Astrophysics',
    icon: <img src={PhysicsIcon} alt="" width="24px" />,
  },
]
