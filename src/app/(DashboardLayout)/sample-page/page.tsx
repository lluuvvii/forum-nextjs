'use client'
import { Typography, Grid, Button, Card, CardContent } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { useState } from 'react'
import Axios from 'axios'
import TinyMCEEditor from '../components/tinymce/TinyMCEEditor';

const SamplePage = () => {
  const [value, setValue] = useState('')
  const [cancel, setCancel] = useState(false)
  const [contentVal, setContentVal] = useState('')

  const uploadToCLoudinary = async (blobInfo: any, success: any, failure: any) => {
    const formData = new FormData()
    formData.append("file", blobInfo.blob(), blobInfo.filename())
    formData.append(
      "upload_preset",
      "forum_image_upload"
    )
    formData.append('folder', 'forum_nextjs')
    const response = await Axios.post('https://api.cloudinary.com/v1_1/dbzjr3io4/image/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    const data = await response.data.url
    success(data)
    return data
  }

  const handleChange = (content: any, editor: any) => {
    setValue(content)
  }

  const handleCancel = () => {
    setCancel(!cancel)
  }

  const handleSubmit = () => {
    setContentVal(value)
    setCancel(!cancel)
  }

  return (
    <PageContainer title="Sample Page" description="this is Sample page">
      <div>hallo</div>
      <DashboardCard title="Sample Page">
        <Typography>This is a sample page</Typography>
      </DashboardCard>
      <Grid container mt={3}>
        {!cancel &&
          <Grid item xs={12} mb={3}>
            <Button variant="contained" onClick={handleCancel}>Tanya</Button>
          </Grid>
        }
        {cancel &&
          <>
            <Grid container sx={{ mb: 3 }}>
              <DashboardCard title="Pertanyaan">
                <Grid container spacing={2}>
                  <Grid item xs={12} style={{ height: 390 }} sx={{ mb: 3 }}>
                    {/* wysiwys here */}
                    <TinyMCEEditor onEditorChange={handleChange} uploadToCLoudinary={uploadToCLoudinary} />
                  </Grid>
                  <Grid item>
                    <Button variant="contained" onClick={handleSubmit}>Unggah Pertanyaan</Button>
                  </Grid>
                  <Grid item>
                    <Button variant="outlined" onClick={handleCancel}>Batal</Button>
                  </Grid>
                </Grid>
              </DashboardCard>
            </Grid>
          </>
        }
        <Grid item xs={12}>
          <DashboardCard title="Jawaban">
            <div dangerouslySetInnerHTML={{ __html: contentVal }} />
          </DashboardCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default SamplePage;
