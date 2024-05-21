'use client'

import { Avatar, Divider, Grid, Stack, Typography, colors, Card, CardContent, Button, Skeleton } from '@mui/material'
import PageContainer from "../components/container/PageContainer"
import DashboardCard from "../components/shared/DashboardCard"
import { IconCalendarTime } from '@tabler/icons-react'
import { IconEditOff } from '@tabler/icons-react'

const Profile = () => {
  return (
    <PageContainer>
      <Stack direction='column' spacing={3}>
        <Stack direction='row' spacing={3}>
          <DashboardCard title='Profile' subtitle='Data Pribadi anda'>
            <Card variant='outlined'>
              <CardContent>
                <Stack
                  direction="row"
                  divider={<Divider orientation="vertical" sx={{ borderWidth: '2px' }} flexItem />}
                  spacing={2}
                >
                  <Stack direction="column" spacing={2}>
                    <Avatar sx={{ bgcolor: colors.deepOrange[500], width: 100, height: 100 }}>L</Avatar>
                    <Button variant='contained' size='small'>Edit Profile</Button>
                  </Stack>
                  <Stack direction="column" spacing={2}>
                    <Stack direction="row" spacing={2}>
                      <Stack direction="column" spacing={2}>
                        <Typography variant='h6'>Nickname</Typography>
                        <Typography variant='h6'>Username</Typography>
                        <Typography variant='h6'>Email</Typography>
                      </Stack>
                      <Stack direction="column" spacing={2}>
                        <Typography variant='h6'>luvi</Typography>
                        <Typography variant='h6'>lluuvvii</Typography>
                        <Typography variant='h6'>luvi@gmail.com</Typography>
                      </Stack>
                    </Stack>
                    <Stack direction="row" spacing={2}>
                      <Stack direction="row">
                        <Typography>Bergabung Sejak 2024-05-20</Typography>
                        <IconCalendarTime style={{ marginLeft: 4, color: 'darkcyan' }} size={20} />
                      </Stack>
                      <Stack direction="row">
                        <Typography>Diupdate Pada 2024-05-20</Typography>
                        <IconEditOff style={{ marginLeft: 4, color: 'green' }} size={20} />
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </DashboardCard>
          <DashboardCard title='Komentar Saya' subtitle='Komentar pada konten pertanyaan'>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant='h2'>
                  <Skeleton animation="wave" />
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant='h2'>
                  <Skeleton animation="wave" />
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant='h2'>
                  <Skeleton animation="wave" />
                </Typography>
              </Grid>
            </Grid>
          </DashboardCard>
        </Stack>
        <DashboardCard title='test'></DashboardCard>
      </Stack >
    </PageContainer >
  )
}

export default Profile