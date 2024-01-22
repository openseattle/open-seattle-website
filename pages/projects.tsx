import { Box, CircularProgress, Stack, useTheme } from '@mui/material'
import Masthead from 'components/Masthead'
import CardGridContainer from 'components/cards/CardGridContainer'
import CardProject from 'components/cards/CardProject'
import { withBasicLayout } from 'components/layouts'
import { useEffect, useState } from 'react'
import { dasProjectsService } from '../src/ProjectsService'

const ProjectsPage = () => {
  const theme = useTheme()

  const title = 'Projects';
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    dasProjectsService.getAll()
      .then(projs => setProjects(projs
        .filter(proj => proj.display || proj.display === undefined)
        .sort((p1, p2) => p1.orderRank.localeCompare(p2.orderRank))))
      .catch(error => console.log(error))
      .finally(() => setLoading(false))
  }, []);

  return (
    <>
      <Masthead title={title} />
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
          {loading &&
            <CircularProgress />
          }
          <CardGridContainer>
            {projects.map((project) => (
              <CardProject
                key={project.id}
                project={project}
              />
            ))}
          </CardGridContainer>
        </Stack>
      </Box>
    </>
  )
}

export default withBasicLayout(ProjectsPage)
