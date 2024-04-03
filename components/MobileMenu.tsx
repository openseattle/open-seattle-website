/*
 * Masthead.tsx
 * @2023 Digital Aid Seattle
 */

import {
  Stack,
  useTheme,
} from '@mui/material'

import { ReactNode } from 'react'

type MobileMenuProps = {
  children: ReactNode;
  yTranslate: string;
}

const MobileMenu = ({ children, yTranslate }: MobileMenuProps) => {
  const theme = useTheme()

  return (
  <Stack sx={{
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    gap: '1.5rem',
    paddingY: '2.5rem',
    backgroundColor: theme.palette.primary.main,
    borderBottom: `2px solid ${theme.palette.text.primary}`,
    transform: `translateY(${yTranslate})`,
    transition: 'all 0.4s ease-in-out',
    zIndex: '-100'
}}>
    {children}
  </Stack>

  )
}

export default MobileMenu;