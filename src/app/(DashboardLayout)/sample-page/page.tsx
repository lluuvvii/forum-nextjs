'use client'
import { Typography, Grid, Button } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useState, useCallback, useRef, useEffect } from 'react'
import Axios from 'axios'


const SamplePage = () => {
  const [value, setValue] = useState('')
  const reactQuillRef = useRef<ReactQuill>(null)
  const [answer, setAnswer] = useState(false)

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

  const imageHandler = useCallback(() => {
  }, [])

  const modules = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
        ['link', 'image', 'video', 'formula'],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean']                                         // remove formatting button
      ],
      handlers: {
        image: imageHandler
      },
      clipboard: {
        matchVisual: false
      }
    }
  }

  // console.log({ value })

  return (
    <PageContainer title="Sample Page" description="this is Sample page">
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
              <ReactQuill
                ref={reactQuillRef}
                theme="snow"
                value={value}
                onChange={setValue}
                modules={modules}
                style={{ height: "300px" }}
              />
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
