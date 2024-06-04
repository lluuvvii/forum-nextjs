'use client'

import { Button, Card, CardContent, Chip, Divider, Grid, Stack, TextField, Typography } from "@mui/material"
import axios from "@/lib/axios"
import { useQuery } from "react-query"
import TagsView from "../../components/tags/TagsView"
import { IconClockEdit, IconClockPlus, IconThumbDown, IconX } from "@tabler/icons-react"
import { IconUser } from "@tabler/icons-react"
import { IconCheck } from "@tabler/icons-react"
import { IconThumbUp } from "@tabler/icons-react"
const QuestionDetail = ({ params }: { params: { id: string } }) => {
  const id = params.id

  const getToken = () => {
    const token = localStorage.getItem('token')
    return token
  }

  const { data: detailForumQuery, refetch: refetchForumQuery, isLoading: isLoadingForumQuery } = useQuery({
    queryKey: ['forum-detail', id],
    queryFn: async () => {
      const response = await axios.get(`/api/forum/${id}`)

      // console.log(response.data.data)

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
  };

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
                          <Typography>
                            <IconUser size={15} /> {content?.user?.username}
                          </Typography>
                          <Chip label={formatDate(content?.updated_at)} size="small" sx={{ color: "#bdad00", border: 'none' }} variant="outlined" icon={<IconClockEdit size={15} color='#bdad00' />} />
                          <Chip label={formatDate(content?.created_at)} size="small" sx={{ color: "#078500", border: 'none' }} variant="outlined" icon={<IconClockPlus size={15} color='#078500' />} />
                          <Typography variant='h3' sx={{ mb: 1, wordBreak: 'break-word' }}>
                            {detailForumQuery?.title}
                          </Typography>
                        </Grid>
                        :
                        <Grid item xs={12}>
                          <Grid container justifyContent='space-between'>
                            <Typography variant='h3' sx={{ mb: 1 }}>
                              Jawaban
                            </Typography>
                            {userLoginQuery?.id === detailForumQuery?.user_id && getToken() ?
                              <Grid item>
                                <Grid container spacing={1}>
                                  <Grid item>
                                    <Button color="primary" variant="outlined" size="small">
                                      {content?.up_votes.length} <IconThumbUp size={15} />
                                    </Button>
                                  </Grid>
                                  <Grid item>
                                    <Button color="error" variant="outlined" size="small">
                                      <IconThumbDown size={15} /> {content?.down_votes.length}
                                    </Button>
                                  </Grid>
                                  <Grid item>
                                    <Button color={content?.is_answer === 1 ? "error" : "success"} variant="outlined" size="small">
                                      {content?.is_answer === 1 ?
                                        <>Tandai sebagai selesai</>
                                        :
                                        <>
                                          Selesai <IconCheck size={15} />
                                        </>
                                      }
                                    </Button>
                                  </Grid>
                                </Grid>
                              </Grid>
                              : null}
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
    </Grid>
  )
}

export default QuestionDetail