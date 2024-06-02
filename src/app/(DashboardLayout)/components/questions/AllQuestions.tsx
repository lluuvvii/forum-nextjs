'use client'

import React from 'react'

import TagsView from '../tags/TagsView'
import DashboardCard from '../shared/DashboardCard'
import { Card, CardContent, Stack, Typography, Grid, Box, CircularProgress, Chip } from '@mui/material'
import axios from '@/lib/axios'
import Link from 'next/link'
import { IconClockPlus } from '@tabler/icons-react'
import { useQuery } from 'react-query'

const AllQuestions = () => {
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
                    <Typography variant='h6' sx={{ mb: 2 }}>
                      {userLoginQuery?.id === question?.user_id ?
                        <Typography sx={{ mb: 1 }}>
                          Pertanyaan saya : {userLoginQuery?.username} <Chip label={formatDate(question?.created_at)} size="small" sx={{ color: "#078500", borderColor: "#078500" }} variant="outlined" icon={<IconClockPlus size={15} color='#078500' />} />
                        </Typography>
                        : <Typography sx={{ mb: 1 }}>
                          User : {question?.username ? question?.username : '...'} <Chip label={formatDate(question?.created_at)} size="small" sx={{ color: "#078500", borderColor: "#078500" }} variant="outlined" icon={<IconClockPlus size={15} color='#078500' />} />
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