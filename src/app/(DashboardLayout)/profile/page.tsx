'use client'

import { Avatar, Divider, Grid, Stack, Typography, colors, Card, CardContent, Button, Skeleton, Box } from '@mui/material'
import PageContainer from "../components/container/PageContainer"
import DashboardCard from "../components/shared/DashboardCard"
import { IconCalendarTime } from '@tabler/icons-react'
import { IconEditOff } from '@tabler/icons-react'

const Profile = () => {
  return (
    <PageContainer>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={8}>
              <DashboardCard title="Profile" subtitle="Data Pribadi anda">
                <Box sx={{ height: { xs: 350, md: 200 }, maxHeight: { xs: 400, md: 200 }, overflowY: 'auto' }}>
                  <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    divider={<Divider orientation="vertical" sx={{ borderWidth: '2px' }} flexItem />}
                    spacing={2}
                    alignItems="center"
                  >
                    <Stack direction="column" spacing={2} alignItems="center">
                      <Avatar sx={{ bgcolor: colors.deepOrange[500], width: 100, height: 100 }}>L</Avatar>
                      <Button variant="contained" size="small">
                        Edit Profile
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
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <DashboardCard title="Komentar Saya" subtitle="Komentar Forum anda">
                <Box sx={{ height: 200, maxHeight: 200, overflowY: 'auto' }}>
                  <Typography variant="h1">
                    <Skeleton animation="wave" width="100%" />
                  </Typography>
                  <Typography variant="h1">
                    <Skeleton animation="wave" width="100%" />
                  </Typography>
                  <Typography variant="h1">
                    <Skeleton animation="wave" width="100%" />
                  </Typography>
                  <Typography variant="h1">
                    <Skeleton animation="wave" width="100%" />
                  </Typography>
                  <Typography variant="h1">
                    <Skeleton animation="wave" width="100%" />
                  </Typography>
                </Box>
              </DashboardCard>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </PageContainer>
  )
}

export default Profile