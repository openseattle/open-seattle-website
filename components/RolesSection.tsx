/**
* RolesNeededSection.tsx
* example: 
 
<RolesSection title="Current volunteer openings"
 roles={[]}
 showLink={true}
 columns={2} >
          <Typography variant="bodyLarge" marginTop={'2rem'} textAlign={'center'}>All of our volunteers are vetted for experience, and sign a volunteer agreement before commencing work with Digital Aid Seattle.</Typography>
  </RolesSection>

* @2023 Digital Aid Seattle
*/

// icons for role cards
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined'
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined'
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined'
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined'
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined'
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined'
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import Diversity3OutlinedIcon from '@mui/icons-material/Diversity3Outlined'
import DrawOutlinedIcon from '@mui/icons-material/DrawOutlined'
import EmojiPeopleOutlinedIcon from '@mui/icons-material/EmojiPeopleOutlined'
import GavelRoundedIcon from '@mui/icons-material/GavelRounded'
import HubOutlinedIcon from '@mui/icons-material/HubOutlined';
import InsightsOutlinedIcon from '@mui/icons-material/InsightsOutlined'
import IntegrationInstructionsOutlinedIcon from '@mui/icons-material/IntegrationInstructionsOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined'
import ScreenSearchDesktopOutlinedIcon from '@mui/icons-material/ScreenSearchDesktopOutlined'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import { Box, Link } from '@mui/material'
import { ReactNode } from 'react'
import { theme } from 'theme/theme'
import { DASVolunteerRoleBasicInfo } from 'types'

import ListItemWithIcon from './list/ListItemWithIcon'
import { Section, Subheader } from './style-utils'

// TODO: standardize roles between sanity and airtable
const rolesMap = {
  "account-manager": { role: 'account manager', icon: <AccountTreeOutlinedIcon />, },
  "accountant": { role: 'accountant', icon: <CalculateOutlinedIcon />, },
  "administrative-manager": { role: 'administrative manager', icon: <ManageAccountsOutlinedIcon />, },
  "bookkeeper": { role: 'bookkeeper', icon: <CalculateOutlinedIcon />, },
  "business-analyst": { role: 'business analyst', icon: <InsightsOutlinedIcon />, },
  "community-engagement-liaison": { role: 'community engagement liaison', icon: <CampaignOutlinedIcon />, },
  "data-analyst": { role: 'data analyst', icon: <ScreenSearchDesktopOutlinedIcon />, },
  "digital-marketing-specialist-and-ga4-specialist": { role: 'digital marketing specialist & ga4 specialist', icon: <InsightsOutlinedIcon />, },
  "engineering-manager": { role: 'engineering manager', icon: <IntegrationInstructionsOutlinedIcon />, },
  "executive-assistant": { role: 'executive assistant', icon: <ChecklistOutlinedIcon />, },
  "grant-project-manager": { role: 'grant project manager', icon: <DescriptionOutlinedIcon />, },
  "grant-researcher": { role: 'grant researcher', icon: <DescriptionOutlinedIcon />, },
  "grant-writer": { role: 'grant writer', icon: <DescriptionOutlinedIcon />, },
  "graphic-designer": { role: 'graphic designer', icon: <DrawOutlinedIcon />, },
  "hr-generalist": { role: 'hr generalist', icon: <Diversity3OutlinedIcon />, },
  "information-architect": { role: 'information architect', icon: <ApartmentOutlinedIcon />, },
  "it-generalist": { role: 'it generalist', icon: <HubOutlinedIcon />, },
  "marketing-generalist": { role: 'marketing generalist', icon: <AutoStoriesOutlinedIcon />, },
  "operations-manager": { role: 'operations manager', icon: <ManageAccountsOutlinedIcon />, },
  "product-manager": { role: 'product manager', icon: <Diversity3OutlinedIcon />, },
  "project-manager": { role: 'project manager', icon: <ManageAccountsOutlinedIcon />, },
  "public-relations-lead": { role: 'public relations lead', icon: <AutoStoriesOutlinedIcon />, },
  "qa-test-engineer": { role: 'QA/test engineer', icon: <BugReportOutlinedIcon /> },
  "researcher": { role: 'researcher', icon: <ScreenSearchDesktopOutlinedIcon />, },
  "social-media-designer": { role: 'social media designer', icon: <ShareOutlinedIcon />, },
  "social-media-specialist": { role: 'social media specialist', icon: <EmojiPeopleOutlinedIcon />, },
  "software-developer": { role: 'software developer', icon: <CodeOutlinedIcon />, },
  "software-developer-back-end": { role: 'software developer back end', icon: <CodeOutlinedIcon />, },
  "software-developer-front-end": { role: 'software developer front end', icon: <CodeOutlinedIcon />, },
  "solution-architect": { role: 'solution architect', icon: <ApartmentOutlinedIcon />, },
  "storyteller-and-content-writer": { role: 'storyteller & content writer', icon: <AutoStoriesOutlinedIcon />, },
  "user-experience-researcher": { role: 'user experience researcher', icon: <ScreenSearchDesktopOutlinedIcon />, },
  "ux-ui-designer": { role: 'UX/UI designer', icon: <ScreenSearchDesktopOutlinedIcon />, },
  "volunteer": { role: 'volunteer', icon: <EmojiPeopleOutlinedIcon />, },
  "default": { icon: <PeopleOutlineOutlinedIcon /> }
}

