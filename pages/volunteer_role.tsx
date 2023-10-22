import { useEffect, useState } from 'react'
// import Link from 'next/link'

import { withBasicLayout } from 'components/layouts'

import { Box, Breadcrumbs, Button, Link, Typography, useTheme } from '@mui/material'

import { dasVolunteerRoleService } from './api/VolunteerRoleService'
import { DASVolunteerRole } from 'types'

import { NavigateNextSharp } from '@mui/icons-material'

const VolunteerRolePage = () => {
  const [role, setRole] = useState<DASVolunteerRole>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    dasVolunteerRoleService
      .getVolunteerRoleByName(params.get('role'))
      .then((role) => setRole(role))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
  }, [])

  const BreadCrumbSection = (roleTitle) => {
    return (
      <Breadcrumbs aria-label='breadcrumb' separator={<NavigateNextSharp fontSize="small" color={'primary'}/>} sx={{}}>
        <Link href={'./'} color="primary" underline='hover'>
          Home
        </Link>
        <Link href={'./volunteers'} color="primary" underline='hover'>
          Volunteers
        </Link>
        <Typography color="textPrimary">{'Test'}</Typography>
      </Breadcrumbs>
    )
  }

  return (
    <>
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <h1>Loading!</h1>
        </Box>
      )}
      {role ? (
        <>
        <BreadCrumbSection role={'test'}/>
          {/* Fix: format to match figma file: https://www.figma.com/file/vs1l6ERmi4AqYjxBBK9gDJ/Style-Guide-%26-Prototypes?type=design&node-id=2404-32837&mode=design&t=YHOYNerJdHcOVOLq-0 */}
          {/* Blocker: waiting for Seamus to update airtable fields for better formatting - volunteerRoleService.ts will need to be updated to accommodate updated fields */}
          <h1>{role.role}</h1>
          <p>{role.description}</p>
          <Link href={'./volunteers'}>
            <Button>Return to Volunteer Page</Button>
          </Link>
        </>
      ) : (
        <p>Role not found</p>
      )}
    </>
  )
}

export default withBasicLayout(VolunteerRolePage)
