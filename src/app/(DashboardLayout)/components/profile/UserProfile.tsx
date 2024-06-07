import React from 'react'
import { Avatar, Divider, Grid, Stack, Typography, Button, Box } from '@mui/material'
import DashboardCard from '../shared/DashboardCard'
import { IconCalendarTime, IconEditOff, IconEdit } from '@tabler/icons-react'

const UserProfile = () => {
  return (
    <DashboardCard title="Profil" subtitle="Data Pribadi anda">
      <Box sx={{ height: { xs: 350, md: 200 }, maxHeight: { xs: 400, md: 200 }, overflowY: 'auto' }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          divider={<Divider orientation="vertical" sx={{ borderWidth: '2px' }} flexItem />}
          spacing={2}
          alignItems="center"
        >
          <Stack direction="column" spacing={2} alignItems="center">
            <Avatar sx={{ width: 100, height: 100, bgcolor: '#ff9d00' }}>L</Avatar>
            <Button variant="contained" size="small">
              <IconEdit size={15} style={{ marginRight: '5px' }} />
              Edit Profil
            </Button>
          </Stack>
          <Grid item>
            <Stack direction="column" spacing={2}>
              <Stack direction="row" spacing={2}>
                <Stack direction="column" spacing={1}>
                  <Typography variant="h6">Nickname</Typography>
                  <Typography variant="h6">Username</Typography>
                  <Typography variant="h6">Email</Typography>
                </Stack>
                <Stack direction="column" spacing={1}>
                  <Typography variant="h6" sx={{ wordBreak: 'break-word' }}>luvi</Typography>
                  <Typography variant="h6" sx={{ wordBreak: 'break-word' }}>lluuvvii</Typography>
                  <Typography variant="h6" sx={{ wordBreak: 'break-word' }}>luvi@gmail.com</Typography>
                </Stack>
              </Stack>
              <Stack direction="column" spacing={1}>
                <Stack direction="row" alignItems="center">
                  <IconCalendarTime style={{ marginRight: 4, color: 'darkcyan' }} size={20} />
                  <Typography sx={{ wordBreak: 'break-word' }}>Bergabung Sejak 2024-05-20</Typography>
                </Stack>
                <Stack direction="row" alignItems="center">
                  <IconEditOff style={{ marginRight: 4, color: 'green' }} size={20} />
                  <Typography sx={{ wordBreak: 'break-word' }}>Diupdate Pada 2024-05-20</Typography>
                </Stack>
              </Stack>
            </Stack>
          </Grid>
        </Stack>
      </Box>
    </DashboardCard>
  )
}

export default UserProfile