import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { DASProject } from 'types'
import { urlForImage } from '../../sanity/lib/image'
import StateBadge from './StateBadge'
import { dasProjectsService } from 'src/ProjectsService'

type CardProjectProps = {
  project: DASProject
}

const CardProject = ({ project }: CardProjectProps) => {
  return (
    <Card
      sx={{
        boxShadow:
          '0px 2px 4px 0px rgba(52, 61, 62, 0.04), 0px 4px 8px 2px rgba(52, 61, 62, 0.04)',
      }}
    >
      <CardContent
        sx={{
          padding: { xs: '2rem 1rem', lg: '2rem' },
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        <Stack direction={{ xs: 'row', lg: 'column' }} gap="1.5rem">
          <CardMedia
            component="img"
            image={urlForImage(project.image).url()}
            sx={{
              width: { md: '7rem', lg: '100%' },
              aspectRatio: '1 / 1',
              border: '2px solid #EAF1F1',
              borderRadius: '8px',
              display: { xs: 'none', md: 'block' },
            }}
          />
          <Stack spacing="1rem">
            <Typography variant="titleLarge" component="h2">
              {project.title}
            </Typography>
            <Typography variant="labelLarge">{project.partner}</Typography>
            <Typography variant="labelMedium">
              {(project.programAreas ? project.programAreas : []).join(', ')}
            </Typography>
          </Stack>
        </Stack>
        <Typography variant="bodyMedium">{project.description}</Typography>
        <Stack
          direction={{ xs: 'column-reverse', lg: 'row' }}
          alignItems={{ xs: 'auto', lg: 'flex-end' }}
          justifyContent="space-between"
          spacing="1rem"
        >
          <Button
            variant="contained"
            href={project.projectLink}
            sx={{ width: { md: 'max-content' } }}
          >
            View Project
          </Button>
          <Stack
            direction={{ xs: 'row-reverse', lg: 'column' }}
            justifyContent={{ xs: 'space-between', sm: 'auto' }}
            alignItems={{ xs: 'center', sm: 'auto' }}
            spacing="1rem"
          >
            <StateBadge state={project.status} />

            <Typography variant="labelMedium">
              {dasProjectsService.getTimeline(project)}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default CardProject
