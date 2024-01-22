/* eslint-disable jsx-a11y/alt-text  */
/* eslint-disable @next/next/no-img-element */

import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import { Box, Container, Grid, styled, Typography } from '@mui/material'
import Link from '@mui/material/Link'
import { theme } from 'theme/theme'

import { ReactNode } from 'react'

const OSLogo = '/images/darkThemeLogo.svg'

// const GridItem = styled(Grid)(() => {
//   return {
//     item: true,
//     padding: '0.5rem',
//     justifyContent: 'left',
//     alignItems: 'center'
//   }
// })
type GridItemProps = {
  children: ReactNode
  md?: number
}

const GridItem = ({ md, children }: GridItemProps) =>
  md ? (
    <Grid
      item={true}
      padding="0.5rem"
      justifyContent="left"
      alignItems="center"
      md={md}
    >
      {children}
    </Grid>
  ) : (
    <Grid
      item={true}
      padding="0.5rem"
      justifyContent="left"
      alignItems="center"
    >
      {children}
    </Grid>
  )

const FooterItemTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.primary.contrastText,
  fontSize: '0.875rem',
}))

const FooterSubItem = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  fontSize: '1rem',
  marginTop: '1rem',
  display: 'block',
}))

const LinkSubItem = (props: { url: string; name: string }) => (
  <Link
    sx={{
      color: theme.palette.primary.contrastText,
      marginTop: '1rem',
      display: 'block',
    }}
    underline="hover"
    href={props.url}
  >
    <Typography fontSize={'1rem'}>{props.name}</Typography>
  </Link>
)

const SubText = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  fontSize: '0.75rem',
}))

const logoBox = (imageStyle) => {
  return (
    <Box>
      <Link href="/" title="Go back to home" aria-label="Go back to home">
        <img
          src={OSLogo}
          style={imageStyle}
          alt="Digital Aid Seattle Logo"
        />
      </Link>
    </Box>
  )
}

const aboutBox = () => {
  return (
    <Box>
      <FooterItemTitle>About Digital Aid Seattle</FooterItemTitle>
      <LinkSubItem url="/privacy" name="Privacy Policy" />
    </Box>
  )
}
const contactUsBox = () => {
  return (
    <Box>
      <FooterItemTitle>Contact us</FooterItemTitle>
      <FooterSubItem>
        <a href="mailto:info@digitalaidseattle.org">
          info@digitalaidseattle.org
        </a>
      </FooterSubItem>
    </Box>
  )
}

const workWithUsBox = () => {
  return (
    <Box>
      <FooterItemTitle>Work with us</FooterItemTitle>
      <LinkSubItem url="/partners" name="Partner" />
      <LinkSubItem url="/volunteers" name="Volunteer" />
    </Box>
  )
}

const supportUsBox = () => {
  return (
    <Box>
      <FooterItemTitle>Support us</FooterItemTitle>
      <FooterSubItem>
        <a href="mailto:info@digitalaidseattle.org">How you can help</a>
      </FooterSubItem>
    </Box>
  )
}

const copyrightBox = () => {
  return (
    <Box>
      <SubText>
        Illustrations by{' '}
        <Link
          href="https://www.freepik.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Freepik, which opens in a new window."
          sx={{ color: theme.palette.primary.contrastText }}
        >
          Freepik
        </Link>
      </SubText>
      <FooterItemTitle>© Digital Aid Seattle 2023</FooterItemTitle>
    </Box>
  )
}

const linkedInLink = () => {
  return (
    <Link
      href="https://www.linkedin.com/company/digitalseattle/"
      target="_blank"
      rel="noopener noreferrer"
      title="LinkedIn"
      aria-label="Our LinkedIn, which opens in a new window."
    >
      <LinkedInIcon
        sx={{ color: theme.palette.primary.contrastText }}
        fontSize="large"
      />
    </Link>
  )
}
const githubLink = () => {
  return (
    <Link
      href="https://github.com/openseattle"
      target="_blank"
      rel="noopener noreferrer"
      title="GitHub"
      aria-label="Our GitHub, which opens in a new window."
    >
      <GitHubIcon
        sx={{ color: theme.palette.primary.contrastText }}
        fontSize="large"
      />
    </Link>
  )
}

const CommonFooterLargeScreen = () => (
  <Grid container direction="column" columns={4}>
    <GridItem md={3}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        {logoBox({ height: '80%', width: '120px' })}
        {copyrightBox()}
      </Box>
    </GridItem>

    <GridItem md={4}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          height: '100%',
        }}
      >
        {contactUsBox()}
        {workWithUsBox()}
      </Box>
    </GridItem>

    <GridItem md={4}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        {aboutBox()}
      </Box>
    </GridItem>

    <GridItem md={1}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          marginLeft: '4rem',
        }}
      >
        {linkedInLink()}
        {githubLink()}
      </Box>
    </GridItem>
  </Grid>
)

const CommonFooterMidScreen = () => (
  <Grid container direction="column" columns={3}>
    <GridItem md={5}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        {logoBox({ height: 'auto', width: '120px' })}
        {copyrightBox()}
      </Box>
    </GridItem>

    <GridItem md={5}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        {contactUsBox()}
        {workWithUsBox()}
        {aboutBox()}
      </Box>
    </GridItem>

    <GridItem md={2}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
        }}
      >
        {linkedInLink()}
        {githubLink()}
      </Box>
    </GridItem>
  </Grid>
)

const CommonFooterSmallScreen = () => (
  <Grid
    container
    direction="column"
    columns={1}
    sx={{ alignItems: 'center', textAlign: 'center', gap: '4rem' }}
  >
    <GridItem>{logoBox({ height: '3rem', width: 'auto' })}</GridItem>

    <GridItem>{contactUsBox()}</GridItem>

    <GridItem>{workWithUsBox()}</GridItem>

    <GridItem>{aboutBox()}</GridItem>

    <GridItem>
      <Box display="flex" sx={{ gap: '1rem' }}>
        {linkedInLink()}
        {githubLink()}
      </Box>
    </GridItem>

    <GridItem>{copyrightBox()}</GridItem>
  </Grid>
)

const CommonFooter = () => {
  return (
    <>
      <Container
        sx={{
          padding: '5rem 0rem',
          display: { xs: 'none', md: 'none', lg: 'flex' },
          height: '28rem',
        }}
      >
        <CommonFooterLargeScreen />
      </Container>

      <Container
        sx={{
          padding: '4rem 2rem',
          display: { xs: 'none', md: 'flex', lg: 'none' },
          height: '29rem',
        }}
      >
        <CommonFooterMidScreen />
      </Container>

      <Container
        sx={{
          padding: '4rem 0rem',
          display: { xs: 'flex', md: 'none', lg: 'none' },
        }}
      >
        <CommonFooterSmallScreen />
      </Container>
    </>
  )
}
export default CommonFooter
