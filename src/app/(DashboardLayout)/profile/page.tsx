'use client'
import { Typography } from '@mui/material'
import PageContainer from "../components/container/PageContainer"
import DashboardCard from "../components/shared/DashboardCard"

const Profile = () => {
  return (
    <PageContainer>
      <DashboardCard title='Profile'>
        <Typography>Data example</Typography>
      </DashboardCard>
    </PageContainer>
  )
}

export default Profile