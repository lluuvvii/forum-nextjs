
import { useRouter } from 'next/router'
import { useRef } from 'react'
import TagsView from '../tags/TagsView'
import DashboardCard from '../shared/DashboardCard'
import { Card, CardContent, Stack, Divider, Typography, Grid, TextField } from '@mui/material'

interface Question {
  title: string
  content: string
  tags: string[]
}

const AllQuestions = () => {
  const router = useRouter()
  const allQuestions = useRef<Question[]>([])

  const handleClickTag = (tag: string) => {
    router.push(`/search/?tag=${tag}`)
  }

  return (
    <DashboardCard title='Semua Pertanyaan'>
      {allQuestions?.current?.map((question, index) => (
        <Card key={index} sx={{ mb: 3 }} variant='outlined'>
          <CardContent>
            <Stack
              direction="column"
              divider={<Divider orientation="horizontal" sx={{ borderWidth: '2px' }} flexItem />}
              spacing={2}
            >
              <Typography variant='h3'>{question?.title}</Typography>
              <Grid item>
                <div dangerouslySetInnerHTML={{ __html: question?.content }} />
                <TagsView tags={question?.tags} handleClickTag={handleClickTag} />
              </Grid>
              <TextField variant='outlined' fullWidth placeholder='Tambahkan Komentar' size='small' />
            </Stack>
          </CardContent>
        </Card>
      ))}
    </DashboardCard>
  )
}

export default AllQuestions