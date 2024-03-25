
/*
 * @2024 Digital Aid Seattle
 */
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
import {
  Box,
  Button,
  Stack,
  styled,
  Typography,
  useTheme,
} from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import { dasProjectsService } from 'pages/api/ProjectsService'
import { useEffect, useState } from 'react'
import { DASProject, TeamMember } from 'types'

import NoPhotoPerson from '../assets/no-photo-person.svg'
import { urlForImage } from '../sanity/lib/image'
import CardWithPhoto from './cards/CardWithPhoto'
import StateBadge from './cards/StateBadge'
import SectionContainer from './layout/SectionContainer'
import ListItemWithIcon from './list/ListItemWithIcon'

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

const ProjectHeaderSection = (props: { project: DASProject, hideStatus?: boolean }) => {
  const theme = useTheme()
  const [project, setProject] = useState<DASProject>()
  const largeScreen = useMediaQuery(theme.breakpoints.up('lg'))
  const extraSmallScreen = useMediaQuery(theme.breakpoints.down('md'))

  useEffect(() => {
    setProject(props.project)
  }, [props])

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
          </Stack>
          {!props.hideStatus &&
            <Stack spacing="1rem">
              <Stack direction="row" alignItems="center" spacing="1.5rem">
                <Typography variant="labelLarge">{project.programAreas.join(', ')}</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing="1.5rem">
                <Typography variant="labelLarge">Project Status:</Typography>
                <StateBadge state={project.status} />
              </Stack>
            </Stack>
          }

          <img
            src={project.imageSrc ? project.imageSrc : urlForImage(project.image).url()}
            style={{
              width: '50%',
              margin: '0 auto',
              marginTop: '1rem',
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
            </Stack>
            <Box
              sx={{
                width: { md: 'min(40vw, 18rem)', lg: 'min(40vw, 18rem)' },
                position: 'absolute',
                right: { xs: '2rem', md: '2rem', lg: '2rem' },
                bottom: '-6rem',
                zIndex: '2',
              }}
            >
              <img
                src={project.imageSrc ? project.imageSrc : urlForImage(project.image).url()}
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

        {!props.hideStatus &&
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
                <Typography variant="labelLarge">{project.programAreas.join(', ')}</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing="1.5rem">
                <Typography variant="labelLarge">Project Status:</Typography>
                <StateBadge state={project.status} />
              </Stack>
            </Stack>
          </Box>
        }
      </>
    )
  }

  return project ? (extraSmallScreen ? <MobileHeader /> : <DesktopHeader />) : <></>
}

const ProjectSection = styled(Stack)(({ theme }) => ({
  width: '100%',
  color: theme.palette.primary.main,
}))

const ProjectSubheader = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  [theme.breakpoints.up('xs')]: {
    marginBottom: '2rem',
  },
  [theme.breakpoints.up('lg')]: {
    marginBottom: '2.5rem',
  },
})) as typeof Typography

const ProjectFooterSection = () => {
  const theme = useTheme()

  return (
    <SectionContainer backgroundColor={theme.palette.primary.contrastText}>
      <ProjectSection
        sx={{
          alignItems: 'center',
        }}
      >
        <ProjectSubheader
          variant="headlineMedium"
          sx={{ textAlign: 'center' }}
          component="h2"
        >
          Interested in volunteering with Digital Aid Seattle?
        </ProjectSubheader>
        <Button
          variant="contained"
          href="https://airtable.com/embed/appTn3HE53SyGqWTJ/shr1lbcr3qmkoIbNW"
          target="_blank"
        >
          Apply to volunteer
        </Button>
      </ProjectSection>
    </SectionContainer>
  )
}

const ProjectTextSection = styled(Stack)(() => ({
  gap: '2rem',
}))

const ProjectBodyTextSection = (props: { title: string, texts?: string[] }) => {
  return (
    props.texts &&
    props.texts.length > 0 && (
      <ProjectSection>
        <ProjectSubheader variant="headlineMedium" component="h2">
          {props.title}
        </ProjectSubheader>
        <ProjectTextSection>
          {props.texts.map((t, index) => (
            <Typography key={index} variant="bodyLarge">
              {t}
            </Typography>
          ))}
        </ProjectTextSection>
      </ProjectSection>
    )
  )
}

const ProjectTeamSection = (props: { title: string, members?: TeamMember[] }) => {
  const [title, setTitle] = useState<string>()
  const [members, setMembers] = useState<TeamMember[]>([])
  useEffect(() => {
    if (props.members) {
      setMembers(props.members)
    }
    setTitle(props.title)
  }, [props])

  return (
    members &&
    members.length > 0 && (
      <ProjectSection>
        <ProjectSubheader
          variant="headlineMedium"
          sx={{ textAlign: 'center', marginBottom: { lg: '5rem' } }}
          component="h2"
        >
          {title}
        </ProjectSubheader>
        <Box
          sx={{
            display: 'grid',
            gridAutoFlow: 'columns',
            gridTemplateColumns: 'repeat(auto-fill, minmax(12.25rem, 1fr))',
            justifyContent: 'center',
            gap: '2rem',
            width: '100%',
          }}
          component="ul"
        >
          {members.map((person, idx) => {
            const url = person.url ? person.url : person.image ? urlForImage(person.image).url() : NoPhotoPerson.src;
            console.log(url)
            return <CardWithPhoto
              key={idx}
              title={person.name}
              description={person.role}
              image={url}
            />
          })}
        </Box>
      </ProjectSection>
    )
  )
}


type RolesSectionProps = {
  title: string
  roles?: string[]
}

const ProjectRolesSection = ({ title, roles }: RolesSectionProps) => {
  return (
    roles &&
    roles.length > 0 && (
      <ProjectSection>
        <ProjectSubheader
          variant="headlineMedium"
          sx={{ textAlign: 'center', marginBottom: { lg: '5rem' } }}
          component="h2"
        >
          {title}
        </ProjectSubheader>
        <Box
          sx={{
            display: 'grid',
            gridAutoFlow: 'columns',
            gridTemplateColumns: 'repeat(auto-fill, minmax(15rem, 1fr))',
            justifyContent: 'center',
            gap: '2rem',
            width: '100%',
          }}
          component="ul"
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
      </ProjectSection>
    )
  )
}
const ProjectContactUsSection = () => {
  return <ProjectSection
    sx={{
      alignItems: 'center',
    }}
  >
    <ProjectSubheader
      variant="headlineMedium"
      sx={{ textAlign: 'center' }}
      component="h2"
    >
      Questions about this project?
    </ProjectSubheader>
    <Button variant="outlined" href="mailto:info@digitalaidseattle.org">
      Contact us
    </Button>
  </ProjectSection>
}

export {
  ProjectBodyTextSection,
  ProjectContactUsSection,
  ProjectFooterSection,
  ProjectHeaderSection,
  ProjectRolesSection,
  ProjectSection,
  ProjectSubheader,
  ProjectTeamSection,
  ProjectTextSection
}