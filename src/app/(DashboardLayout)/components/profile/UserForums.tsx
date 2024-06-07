'use client'

import React from 'react'
import { Typography, Box, CircularProgress, Stack, Divider, Collapse } from '@mui/material'
import DashboardCard from '../shared/DashboardCard'
import { useQuery } from 'react-query'
import axios from '@/lib/axios'

const UserForums = () => {
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

  return (
    <DashboardCard title="Pertanyaan Saya" subtitle="Pertanyaan yang telah anda input">
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
        <Box sx={{ height: 200, maxHeight: 200, overflowY: 'auto' }}>
          <Stack direction="column" spacing={1} divider={<Divider orientation='horizontal' flexItem />}>
            {userDetailQuery?.forums?.map((forum: any, index: any) => (
              <Typography key={index}>{forum.title}</Typography>
            ))}
          </Stack>
        </Box>
      </Collapse>
    </DashboardCard>
  )
}

export default UserForums