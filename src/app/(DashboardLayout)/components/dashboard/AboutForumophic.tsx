import React from 'react'
import DashboardCard from '../shared/DashboardCard'
import { Button, Grid, Typography } from '@mui/material'
import axios from '@/lib/axios'
import { useQuery } from 'react-query'
import { IconPencilQuestion, IconThumbDown, IconThumbUp } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'

const AboutForumophic = () => {
  const router = useRouter()
  const { data: userLoginQuery, isSuccess: isSuccessUserLoginQuery } = useQuery({
    queryKey: ['user-login-data'],
    queryFn: async () => {
      const response = await axios.get('/api/user')

      return response.data.data
    },
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  })

  return (
    <DashboardCard title={`Selamat Datang ${userLoginQuery?.username ? userLoginQuery.username : 'di Forumophic'}`}>
      <Typography variant='body1'>Forumophic, Solusi Tanya Jawab untuk Semua Masalah di Kampus Anda!</Typography><br />
      <Typography variant='body1'>Tanyakan sesuatu dari masalah yang anda miliki, di Forumophic menyediakan fitur :</Typography><br />
      <Grid container spacing={1} alignItems='center'>
        <Grid item>
          Tanya Pertanyaan Anda
        </Grid>
        <Grid item>
          <Button variant='contained' size='small' onClick={() => router.push('/questions')}>
            Tanya
            <IconPencilQuestion size={15} style={{ marginLeft: '5px' }} />
          </Button>
        </Grid>
        <Grid item>
          , Jawab Pertanyaan
        </Grid>
        <Grid item>
          , Tambahkan Komentar di tiap tanggapan
        </Grid>
        <Grid item>
          , Like tanggapan <IconThumbUp size={15} style={{ marginLeft: '5px' }} />
        </Grid>
        <Grid item>
          , Dislike tanggapan <IconThumbDown size={15} style={{ marginLeft: '5px' }} />
        </Grid>
      </Grid>
    </DashboardCard>
  )
}

export default AboutForumophic