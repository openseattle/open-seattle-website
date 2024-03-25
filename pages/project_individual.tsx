/*
 * @2023 Digital Aid Seattle
 */
import {
  Box,
  Button,
  Stack,
  useTheme
} from '@mui/material'
import SectionContainer from 'components/layout/SectionContainer'
import { BlockComponent, LoadingContext, withBasicLayout } from 'components/layouts'
import { ProjectFooterSection, ProjectHeaderSection, ProjectTeamSection } from 'components/ProjectComponents'
import RolesSection from 'components/RolesSection'
import { Section, Subheader } from 'components/style-utils'
import { useContext, useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import { DASProject } from 'types'

import { dasProjectsService } from './api/ProjectsService'

type BodyTextSectionProps = {
  title: string
  text: string
}

const BodyTextSection = ({ title, text }: BodyTextSectionProps) => {
  return (text &&
    <Section>
      <Subheader variant="headlineMedium">{title}</Subheader>
      <Markdown className='markdown'>
        {text}
      </Markdown>
    </Section>
  )
}

const ProjectIndividualPage = () => {
  const [project, setProject] = useState<DASProject>()
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams(window.location.search)
    dasProjectsService.getOne(params.get('project'))
      .then((resps) => {
        const project = resps
        // should reroute if no data
        dasProjectsService.getSquad(project.ventureCode)
          .then(team => {
            project.currentTeam = team;
            setProject(project)
          })
          .catch((error) => console.error(error))
          .finally(() => setLoading(false))
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
  }, [setLoading])

  const theme = useTheme()
  function getBody() {
    return (
      <SectionContainer backgroundColor={theme.palette.background.default}>
        <Stack
          gap={{ xs: '64px', lg: '80px' }}
          maxWidth="880px"
          margin="0 auto"
        >
          <BodyTextSection title="Problem" text={project.problem} />
          <BodyTextSection title="Solution" text={project.solution} />
          <BodyTextSection title="Impact" text={project.impact} />
          <ProjectTeamSection title="Current team" members={project.currentTeam} />
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
    <BlockComponent block={!project}>
      <Box
        sx={{
          backgroundColor: theme.palette.background.default
        }}>
        <ProjectHeaderSection project={project} />
        {project && getBody()}
        <ProjectFooterSection />
      </Box>
    </ BlockComponent>
  )
}

export default withBasicLayout(ProjectIndividualPage)
