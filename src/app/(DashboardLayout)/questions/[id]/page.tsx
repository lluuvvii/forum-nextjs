'use client'

import { Card, CardContent, Divider, Stack, Typography } from "@mui/material"
import DashboardCard from "../../components/shared/DashboardCard"
import { useRouter } from "next/router"
import axios from "@/lib/axios"
import { useQuery } from "react-query"

const QuestionDetail = ({ params }: { params: { slug: string } }) => {
  const id = params.slug

  const { data: detailForumQuery, refetch: refetchForumQuery, isLoading: isLoadingForumQuery } = useQuery({
    queryKey: ['forum-detail', id],
    queryFn: async () => {
      const response = await axios.get(`api/forum/?id=${id}`)

      console.log(response.data.data)

      return response.data.data
    }
  })
  return (
    <DashboardCard title="Pertanyaan">
      <Card sx={{ mb: 3 }} variant='outlined'>
        <CardContent>
          <Stack
            direction="column"
            divider={<Divider orientation="horizontal" sx={{ borderWidth: '2px' }} flexItem />}
            spacing={2}
          >
            <Typography variant='h3'>
              {/* {question?.title} */}
            </Typography>
            {/* <Grid item> */}
            {/* <div dangerouslySetInnerHTML={{ __html: question?.content }} />
                    <TagsView tags={question?.tags} handleClickTag={handleClickTag} /> */}
            {/* </Grid> */}
            {/* <TextField variant='outlined' fullWidth placeholder='Tambahkan Komentar' size='small' /> */}
          </Stack>
        </CardContent>
      </Card>
    </DashboardCard>
  )
}

export default QuestionDetail