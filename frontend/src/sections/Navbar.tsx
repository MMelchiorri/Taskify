'use client'

import Link from 'next/link'
import styles from '@/styles/navbar.module.css'
import { HomeFilled, FormatListBulleted, Person } from '@mui/icons-material'
import { Box } from '@mui/material'
import { Inter } from 'next/font/google'
import { useTranslations } from 'next-intl'

const inter = Inter({ subsets: ['latin'], weight: ['200'] })

export function Navbar() {
  const t = useTranslations('Todos')
  return (
    <nav className={`${styles.navbar} ${inter.className} `}>
      <div className={`${styles.container}`}>
        <div className={`${styles.innerContainer}`}>
          <Link className={styles.link} href={'/'}>
            <Box
              display={'flex'}
              flexDirection={'column'}
              alignItems={'center'}
              gap={1}
            >
              <HomeFilled fontSize={'small'} sx={{ color: '#1D1B20' }} />
              <label className={`${styles.title}`}>{t('navbar.home')}</label>
            </Box>
          </Link>
          <Link className={`${styles.link}`} href="/todos">
            <Box
              display={'flex'}
              flexDirection={'column'}
              alignItems={'center'}
              gap={1}
            >
              <FormatListBulleted
                fontSize={'small'}
                sx={{ color: '#1D1B20' }}
              />
              <label className={`${styles.title}`}>{t(`navbar.todo`)}</label>
            </Box>
          </Link>
          <Link className={`${styles.link}`} href="/users">
            <Box
              display={'flex'}
              flexDirection={'column'}
              alignItems={'center'}
              gap={1}
            >
              <Person fontSize={'small'} sx={{ color: '#1D1B20' }} />
              <label className={`${styles.title}`}>
                {t(`navbar.userProfile`)}
              </label>
            </Box>
          </Link>
        </div>
      </div>
    </nav>
  )
}
