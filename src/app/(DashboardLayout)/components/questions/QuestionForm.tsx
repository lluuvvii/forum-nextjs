// /app/questions/components/QuestionForm.tsx
'use client'

import { useState, useRef } from 'react'
import { Grid, Button, TextField, CardContent, Card, Stack, Divider } from '@mui/material'
import TinyMCEEditor from '../../components/tinymce/TinyMCEEditor'
import TagsView from '../../components/tags/TagsView'
import { IconUpload, IconArrowBackUp } from '@tabler/icons-react'
import Axios from 'axios'
import DashboardCard from '../shared/DashboardCard'
import { useRouter } from 'next/router'

interface QuestionFormProps {
  handleCancel: () => void
  handleSubmit: (newContent: { title: string, content: string, tags: string[] }) => void
}

interface Question {
  title: string
  content: string
  tags: string[]
}

const QuestionForm: React.FC<QuestionFormProps> = () => {
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
  )
}

export default QuestionForm
