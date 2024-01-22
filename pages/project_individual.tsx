/*
 * @2023 Digital Aid Seattle
 */
import { useEffect, useState } from 'react'

import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import SectionContainer from 'components/layout/SectionContainer'

import { ProjectFooterSection, ProjectHeaderSection } from 'components/ProjectComponents'
import RolesSection from 'components/RolesSection'
import CardWithPhoto from 'components/cards/CardWithPhoto'
import { Section, Subheader, TextSection } from 'components/style-utils'
import { DASProject, TeamMember } from 'types'

import { withBasicLayout } from 'components/layouts'
import { dasProjectsService } from 'src/ProjectsService'
import { urlForImage } from '../sanity/lib/image'

type BodyTextSectionProps = {
  title: string
  texts?: string[]
}

const BodyTextSection = ({ title, texts }: BodyTextSectionProps) => {
  return (
    texts &&
    texts.length > 0 && (
      <Section>
        <Subheader variant="headlineMedium">{title}</Subheader>
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
  return (members && members.length > 0) &&
    <Section>
      <Subheader variant="headlineMedium">
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
            image={person.image ? urlForImage(person.image).url() : undefined}
          />
        ))}
      </Box>
    </Section>
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
          {project.rolesNeeded && project.rolesNeeded.length > 0 && (
            <RolesSection title="Roles needed" roles={project.rolesNeeded} />
          )}
          <Section>
            <Subheader variant="headlineMedium">
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
        <Section>
          <Subheader variant="headlineMedium">
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
      <ProjectHeaderSection project={project} />
      {project ? getBody() : <></>}
      <ProjectFooterSection />
    </>
  )
}

export default withBasicLayout(ProjectIndividualPage)
