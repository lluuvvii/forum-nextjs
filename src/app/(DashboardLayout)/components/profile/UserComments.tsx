import React from 'react'
import { Typography, Box, Skeleton } from '@mui/material'
import DashboardCard from '../shared/DashboardCard'

const UserComments = () => {
  return (
    <DashboardCard title="Komentar Saya" subtitle="Komentar Forum anda">
      <Box sx={{ height: 200, maxHeight: 200, overflowY: 'auto' }}>
        <Typography variant="h1"> <Skeleton animation="wave" width="100%" /> </Typography>
        <Typography variant="h1"> <Skeleton animation="wave" width="100%" /> </Typography>
        <Typography variant="h1"> <Skeleton animation="wave" width="100%" /> </Typography>
        <Typography variant="h1"> <Skeleton animation="wave" width="100%" /> </Typography>
        <Typography variant="h1"> <Skeleton animation="wave" width="100%" /> </Typography>
      </Box>
    </DashboardCard>
  )
}

export default UserComments