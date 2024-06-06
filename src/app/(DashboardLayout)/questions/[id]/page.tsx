'use client'

import { useState } from 'react'
import { Box, Button, Card, CardContent, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, ListItem, ListItemButton, ListItemText, Stack, TextField, Typography } from "@mui/material"
import axios from "@/lib/axios"
import { useMutation, useQuery } from "react-query"
import TagsView from "../../components/tags/TagsView"
import { IconClockEdit, IconClockPlus, IconEraser, IconThumbDown } from "@tabler/icons-react"
import { IconUser } from "@tabler/icons-react"
import { IconCheck } from "@tabler/icons-react"
import { IconThumbUp } from "@tabler/icons-react"
import { useRouter } from "next/navigation"
import SendIcon from '@mui/icons-material/Send'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import DashboardCard from '../../components/shared/DashboardCard'
import { IconEdit } from '@tabler/icons-react'
import TinyMCEReadOnly from '../../components/tinymce/TinyMCEReadOnly'

const validationSchema = Yup.object({
  comment_value: Yup.string().required('Komentar tidak boleh kosong')
})

const QuestionDetail = ({ params }: { params: { id: string } }) => {
  const id = params.id
  const router = useRouter()
  const [openComment, setOpenComment] = useState(false)
  const [contentId, setContentId] = useState('')

  const getToken = () => {
    const token = localStorage.getItem('token')
    return token
  }

  const formikComment = useFormik({
    initialValues: {
      comment_value: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      mutateComment({ comment_value: values.comment_value, content_id: contentId })
      // resetForm();
      console.log({ comment_value: values.comment_value, content_id: contentId })
      resetForm()
    },
  });

  // get query
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

  // post query
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

  const { mutate: mutateComment, isLoading: isLoadingComment, error: isErrorComment, isSuccess: isSuccessComment } = useMutation(async (values: any) => {
    try {
      const response = await axios.post('/api/comment', values)
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
  }

  // handler
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

  const handleCommentClick = () => {
    setOpenComment(!openComment)
  }

  return (
    <Grid container spacing={1}>
      {detailForumQuery ?
        <>
          {/* {detailForumQuery ? } */}
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
                            <Typography variant='h6' sx={{ mb: 1 }}>
                              Pertanyaan
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
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item>
                            <Typography>
                              <IconUser size={15} /> {content?.user?.username}
                            </Typography>
                            <Chip label={formatDate(content?.updated_at)} size="small" sx={{ color: "#bdad00", border: 'none' }} variant="outlined" icon={<IconClockEdit size={15} color='#bdad00' />} />
                            <Chip label={formatDate(content?.created_at)} size="small" sx={{ color: "#078500", border: 'none' }} variant="outlined" icon={<IconClockPlus size={15} color='#078500' />} />
                          </Grid>
                          <Typography variant='h4' sx={{ mt: 1, wordBreak: 'break-word' }}>
                            {detailForumQuery?.title}
                          </Typography>
                        </Grid>
                        :
                        <Grid item xs={12}>
                          <Grid container justifyContent='space-between'>
                            <Typography variant='h6' sx={{ mb: 1 }}>
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
                                            <>
                                              {!detailForumQuery.is_resolved ?
                                                <Button color="success" variant={content?.is_answer === 0 ? "outlined" : "contained"} size="small" onClick={() => handleAnswered(content.id, detailForumQuery.id)}>
                                                  Terjawab ?
                                                </Button>
                                                : null}
                                            </>
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
                        <TinyMCEReadOnly value={content?.content_value} />
                        {content.user_id === detailForumQuery?.user_id ?
                          <TagsView tags={detailForumQuery?.forum_tags} />
                          : null}
                      </Grid>
                      <Grid item xs={12}>
                        <Divider orientation='horizontal' sx={{ mb: 2 }} flexItem />
                        <form onSubmit={formikComment.handleSubmit}>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button variant="contained" onClick={() => {
                              handleCommentClick()
                              setContentId(content.id)
                            }} size="small" fullWidth>
                              Tambahkan Komentar
                            </Button>
                            <Dialog
                              open={openComment}
                              onClose={handleCommentClick}
                              PaperProps={{
                                component: 'form',
                                onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                                  event.preventDefault();
                                  const formData = new FormData(event.currentTarget);
                                  const formJson = Object.fromEntries((formData as any).entries());
                                  handleCommentClick()
                                },
                              }}
                            >
                              <DialogTitle>Tambahkan komentar anda</DialogTitle>
                              <DialogContent>
                                <TextField
                                  margin="dense"
                                  id="comment_value"
                                  name="comment_value"
                                  label="Komentar"
                                  fullWidth
                                  variant="standard"
                                  onChange={formikComment.handleChange}
                                  value={formikComment.values.comment_value}
                                  error={formikComment.touched.comment_value && Boolean(formikComment.errors.comment_value)}
                                  helperText={formikComment.touched.comment_value && formikComment.errors.comment_value}
                                />
                              </DialogContent>
                              <DialogActions>
                                <Button onClick={handleCommentClick}>Batal</Button>
                                <Button type="submit">Kirim</Button>
                              </DialogActions>
                            </Dialog>
                          </Box>
                        </form>
                      </Grid>
                      <Grid item xs={12}>
                        <Box sx={{ width: '100%', maxHeight: 300, overflowY: 'auto' }}>
                          {content.comments?.map((comment: any, index: number) => (
                            <div key={index}>
                              {comment ?
                                <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                                  <TextField
                                    key={index}
                                    multiline
                                    id="outlined-read-only-input"
                                    defaultValue=""
                                    value={`${comment?.user.username} : ${comment?.comment_value}`}
                                    InputProps={{
                                      readOnly: true,
                                    }}
                                    variant="outlined"
                                    fullWidth
                                  />
                                  <Stack direction="column" spacing={1}>
                                    <Button variant='outlined' size="small" color="success"><IconEdit size={15} /></Button>
                                    <Button variant='outlined' size="small" color="error"><IconEraser size={15} /></Button>
                                  </Stack>
                                </Stack>
                                : null}
                            </div>
                          ))}
                        </Box>
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