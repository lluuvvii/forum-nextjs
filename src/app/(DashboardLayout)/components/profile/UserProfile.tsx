'use client'

import React from 'react'
import { Avatar, Divider, Grid, Stack, Typography, Button, Box, CircularProgress, Collapse } from '@mui/material'
import DashboardCard from '../shared/DashboardCard'
import { IconCalendarTime, IconEditOff, IconEdit, IconUser } from '@tabler/icons-react'
import axios from '@/lib/axios'
import { useQuery } from 'react-query'

const UserProfile = () => {
  const { data: userLoginQuery } = useQuery({
    queryKey: ['user-login-data'],
    queryFn: async () => {
      const response = await axios.get('/api/user')

      return response.data.data
    }
  })

  const { data: userDetailQuery, isLoading: isLoadingUserDetailQuery, isSuccess: isSuccessUserDetailQuery } = useQuery({
    queryKey: ['user-detail-data', userLoginQuery?.id],
    queryFn: async () => {
      const response = await axios.get(`/api/user/${userLoginQuery?.id}`)

      return response.data.data
    }
  })

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }) + ' ' + date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  return (
    <DashboardCard title="Profil" subtitle="Data Pribadi anda">
      <>
        {isLoadingUserDetailQuery && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            width="100%"
            // position="absolute"
            top={0}
            left={0}
            bgcolor="rgba(255, 255, 255, 0.8)"
          // zIndex={1}
          >
            <CircularProgress />
          </Box>
        )}
      </>
      <Collapse in={isSuccessUserDetailQuery} timeout={1000}>
        <Box sx={{ height: { xs: 350, md: 200 }, maxHeight: { xs: 400, md: 200 }, overflowY: 'auto' }}>
          {isLoadingUserDetailQuery && (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              width="100%"
              // position="absolute"
              top={0}
              left={0}
              bgcolor="rgba(255, 255, 255, 0.8)"
            // zIndex={1}
            >
              <CircularProgress />
            </Box>
          )}
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            divider={<Divider orientation="vertical" sx={{ borderWidth: '2px' }} flexItem />}
            spacing={2}
            alignItems="center"
          >
            <Stack direction="column" spacing={2} alignItems="center">
              <Avatar sx={{ width: 100, height: 100 }}><IconUser size={50} /></Avatar>
              <Button variant="contained" size="small">
                <IconEdit size={15} style={{ marginRight: '5px' }} />
                Edit Profil
              </Button>
            </Stack>
            <Grid item>
              <Stack direction="column" spacing={2}>
                <Stack direction="row" spacing={2}>
                  <Stack direction="column" spacing={1}>
                    <Typography variant="h6">Name</Typography>
                    <Typography variant="h6">Username</Typography>
                    <Typography variant="h6">Email</Typography>
                  </Stack>
                  <Stack direction="column" spacing={1}>
                    <Typography variant="h6" sx={{ wordBreak: 'break-word' }}>{userDetailQuery?.name}</Typography>
                    <Typography variant="h6" sx={{ wordBreak: 'break-word' }}>{userDetailQuery?.username}</Typography>
                    <Typography variant="h6" sx={{ wordBreak: 'break-word' }}>{userDetailQuery?.email}</Typography>
                  </Stack>
                </Stack>
                <Stack direction="column" spacing={1}>
                  <Stack direction="row" alignItems="center">
                    <IconCalendarTime style={{ marginRight: 4, color: 'darkcyan' }} size={20} />
                    <Typography sx={{ wordBreak: 'break-word' }}>Bergabung Sejak : {formatDate(userDetailQuery?.created_at)}</Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center">
                    <IconEditOff style={{ marginRight: 4, color: 'green' }} size={20} />
                    <Typography sx={{ wordBreak: 'break-word' }}>Diupdate Pada : {formatDate(userDetailQuery?.created_at)}</Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Grid>
          </Stack>
        </Box>
      </Collapse>
    </DashboardCard>
  )
}

export default UserProfile