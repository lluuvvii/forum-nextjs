'use client'

import React, { useState, useEffect } from 'react'

import TagsView from '../tags/TagsView'
import DashboardCard from '../shared/DashboardCard'
import { Card, CardContent, Stack, Typography, Grid, Box, CircularProgress, Chip, Button, Collapse } from '@mui/material'
import axios from '@/lib/axios'
import Link from 'next/link'
import { IconCheck, IconClockPlus, IconX } from '@tabler/icons-react'
import { useQuery } from 'react-query'
import { IconClockEdit } from '@tabler/icons-react'
import { IconUser } from '@tabler/icons-react'

const AllQuestions = () => {
  const [token, setToken] = useState<any>(null)
  const { data: forumQuery, refetch: refetchForumQuery, isLoading: isLoadingForumQuery, isSuccess: isSuccessForumQuery } = useQuery({
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
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }) + ' ' + date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, [])


  return (
    <DashboardCard title='Semua Pertanyaan'>
      <>
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
      </>
      <Collapse in={isSuccessForumQuery} timeout={1000}>
        <Box sx={{ maxHeight: 500, overflowY: 'auto' }}>
          {forumQuery?.map((question: any, index: any) => (
            <Grid key={index} container spacing={2}>
              <Grid item xs={12}>
                <Card variant='outlined'>
                  <CardContent>
                    <Stack
                      direction="column"
                      spacing={2}
                    >
                      {userLoginQuery?.id === question?.user_id && token ?
                        <Typography sx={{ mb: 1 }}>
                          <Grid container justifyContent='space-between'>
                            <Typography>
                              <IconUser size={15} /> Pertanyaan saya : {userLoginQuery?.username}
                            </Typography>
                            <Button color="success" variant={question?.is_resolved === 0 ? "outlined" : "contained"} size="small">
                              {question?.is_resolved === 0 ?
                                <>
                                  Belum selesai
                                </>
                                :
                                <>
                                  Selesai <IconCheck size={15} />
                                </>}
                            </Button>
                          </Grid>
                          <Chip label={formatDate(question?.created_at)} size="small" sx={{ color: "#078500", border: 'none' }} variant="outlined" icon={<IconClockPlus size={15} color='#078500' />} />
                          <Chip label={formatDate(question?.updated_at)} size="small" sx={{ color: "#bdad00", border: 'none' }} variant="outlined" icon={<IconClockEdit size={15} color='#bdad00' />} />
                        </Typography>
                        : <Typography sx={{ mb: 1 }}>
                          <Grid container justifyContent='space-between'>
                            <Typography>
                              <IconUser size={15} /> {question?.user.username}
                            </Typography>
                            <Button color="success" variant={question?.is_resolved === 0 ? "outlined" : "contained"} size="small">
                              {question?.is_resolved === 0 ?
                                <>
                                  Belum selesai
                                </>
                                :
                                <>
                                  Selesai <IconCheck size={15} />
                                </>}
                            </Button>
                          </Grid>
                          <Chip label={formatDate(question?.created_at)} size="small" sx={{ color: "#078500", border: 'none' }} variant="outlined" icon={<IconClockPlus size={15} color='#078500' />} />
                          <Chip label={formatDate(question?.updated_at)} size="small" sx={{ color: "#bdad00", border: 'none' }} variant="outlined" icon={<IconClockEdit size={15} color='#bdad00' />} />
                        </Typography>}
                      <Link href={`/questions/${question.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                        <Typography variant='h6' sx={{ mb: 1, wordBreak: 'break-word' }}>
                          {question?.title}
                        </Typography>
                      </Link>
                      <TagsView tags={question.forum_tags} />
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          ))}
        </Box>
      </Collapse>
    </DashboardCard>
  )
}

export default AllQuestions