type RolesSectionProps = {
  title: string
  columns?: number
  showLink?: boolean
  roles?: DASVolunteerRoleBasicInfo[] | String[]
  children?: ReactNode
}

const getRoleUrl = (roleKey: string) => {
  return `/volunteer_role?role=${roleKey}`
}

const RoleListing = ({
  role,
  showLink,
}: {
  role: any
  showLink?: boolean
}) => {
  const RoleBase = (
    {
      sxProps
    }: {
      sxProps?: any
    }
  ) => {
    return (
      <ListItemWithIcon
        listIcon={
          rolesMap[role.key]?.icon ||
          rolesMap[role]?.icon ||
          rolesMap['default'].icon
        }
        listText={role.role || rolesMap[role].role || null}
        sxProps={{
          alignItems: showLink ? 'flex-start' : 'center',
          ...sxProps,
        }}
      />
    )
  }
  return showLink ? (
    <Link href={`${getRoleUrl(role.key)}`} sx={{ textDecoration: 'none' }}>
      <RoleBase
        sxProps={{

          '&': {
            '&:hover': {
              background: 'linear-gradient(0deg, rgba(184, 233, 122, 0.32), rgba(184, 233, 122, 0.32))',
              border: `2px solid ${theme.palette.primary.main}`,
              boxShadow:
                '0px 8px 8px 2px rgba(52, 61, 62, 0.1), 0px 8px 4px rgba(52, 61, 62, 0.1)',
            },
          },
        }}
      />
    </Link>
  ) : (
    <RoleBase />
  )
}

const RolesSection = ({ title, showLink = false, roles = [], children }: RolesSectionProps) => {
  return (
    roles.length > 0 && (
      <Section>
        <Subheader variant="headlineMedium">{title}</Subheader>
        <Box
          sx={{
            display: 'grid',
            gridAutoFlow: 'columns',
            gridTemplateColumns: { xs: 'repeat(1), minmax(15rem, 1fr)', md: `repeat(2, minmax(15rem, 1fr))`, lg: 'repeat(3, minmax(15rem, 1fr))' },
            justifyContent: 'center',
            gap: { xs: '1rem', md: '2rem' },
            width: '100%',
          }}
        >
          {roles.map((singleRole, i) => (
            <RoleListing
              key={i}
              role={singleRole}
              showLink={showLink} />
          ))
          }
        </Box>
        {children}
      </Section>
    )
  )
}

export default RolesSection
