'use client'

import React, { useState, useEffect } from 'react'

import TagsView from '../tags/TagsView'
import DashboardCard from '../shared/DashboardCard'
import { Card, CardContent, Stack, Typography, Grid, Box, CircularProgress, Chip } from '@mui/material'
import axios from '@/lib/axios'
import Link from 'next/link'
import { IconClockPlus } from '@tabler/icons-react'
import { useQuery } from 'react-query'
import { IconClockEdit } from '@tabler/icons-react'
import { IconUser } from '@tabler/icons-react'

const AllQuestions = () => {
  const [token, setToken] = useState<any>(null)
  const { data: forumQuery, refetch: refetchForumQuery, isLoading: isLoadingForumQuery } = useQuery({
    queryKey: ['forum-data'],
    queryFn: async () => {
      const response = await axios.get('/api/forum')

      return response.data.data
    }
  })

  const { data: userLoginQuery } = useQuery({
    queryKey: ['user-login-data'],
    queryFn: async () => {
      const response = await axios.get('/api/user')

      return response.data.data
    }
  })

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }) + ' ' + date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, [])


  return (
    <DashboardCard title='Semua Pertanyaan'>
      {isLoadingForumQuery && (
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
      {forumQuery?.map((question: any, index: any) => (
        <Grid key={index} container spacing={2}>
          <Grid item xs={12}>
            <Card variant='outlined'>
              <CardContent>
                <Stack
                  direction="column"
                  spacing={2}
                >
                  <Link href={`/questions/${question.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                    <Typography variant='h6' sx={{ mb: 2, wordBreak: 'break-word' }}>
                      {userLoginQuery?.id === question?.user_id && token ?
                        <Typography sx={{ mb: 1 }}>
                          <Typography>
                          <IconUser size={15} /> Pertanyaan saya : {userLoginQuery?.username}
                          </Typography>
                          <Chip label={formatDate(question?.created_at)} size="small" sx={{ color: "#078500", borderColor: "#078500" }} variant="outlined" icon={<IconClockPlus size={15} color='#078500' />} />
                          <Chip label={formatDate(question?.updated_at)} size="small" sx={{ color: "#bdad00", borderColor: "#bdad00" }} variant="outlined" icon={<IconClockEdit size={15} color='#bdad00' />} />
                        </Typography>
                        : <Typography sx={{ mb: 1 }}>
                          <Typography>
                            <IconUser size={15} /> {question?.user.username}
                          </Typography>
                          <Chip label={formatDate(question?.created_at)} size="small" sx={{ color: "#078500", borderColor: "#078500" }} variant="outlined" icon={<IconClockPlus size={15} color='#078500' />} />
                          <Chip label={formatDate(question?.updated_at)} size="small" sx={{ color: "#bdad00", borderColor: "#bdad00" }} variant="outlined" icon={<IconClockEdit size={15} color='#bdad00' />} />
                        </Typography>}
                      {question?.title}
                    </Typography>
                    <TagsView tags={question.forum_tags} />
                  </Link>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ))}
    </DashboardCard>
  )
}

export default AllQuestions