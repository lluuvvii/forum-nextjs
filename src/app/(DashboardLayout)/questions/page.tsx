'use client'
import { Typography, Grid, Button, TextField, CardContent, Card } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { useState } from 'react'
import Axios from 'axios'
import TinyMCEEditor from '../components/tinymce/TinyMCEEditor';
import TagsView from '../components/tags/TagsView';

const SamplePage = () => {
  const [value, setValue] = useState('')
  const [cancel, setCancel] = useState(false)
  const [contentVal, setContentVal] = useState<any>({ content: '', tags: [] })

  // tags state value
  const [tags, setTags] = useState<string[]>([])
  const [inputValue, setInputValue] = useState<string>('')
  const [error, setError] = useState<string>('')

  const uploadToCLoudinary = async (blobInfo: any, success: any, failure: any) => {
    const formData = new FormData()
    formData.append('file', blobInfo.blob(), blobInfo.filename())
    formData.append(
      'upload_preset',
      'forum_image_upload'
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
    setContentVal({ content: value, tags })
    setCancel(!cancel)
    setInputValue('')
  }

  // tags handler
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    if (error) setError('');
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const newTag = inputValue.trim()
      if (newTag) {
        if (newTag.includes(' ')) {
          setError('Tag tidak boleh berisi spasi')
        } else {
          setTags([...tags, newTag])
          setInputValue('')
        }
      }
    }
  }

  const handleDeleteTag = (tagToDelete: string) => {
    setTags(tags.filter(tag => tag !== tagToDelete))
  }

  return (
    <PageContainer title='Sample Page' description='this is Sample page'>
      <Grid container mt={3}>
        {!cancel
          ?
          <Grid item xs={12} mb={3}>
            <Button variant='contained' onClick={handleCancel}>Tanya</Button>
          </Grid>
          :
          <>
            <Grid container sx={{ mb: 3 }}>
              <DashboardCard title='Pertanyaan'>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField label='Judul Pertanyaan' variant='outlined' fullWidth />
                  </Grid>
                  <Grid item xs={12} style={{ height: 390 }} sx={{ mb: 3 }}>
                    {/* wysiwys here */}
                    <TinyMCEEditor onEditorChange={handleChange} uploadToCLoudinary={uploadToCLoudinary} />
                  </Grid>
                  <Grid item xs={12}>
                    {/* tags input */}
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          variant="outlined"
                          label="Tags"
                          value={inputValue}
                          onChange={handleInputChange}
                          onKeyDown={handleInputKeyDown}
                          placeholder="Tekan Enter untuk menambahkan tag"
                          error={Boolean(error)}
                          helperText={error}
                        />
                      </Grid>
                      <TagsView tags={tags} handleDeleteTag={handleDeleteTag} />
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Button variant='contained' onClick={handleSubmit}>Unggah Pertanyaan</Button>
                  </Grid>
                  <Grid item>
                    <Button variant='outlined' onClick={handleCancel}>Batal</Button>
                  </Grid>
                </Grid>
              </DashboardCard>
            </Grid>
          </>
        }
        <Grid item xs={12}>
          <DashboardCard title='Jawaban'>
            <Card variant='outlined'>
              <CardContent>
                <div dangerouslySetInnerHTML={{ __html: contentVal.content }} />
                <TagsView tags={contentVal.tags} />
              </CardContent>
            </Card>
          </DashboardCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default SamplePage;
