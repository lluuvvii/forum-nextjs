'use client'

import { Button, Card, CardContent, Chip, Grid, Stack, TextField, Typography } from "@mui/material"
import axios from "@/lib/axios"
import { useMutation, useQuery } from "react-query"
import TagsView from "../../components/tags/TagsView"
import { IconClockEdit, IconClockPlus, IconThumbDown, IconX } from "@tabler/icons-react"
import { IconUser } from "@tabler/icons-react"
import { IconCheck } from "@tabler/icons-react"
import { IconThumbUp } from "@tabler/icons-react"
import { useRouter } from "next/navigation"
const QuestionDetail = ({ params }: { params: { id: string } }) => {
  const id = params.id
  const router = useRouter()

  const getToken = () => {
    const token = localStorage.getItem('token')
    return token
  }

  const { data: detailForumQuery, refetch: refetchDetailForumQuery, isLoading: isLoadingDetailForumQuery } = useQuery({
    queryKey: ['forum-detail', id],
    queryFn: async () => {
      const response = await axios.get(`/api/forum/${id}`)

      // console.log(response.data.data)

      return response.data.data
    }
  })

  const { data: userLoginQuery, refetch: refetchUserLogin } = useQuery({
    queryKey: ['user-login-data'],
    queryFn: async () => {
      const response = await axios.get('/api/user')

      return response.data.data
    }
  })

  const { mutate: mutateSolved, isLoading: isLoadingSolved, error: isErrorSolved, isSuccess: isSuccessSolved } = useMutation(async (values: any) => {
    try {
      const response = await axios.post('/api/forum/mark', values)
      if (response.status === 200) {
        refetchDetailForumQuery()
        refetchUserLogin()
      }

      // return response.data
    } catch (err: any) {
      throw new Error(err.response.data.message)
    }
  })

  const { mutate: mutateUpVote, isLoading: isLoadingUpVote, error: isErrorUpVote, isSuccess: isSuccessUpVote } = useMutation(async (values: any) => {
    try {
      const response = await axios.post('/api/content/upvote', values)
      if (response.status === 200) {
        refetchDetailForumQuery()
        refetchUserLogin()
      }

      // return response.data
    } catch (err: any) {
      throw new Error(err.response.data.message)
    }
  })

  const { mutate: mutateDownVote, isLoading: isLoadingDownVote, error: isErrorDownVote, isSuccess: isSuccessDownVote } = useMutation(async (values: any) => {
    try {
      const response = await axios.post('/api/content/downvote', values)
      if (response.status === 200) {
        refetchDetailForumQuery()
        refetchUserLogin()
      }

      // return response.data
    } catch (err: any) {
      throw new Error(err.response.data.message)
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
  };

  const handleAnswered = (id: number | string, forumId: number | string) => {
    if (!userLoginQuery) {
      router.push('/authentication/login')
      return
    }
    if (!getToken()) {
      router.push('/authentication/login')
      return
    }

    mutateSolved({ content_id: id, forum_id: forumId })
  }

  const handleUpVote = (id: number | string, voteType: string) => {
    if (!userLoginQuery) {
      router.push('/authentication/login')
      return
    }
    if (!getToken()) {
      router.push('/authentication/login')
      return
    }

    mutateUpVote({ content_id: id, vote_type: voteType })
  }

  const handleDownVote = (id: number | string, voteType: string) => {
    if (!userLoginQuery) {
      router.push('/authentication/login')
      return
    }
    if (!getToken()) {
      router.push('/authentication/login')
      return
    }

    mutateDownVote({ content_id: id, vote_type: voteType })
  }

  return (
    <Grid container spacing={1}>
      {detailForumQuery ?
        <>
          {detailForumQuery?.contents?.map((content: any, index: any) => (
            <Grid key={index} item xs={12}>
              <Card variant='outlined'>
                <CardContent>
                  <Stack
                    direction="column"
                    spacing={2}
                  >
                    <Grid container spacing={1}>
                      {content.user_id === detailForumQuery?.user_id ?
                        <Grid item xs={12}>
                          <Grid container spacing={1} justifyContent='space-between'>
                            <Grid item>
                              <Typography>
                                <IconUser size={15} /> {content?.user?.username}
                              </Typography>
                              <Chip label={formatDate(content?.updated_at)} size="small" sx={{ color: "#bdad00", border: 'none' }} variant="outlined" icon={<IconClockEdit size={15} color='#bdad00' />} />
                              <Chip label={formatDate(content?.created_at)} size="small" sx={{ color: "#078500", border: 'none' }} variant="outlined" icon={<IconClockPlus size={15} color='#078500' />} />
                            </Grid>
                            <Grid item>
                              <Grid container spacing={1}>
                                <Grid item>
                                  <Button color="primary" variant="outlined" size="small" onClick={() => handleUpVote(content.id, "up")}>
                                    {content?.up_votes.length} <IconThumbUp size={15} />
                                  </Button>
                                </Grid>
                                <Grid item>
                                  <Button color="error" variant="outlined" size="small" onClick={() => handleDownVote(content.id, "down")}>
                                    <IconThumbDown size={15} /> {content?.down_votes.length}
                                  </Button>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Typography variant='h3' sx={{ mt: 1, wordBreak: 'break-word' }}>
                            {detailForumQuery?.title}
                          </Typography>
                        </Grid>
                        :
                        <Grid item xs={12}>
                          <Grid container justifyContent='space-between'>
                            <Typography variant='h3' sx={{ mb: 1 }}>
                              Jawaban
                            </Typography>
                            <Grid item>
                              <Grid container spacing={1}>
                                <Grid item>
                                  <Button color="primary" variant="outlined" size="small" onClick={() => handleUpVote(content.id, "up")}>
                                    {content?.up_votes.length} <IconThumbUp size={15} />
                                  </Button>
                                </Grid>
                                <Grid item>
                                  <Button color="error" variant="outlined" size="small" onClick={() => handleDownVote(content.id, "down")}>
                                    <IconThumbDown size={15} /> {content?.down_votes.length}
                                  </Button>
                                </Grid>
                                <Grid item>
                                  {content?.is_answer === 0 ?
                                    <>
                                      {userLoginQuery?.id === detailForumQuery?.user_id ?
                                        <>
                                          {getToken() ?
                                            <Button color="success" variant={content?.is_answer === 0 ? "outlined" : "contained"} size="small" onClick={() => handleAnswered(content.id, detailForumQuery.id)}>
                                              Terjawab ?
                                            </Button>
                                            : null}
                                        </>
                                        : null}
                                    </>
                                    :
                                    <Button color="success" variant={content?.is_answer === 0 ? "outlined" : "contained"} size="small" onClick={() => handleAnswered(content.id, detailForumQuery.id)}>
                                      Selesai <IconCheck size={15} />
                                    </Button>
                                  }
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Typography>
                            <IconUser size={15} /> {content?.user?.username}
                          </Typography>
                          <Chip label={formatDate(content?.updated_at)} size="small" sx={{ color: "#bdad00", border: 'none' }} variant="outlined" icon={<IconClockEdit size={15} color='#bdad00' />} />
                          <Chip label={formatDate(content?.created_at)} size="small" sx={{ color: "#078500", border: 'none' }} variant="outlined" icon={<IconClockPlus size={15} color='#078500' />} />
                        </Grid>}
                      <Grid item xs={12}>
                        <div dangerouslySetInnerHTML={{ __html: content?.content_value }} />
                        {content.user_id === detailForumQuery?.user_id ?
                          <TagsView tags={detailForumQuery?.forum_tags} />
                          : null}
                      </Grid>
                      <Grid item xs={12}>
                        <TextField variant='outlined' fullWidth placeholder='Tambahkan Komentar' size='small' />
                      </Grid>
                    </Grid>
                  </Stack>
                </CardContent>
              </Card >
            </Grid>
          ))}
        </>
        : null}
    </Grid >
  )
}

export default QuestionDetail