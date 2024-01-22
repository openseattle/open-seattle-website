import { NavigateNextSharp } from '@mui/icons-material'
import {
  Box,
  Breadcrumbs,
  Button,
  CircularProgress,
  Link,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import SectionContainer from 'components/layout/SectionContainer'
import { withBasicLayout } from 'components/layouts'
import Masthead from 'components/Masthead'
import { useEffect, useState } from 'react'
import { DASVolunteerRole } from 'types'
import { dasVolunteerRoleService } from 'src/VolunteerRoleService'

const VolunteerRolePage = () => {
  const [role, setRole] = useState<DASVolunteerRole>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    dasVolunteerRoleService
      .getRoleDetailsByName(params.get('role'))
      .then((role) => setRole(role))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
  }, [])

  const theme = useTheme()

  const buildListItems = (content: string[]) => {
    return (
      <ul
        style={{
          listStyleType: 'disc',
          listStylePosition: 'outside',
          paddingLeft: '1rem',
        }}
      >
        {content.map((item: string, i) => (
          <li
            style={{ display: 'list-item', paddingLeft: '1rem', marginBottom: '1rem' }}
            key={`${i}-${item}`}
          >
            {item}
          </li>
        ))}
      </ul>
    )
  }

  const BreadCrumbSection = ({ roleName }) => {
    return (
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<NavigateNextSharp fontSize="small" color={'primary'} />}
      >
        <Link href={'./'} color="primary" underline="hover">
          Home
        </Link>
        <Link href={'./volunteers'} color="primary" underline="hover">
          Volunteers
        </Link>
        <Typography color="textPrimary">{roleName}</Typography>
      </Breadcrumbs>
    )
  }

  const RoleDescriptionSubSection = ({ title, content, list }) => {
    return (
      <>
        <Box sx={{ typography: 'bodyLarge', fontWeight: 'bold' }}>
          {title}
        </Box>
        {title === 'Preferred Qualifications' ? (
          <Typography
            variant="bodyLarge"
            sx={{ display: 'block', fontStyle: 'italic' }}
          >
            {
              "If you don't meet every qualification but have some of these skills, please consider applying. Our collaborative team often complements individual expertise to bridge gaps."
            }
          </Typography>
        ) : null}
        {list ? (
          <>{buildListItems(content)}</>
        ) : (
          <Typography variant="bodyLarge">
            {content}
          </Typography>
        )}
      </>
    )
  }

  const RoleDescriptionSection = ({ roleData }) => {
    return (
      <>
        <Typography variant="headlineLarge" sx={{ mt: '2rem' }}>
          {roleData.role}
        </Typography>
        {roleData.headline ? (
          <Box sx={{ typography: 'bodyLarge', fontWeight: 'bold' }}>
            {roleData.headline}
          </Box>
        ) : null}
        <>
          {roleData.location ? (
            <Box
              sx={{
                typography: 'bodyLarge',
                fontWeight: 'bold',
                lineHeight: '0.5rem',
                mt: '1rem',
              }}
            >
              {'Location: '}
              <span style={{ fontWeight: 'normal' }}>{roleData.location}</span>
            </Box>
          ) : null}
          {roleData.duration ? (
            <Box
              sx={{
                typography: 'bodyLarge',
                fontWeight: 'bold',
                lineHeight: '0.5rem',
                mb: '1rem',
              }}
            >
              {'Duration: '}
              <span style={{ fontWeight: 'normal' }}>{roleData.duration}</span>
            </Box>
          ) : null}
        </>
        {roleData.aboutUs ? (
          <RoleDescriptionSubSection
            title={'About Us'}
            content={roleData.aboutUs}
            list={false}
          />
        ) : null}
        {roleData.whyJoin ? (
          <RoleDescriptionSubSection
            title={'Why Join Us?'}
            content={roleData.whyJoin}
            list={false}
          />
        ) : null}
        {roleData.whatYouWillDo ? (
          <RoleDescriptionSubSection
            title={'What You Will Do'}
            content={roleData.whatYouWillDo}
            list={false}
          />
        ) : null}
        {roleData.responsibilities ? (
          <RoleDescriptionSubSection
            title={`Responsibilities of ${roleData.role}`}
            content={roleData.responsibilities}
            list={true}
          />
        ) : null}
        {roleData.preferredQualifications ? (
          <RoleDescriptionSubSection
            title={'Preferred Qualifications'}
            content={roleData.preferredQualifications}
            list={false}
          />
        ) : null}
        {roleData.keyAttributesToSuccess ? (
          <RoleDescriptionSubSection
            title={'Key Attributes to Success'}
            content={roleData.keyAttributesToSuccess}
            list={true}
          />
        ) : null}
        {roleData.keyTechnologies ? (
          <RoleDescriptionSubSection
            title={'Key Technologies'}
            content={roleData.keyTechnologies}
            list={true}
          />
        ) : null}
        {roleData.applicationLink ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mt: '2rem',
            }}
          >
            <Link href={roleData.applicationLink} target="_blank">
              <Button variant="contained">Apply to Volunteer</Button>
            </Link>
          </Box>
        ) : null}
      </>
    )
  }

  const RoleUnavailableSection = () => {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="headlineLarge" sx={{ mt: '2rem', mb: '2rem' }}>
          {'Sorry, this volunteer role is not available.'}
        </Typography>
        <Link href={'./volunteers'}>
          <Button variant="contained">Return to Volunteer Page</Button>
        </Link>
      </Box>
    )
  }

  return (
    <>
      <Masthead title={'Volunteer Opening'} />
      <SectionContainer backgroundColor={theme.palette.background.default}>
        <Stack gap={{ xs: '2.5rem', md: '2rem' }} maxWidth={'880px'}>
          {loading && <CircularProgress />}

          {!loading && role && (
            <>
              <BreadCrumbSection roleName={String(role.role)} />
              <RoleDescriptionSection roleData={role} />
            </>
          )}
          {!loading && !role && <RoleUnavailableSection />}
        </Stack>
      </SectionContainer>
    </>
  )
}

export default withBasicLayout(VolunteerRolePage)
