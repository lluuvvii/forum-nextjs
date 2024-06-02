'use client'

import { Card, CardContent, Chip, Divider, Grid, Stack, TextField, Typography } from "@mui/material"
import axios from "@/lib/axios"
import { useQuery } from "react-query"
import TagsView from "../../components/tags/TagsView"
import { IconClockPlus } from "@tabler/icons-react"

const QuestionDetail = ({ params }: { params: { id: string } }) => {
  const id = params.id

  const { data: detailForumQuery, refetch: refetchForumQuery, isLoading: isLoadingForumQuery } = useQuery({
    queryKey: ['forum-detail', id],
    queryFn: async () => {
      const response = await axios.get(`/api/forum/${id}`)

      // console.log(response.data.data)

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
                          <Typography variant='h3'>
                            {detailForumQuery?.title} <Chip label={formatDate(detailForumQuery?.created_at)} size="small" sx={{ color: "#078500", borderColor: "#078500" }} variant="outlined" icon={<IconClockPlus size={15} color='#078500' />} />
                          </Typography>
                        </Grid>
                        :
                        <Grid item xs={12}>
                          <Typography variant='h3'>
                            Jawaban
                          </Typography>
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