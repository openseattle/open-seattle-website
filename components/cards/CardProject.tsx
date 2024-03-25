import { CardActionArea, styled } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { dasProjectsService } from 'pages/api/ProjectsService'
import { DASProject } from 'types'

import { urlForImage } from '../../sanity/lib/image'
import StateBadge from './StateBadge'

type CardProjectProps = {
  project: DASProject
}

const CardProject = ({ project }: CardProjectProps) => {
  return (
    <Card
      sx={{
        boxShadow:
          '0px 2px 4px 0px rgba(52, 61, 62, 0.04), 0px 4px 8px 2px rgba(52, 61, 62, 0.04)',
        '&:hover': {
          boxShadow:
            '0px 2px 4px 0px rgba(52, 61, 62, 0.1), 0px 4px 8px 2px rgba(52, 61, 62, 0.1)',
        },
      }}
    >
      <CardActionArea
        href={project.projectLink}
        sx={{
          height: '100%',
        }}
      >
        <CardContent
          sx={{
            padding: { xs: '2rem 1rem', lg: '2rem' },
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            justifyContent: 'space-between',
          }}
        >
          <Stack direction={{ xs: 'row', lg: 'column' }} gap="1.5rem">
            <CardMedia
              component="img"
              image={project.imageSrc ? project.imageSrc : urlForImage(project.image).url()}
              sx={{
                width: { md: '7rem', lg: '100%' },
                aspectRatio: '1 / 1',
                border: '2px solid #EAF1F1',
                borderRadius: '8px',
                display: { xs: 'none', md: 'block' },
              }}
            />
            <Stack spacing="1rem" sx={{ width: '100%' }}>
              <Typography variant="titleLarge" component="h2">
                {project.title}
              </Typography>
              <Stack spacing="1rem">
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  {project.programAreas &&
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="labelLarge">
                        {project.partner}
                      </Typography>
                    </Stack>
                  }
                  <StateBadge state={project.status} />
                </Stack>
                {project.programAreas &&
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="labelMedium">
                      {project.programAreas.join(', ')}
                    </Typography>
                  </Stack>
                }
              </Stack>
            </Stack>
          </Stack>
          <Typography variant="bodyMedium">{project.description}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default CardProject
