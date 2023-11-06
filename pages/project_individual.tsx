/*
 * @2023 Digital Aid Seattle
 */
import { useEffect, useState } from 'react'
import { urlForImage } from '../sanity/lib/image'

import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
  styled,
  useTheme,
} from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import SectionContainer from 'components/layout/SectionContainer'
import { dasProjectsService } from './api/ProjectsService'

import CardWithPhoto from 'components/cards/CardWithPhoto'
import StateBadge from 'components/cards/StateBadge'
import { withBasicLayout } from 'components/layouts'
import ListItemWithIcon from 'components/list/ListItemWithIcon'
import NoPhotoPerson from '../assets/no-photo-person.svg'
// icons for role cards
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined'
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined'
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined'
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined'
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import Diversity3OutlinedIcon from '@mui/icons-material/Diversity3Outlined'
import DrawOutlinedIcon from '@mui/icons-material/DrawOutlined'
import EmojiPeopleOutlinedIcon from '@mui/icons-material/EmojiPeopleOutlined'
import GavelRoundedIcon from '@mui/icons-material/GavelRounded'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'
import ScreenSearchDesktopOutlinedIcon from '@mui/icons-material/ScreenSearchDesktopOutlined'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import { DASProject, TeamMember } from 'types'

const rolesMap = {
  communityEngagementLiason: {
    role: 'community engagement liaison',
    icon: <CampaignOutlinedIcon />,
  },
  dataAnalyst: {
    role: 'data analyst',
    icon: <ScreenSearchDesktopOutlinedIcon />,
  },
  designer: { role: 'designer', icon: <DrawOutlinedIcon /> },
  grantWriter: { role: 'grant writer', icon: <DescriptionOutlinedIcon /> },
  legalHelp: { role: 'legal help', icon: <GavelRoundedIcon /> },
  productManager: { role: 'product manager', icon: <Diversity3OutlinedIcon /> },
  projectManager: {
    role: 'project manager',
    icon: <ManageAccountsOutlinedIcon />,
  },
  uxResearcher: {
    role: 'user experience researcher',
    icon: <ScreenSearchDesktopOutlinedIcon />,
  },
  socialMediaDesigner: {
    role: 'social media designer',
    icon: <ShareOutlinedIcon />,
  },
  socialMediaSpecialist: {
    role: 'social media specialist',
    icon: <EmojiPeopleOutlinedIcon />,
  },
  softwareEngineer: { role: 'software engineer', icon: <CodeOutlinedIcon /> },
  solutionArchitect: {
    role: 'solution architect',
    icon: <ApartmentOutlinedIcon />,
  },
  storyteller: { role: 'storyteller', icon: <AutoStoriesOutlinedIcon /> },
  qaSpecialist: { role: 'QA specialist', icon: <BugReportOutlinedIcon /> },
}

// the ExtraProps type definition allows an H2 component
// to be passed to the styled typography.
type ExtraProps = {
  component: React.ElementType
}

const Subheader = styled(Typography)<ExtraProps>(({ theme }) => ({
  color: theme.palette.primary.main,
  [theme.breakpoints.up('xs')]: {
    marginBottom: '2rem',
  },
  [theme.breakpoints.up('lg')]: {
    marginBottom: '2.5rem',
  },
}))

const Section = styled(Stack)(({ theme }) => ({
  width: '100%',
  color: theme.palette.primary.main,
}))

const TextSection = styled(Stack)(() => ({
  gap: '2rem',
}))

type BodyTextSectionProps = {
  title: string
  texts?: string[]
}

const BodyTextSection = ({ title, texts }: BodyTextSectionProps) => {
  return (
    texts &&
    texts.length > 0 && (
      <Section>
        <Subheader variant="headlineMedium" component="h2">
          {title}
        </Subheader>
        <TextSection>
          {texts.map((t, index) => (
            <Typography key={index} variant="bodyLarge">
              {t}
            </Typography>
          ))}
        </TextSection>
      </Section>
    )
  )
}

type TeamSectionProps = {
  title: string
  members?: TeamMember[]
}

const TeamSection = ({ title, members }: TeamSectionProps) => {
  return (
    members &&
    members.length > 0 && (
      <Section>
        <Subheader
          variant="headlineMedium"
          sx={{ textAlign: 'center', marginBottom: { lg: '5rem' } }}
          component="h2"
        >
          {title}
        </Subheader>
        <Box
          sx={{
            display: 'grid',
            gridAutoFlow: 'columns',
            gridTemplateColumns: 'repeat(auto-fill, minmax(12.25rem, 1fr))',
            justifyContent: 'center',
            gap: '2rem',
            width: '100%',
          }}
        >
          {members.map((person) => (
            <CardWithPhoto
              key={person._id}
              title={person.name}
              description={person.role}
              image={
                person.image
                  ? urlForImage(person.image).url()
                  : NoPhotoPerson.src
              }
            />
          ))}
        </Box>
      </Section>
    )
  )
}

type RolesSectionProps = {
  title: string
  roles?: string[]
}

