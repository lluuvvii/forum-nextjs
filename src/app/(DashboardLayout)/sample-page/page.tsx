'use client'
import { Typography, Grid, Button } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { useState } from 'react'
import Axios from 'axios'
import TinyMCEEditor from '../components/tinymce/TinyMCEEditor';


const SamplePage = () => {
  const [value, setValue] = useState('')
  const [answer, setAnswer] = useState(false)

  const handleChange = (content: any, editor: any) => {
    setValue(content)
  }

  const handleAnswer = () => {
    setAnswer(!answer)
  }

  const uploadToCLoudinary = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append(
      "upload_preset",
      "forum_image_upload"
    )
    formData.append('folder', 'forum_nextjs')

    const response = await Axios.post('https://api.cloudinary.com/v1_1/dbzjr3io4/image/upload', formData)
    const data = await response.data.url

    return data
  }

  console.log(value)

  return (
    <PageContainer title="Sample Page" description="this is Sample page">
      <div>hallo</div>
      <DashboardCard title="Sample Page">
        <Typography>This is a sample page</Typography>
      </DashboardCard>
      <Grid container mt={3}>
        {!answer &&
          <Grid item xs={12} mb={3}>
            <Button variant="contained" onClick={handleAnswer}>Jawab</Button>
          </Grid>
        }
        {answer &&
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} style={{ height: 390 }}>
              {/* wysiwys here */}
              <TinyMCEEditor onEditorChange={handleChange} />
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={handleAnswer}>Upload Jawaban</Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" onClick={handleAnswer}>Batal</Button>
            </Grid>
          </Grid>
        }
        <Grid item xs={12}>
          <DashboardCard title="Answer">
            <div dangerouslySetInnerHTML={{ __html: value }} />
          </DashboardCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default SamplePage;
