/*
* @2023 Digital Aid Seattle
*/
import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material'
import Masthead from 'components/Masthead'
import SectionContainer from 'components/layout/SectionContainer'
import { withBasicLayout } from 'components/layouts'
const ErrorImage = '/images/404-error.png'

// Promote, if we want to handle other error types
type ErrorComponentProps = {
  title: string,
  description: string,
  imageSrc: string,
  imageTitle: string,
}
const ErrorComponent = ({ title, description, imageSrc, imageTitle }: ErrorComponentProps) => {

  const theme = useTheme()
  const smallScreen = useMediaQuery(theme.breakpoints.only('xs'))
  const largeScreen = useMediaQuery(theme.breakpoints.up('lg'))

  return <SectionContainer backgroundColor={theme.palette.background}>
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', lg: 'row' },
        alignItems: 'center',
        gap: { xs: 4, md: '40px' },
      }}>
      <Box
        sx={{
          textAlign: 'left',
          width: '100%',
          maxWidth: largeScreen ? '418px' : '950px',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
        }}>
        <Typography
          variant={smallScreen ? 'headlineMedium' : 'headlineLarge'}>
          {title}
        </Typography>
        <Typography variant="bodyLarge" >
          {description}
        </Typography>
        <Box >
          <Button
            title="Back Home"
            variant="contained"
            color="primary"
            href="/"
          >
            Back Home
          </Button>
        </Box>
      </Box>
      <img
        src={imageSrc}
        alt={imageTitle}
        width="418px"
        style={{ objectFit: 'cover' }}
      />
    </Box>
  </SectionContainer>
}

function Page404() {
  const theme = useTheme()

  const title = '404';

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
        <ErrorComponent title="Page Not Found"
          description="Unfortunately, the page you are trying to access could not be located. Please return to our home page to continue your journey."
          imageSrc={ErrorImage}
          imageTitle="404 Error Image" />
      </Box>
    </>
  )
}

export default withBasicLayout(Page404)
