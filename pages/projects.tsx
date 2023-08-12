import { Box,Stack, styled, Typography, useTheme } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import ProjectCadreImage from 'assets/project-image.png'
import CardGridContainer from 'components/cards/CardGridContainer'
import CardProject from 'components/cards/CardProject'
import SectionContainer from 'components/layout/SectionContainer'
import { withBasicLayout } from 'components/layouts'

type CardProjectProps = {
  title: string
  partner: string
  programAreas: string[]
  description: string
  status: 'active' | 'recruiting' | 'complete'
  projectLink: string
  duration?: { start: string; end: string }
  imageSrc: string
  imageAlt: string
}

const MobileHeader = styled(Typography)(({ theme }) => ({
  padding: '4rem 0',
  width: '100%',
  textAlign: 'center',
}))

const DesktopHeader = styled(Typography)(({ theme }) => ({
  padding: '5rem 0',
  width: '100%',
  textAlign: 'center',
}))

const ProjectsPage = () => {
  const theme = useTheme()

  const extraSmallScreen = useMediaQuery(theme.breakpoints.only('xs'))

  const projectData: CardProjectProps[] = [
    {
      title: 'The Cadre',
      partner: 'Open Seattle',
      programAreas: ['Civic technology'],
      description:
        'Open Seattle works with Seattle-based nonprofits to create customized digital solutions for their needs, for free.',
      status: 'active' as 'active',
      projectLink: '/project_cadre',
      imageSrc: ProjectCadreImage.src,
      imageAlt: 'Open seattle logo',
    },
  ]

  return (
    <>
      <Stack
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
        }}
      >
        {extraSmallScreen ? (
          <MobileHeader variant="displayMedium">Projects</MobileHeader>
        ) : (
          <DesktopHeader variant="displayLarge">Projects</DesktopHeader>
        )}
      </Stack>
      <Box
        sx={{
          width: '100%',
          backgroundColor: theme.palette.background.default,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Stack
          sx={{
            paddingX: {
              xs: '1rem',
              md: '2rem',
              lg: '0',
            },
            paddingTop: '2.5rem',
            paddingBottom: {
              xs: '3rem',
              md: '4rem',
              lg: '7.5rem',
            },
          }}
          maxWidth={'880px'}
        >
          <CardGridContainer>
            {projectData.map((project) => (
              <CardProject
                key={project.title}
                title={project.title}
                partner={project.partner}
                programAreas={project.programAreas}
                description={project.description}
                status={project.status}
                projectLink={project.projectLink}
                duration={project.duration}
                imageSrc={project.imageSrc}
                imageAlt={project.imageAlt}
              />
            ))}
          </CardGridContainer>
        </Stack>
      </Box>
    </>
  )
}

export default withBasicLayout(ProjectsPage)