'use client'
import { Typography, Grid, Button, TextField, CardContent, Card, Collapse, Stack, Divider } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Axios from 'axios'
import TinyMCEEditor from '../components/tinymce/TinyMCEEditor'
import TagsView from '../components/tags/TagsView'
import { IconUpload } from '@tabler/icons-react'
import { IconArrowBackUp } from '@tabler/icons-react'
import { IconPencilQuestion } from '@tabler/icons-react'

interface Question {
  title: string
  content: string
  tags: string[]
}

const Questions = () => {
  const router = useRouter()
  const [value, setValue] = useState('')
  const [cancel, setCancel] = useState(false)
  const [title, setTitle] = useState('')
  const [contentVal, setContentVal] = useState<any>({ title: '', content: '', tags: [] })
  const allQuestions = useRef<Question[]>([])

  // tags state value
  const [tags, setTags] = useState<string[]>([])
  const [tagInputValue, setTagInputValue] = useState<string>('')

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
    setCancel(!cancel)
    if (cancel) {
      setContentVal({ title, content: value, tags })
      const newContent = { title, content: value, tags }
      allQuestions.current.push(newContent)
    }
    setTags([])
  }

  // tags handler
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTagInputValue(event.target.value)
    if (event.target.value.includes(' ')) {
      event.preventDefault()
      const newTag = tagInputValue.trim()
      if (newTag) {
        setTags([...tags, newTag])
        setTagInputValue('')
      }
    }
  }

  const handleClickTag = (tag: string) => {
    router.push(`/search/?tag=${tag}`)
  }

  const handleDeleteTag = (tagToDelete: string) => {
    setTags(tags.filter(tag => tag !== tagToDelete))
  }

  return (
    <PageContainer title="Questions" description="this is Questions">
      <Grid container mt={3}>
        <Collapse in={!cancel}>
          <Grid item xs={12} mb={3}>
            <Button variant='contained' onClick={handleCancel}>
              Tanya
              <IconPencilQuestion size={15} style={{ marginLeft: '5px' }} />
            </Button>
          </Grid>
        </Collapse>
        <Collapse in={cancel}>
          <Grid container sx={{ mb: 3 }}>
            <DashboardCard title='Pertanyaan'>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Stack
                    direction="column"
                    divider={<Divider orientation="horizontal" sx={{ borderWidth: '2px' }} flexItem />}
                    spacing={2}
                  >
                    <Grid item xs={12}>
                      <TextField
                        label='Judul Pertanyaan'
                        variant='outlined'
                        fullWidth
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} style={{ height: 390 }} sx={{ mb: 3 }}>
                      {/* wysiwys here */}
                      <TinyMCEEditor onEditorChange={handleChange} uploadToCLoudinary={uploadToCLoudinary} />
                    </Grid>
                    {/* tags input */}
                    <Grid item xs={12}>
                      <Card variant='outlined'>
                        <CardContent>
                          <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12}>
                              <TextField
                                fullWidth
                                variant="standard"
                                label="Tags"
                                value={tagInputValue}
                                onChange={handleInputChange}
                                placeholder="Tekan Spasi untuk menambahkan tag"
                              />
                            </Grid>
                            <TagsView tags={tags} handleDeleteTag={handleDeleteTag} />
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Stack>
                </Grid>
                <Grid item>
                  <Button variant='contained' onClick={handleSubmit}>
                    <IconUpload size={15} style={{ marginRight: '5px' }} />
                    Unggah Pertanyaan
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant='outlined' onClick={handleCancel}>
                    Batal
                    <IconArrowBackUp size={15} style={{ marginLeft: '5px' }} />
                  </Button>
                </Grid>
              </Grid>
            </DashboardCard>
          </Grid>
        </Collapse>
        <Grid item xs={12}>
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
        </Grid>
      </Grid>
    </PageContainer>
  )
}

export default Questions