const RolesSection = ({ title, roles }: RolesSectionProps) => {
  return (
    roles &&
    roles.length > 0 && (
      <Section>
        <Subheader
          variant="headlineMedium"
          sx={{ textAlign: 'center', marginBottom: { lg: '5rem' } }}
          component="h2"
        >
          {title}
        </Subheader>
        <Box
          sx={{
            display: 'grid',
            gridAutoFlow: 'columns',
            gridTemplateColumns: 'repeat(auto-fill, minmax(15rem, 1fr))',
            justifyContent: 'center',
            gap: '2rem',
            width: '100%',
          }}
        >
          {roles
            .filter((item) => rolesMap[item])
            .map((item) => (
              <ListItemWithIcon
                key={item}
                listIcon={rolesMap[item].icon}
                listText={rolesMap[item].role}
              />
            ))}
        </Box>
      </Section>
    )
  )
}

const ProjectIndividualPage = () => {
  const [project, setProject] = useState<DASProject>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    dasProjectsService
      .getOne(params.get('project'))
      .then((data) => setProject(data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  }, [])

  const theme = useTheme()
  const extraSmallScreen = useMediaQuery(theme.breakpoints.down('md'))
  const largeScreen = useMediaQuery(theme.breakpoints.up('lg'))

  function MobileHeader() {
    return (
      <>
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
            <Typography variant="displayMedium" component="h1">
              {project.title}
            </Typography>
            <Typography variant="headlineMedium" component="h2">
              {project.partner}
            </Typography>
          </Stack>
          <Stack spacing="1rem">
            <Stack direction="row" alignItems="center" spacing="1.5rem">
              <Typography variant="labelLarge">Project Status:</Typography>
              <StateBadge state={project.status} />
            </Stack>
            <Typography variant="labelLarge">
              Expected Timeline: Ongoing
            </Typography>
          </Stack>

          <img
            src={urlForImage(project.image).url()}
            style={{
              width: '100%',
              aspectRatio: '1 / 1',
              display: 'block',
              borderRadius: '20px',
              boxShadow:
                '0px 4px 8px 0px rgba(52, 61, 62, 0.08), 0px 8px 16px 0px rgba(52, 61, 62, 0.08)',
            }}
          />
        </Stack>
      </>
    )
  }

  function DesktopHeader() {
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
            }}
          >
            <Stack>
              <Typography
                variant={largeScreen ? 'displayLarge' : 'displayMedium'}
                sx={{
                  width: { md: '40vw', lg: '25rem' },
                }}
                component="h1"
              >
                {project.title}
              </Typography>
              <Typography
                variant={largeScreen ? 'headlineLarge' : 'headlineMedium'}
                component="h2"
              >
                {project.partner}
              </Typography>
            </Stack>

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
                src={urlForImage(project.image).url()}
                style={{
                  width: '100%',
                  display: 'block',
                  borderRadius: '20px',
                  boxShadow:
                    '0px 4px 8px 0px rgba(52, 61, 62, 0.08), 0px 8px 16px 0px rgba(52, 61, 62, 0.08)',
                }}
              />
            </Box>
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
            <Stack direction="row" alignItems="center" spacing="1.5rem">
              <Typography variant="labelLarge">Project Status:</Typography>
              <StateBadge state={project.status} />
            </Stack>

            <Stack direction="row" alignItems="center" spacing="1.5rem">
              <Typography variant="labelLarge">Expected Timeline:</Typography>
              <Typography variant="labelLarge">
                {dasProjectsService.getTimeline(project)}
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </>
    )
  }

  function getHeader() {
    return extraSmallScreen ? <MobileHeader /> : <DesktopHeader />
  }

  function getBody() {
    return (
      <SectionContainer backgroundColor={theme.palette.background.default}>
        <Stack
          gap={{ xs: '64px', lg: '80px' }}
          maxWidth="880px"
          margin="0 auto"
        >
          <BodyTextSection title="Problem" texts={project.problem} />
          <BodyTextSection title="Solution" texts={project.solution} />
          <BodyTextSection title="Impact" texts={project.impact} />
          <TeamSection title="Current team" members={project.currentTeam} />
          <RolesSection title="Roles needed" roles={project.rolesNeeded} />

          <Section
            sx={{
              alignItems: 'center',
            }}
          >
            <Subheader
              variant="headlineMedium"
              sx={{ textAlign: 'center' }}
              component="h2"
            >
              Questions about this project?
            </Subheader>
            <Button variant="outlined" href="mailto:info@digitalaidseattle.org">
              Contact us
            </Button>
          </Section>
        </Stack>
      </SectionContainer>
    )
  }

  function getFooter() {
    return (
      <SectionContainer backgroundColor={theme.palette.primary.contrastText}>
        <Section
          sx={{
            alignItems: 'center',
          }}
        >
          <Subheader
            variant="headlineMedium"
            sx={{ textAlign: 'center' }}
            component="h2"
          >
            Interested in volunteering with Digital Aid Seattle?
          </Subheader>
          <Button
            variant="contained"
            href="https://airtable.com/embed/appTn3HE53SyGqWTJ/shr1lbcr3qmkoIbNW"
            target="_blank"
          >
            Apply to volunteer
          </Button>
        </Section>
      </SectionContainer>
    )
  }

  return (
    <>
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      )}
      {project ? getHeader() : <></>}
      {project ? getBody() : <></>}
      {getFooter()}
    </>
  )
}

export default withBasicLayout(ProjectIndividualPage)
