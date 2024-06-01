'use client'

import { Typography, Grid, Button, TextField, CardContent, Card, Collapse, Stack, Divider } from '@mui/material'
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard'
import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Axios from 'axios'
import TinyMCEEditor from '../components/tinymce/TinyMCEEditor'
import TagsView from '../components/tags/TagsView'
import { IconUpload } from '@tabler/icons-react'
import { IconArrowBackUp } from '@tabler/icons-react'
import { IconPencilQuestion } from '@tabler/icons-react'
import CollapseMUI from '../components/Collapse/CollapseMUI'

import { useFormik } from "formik"
import * as Yup from 'yup'
import { useMutation, useQuery } from "react-query"
import axios from '@/lib/axios'
import Link from 'next/link'

interface Question {
  title: string
  content: string
  tags: string[]
}

const validationSchema = Yup.object({
  title: Yup.string().required('Judul wajib diisi'),
  // content_value: Yup.string().required('Isi konten wajib diisi'),
  // tags: Yup.array()
  //   .of(Yup.string().required('Tag tidak boleh kosong'))
  //   .required('Tags wajib diisi')
  //   .min(1, 'Setidaknya satu tag harus diisi')
});

const Questions = () => {
  const router = useRouter()
  const [cancel, setCancel] = useState(false)

  const { data: forumQuery, refetch: refetchForumQuery, isLoading: isLoadingForumQuery } = useQuery({
    queryKey: ['forum-data'],
    queryFn: async () => {
      const response = await axios.get('api/forum')

      // console.log(response.data.data)

      return response.data.data
    }
  })

  const { mutate, isLoading: isLoadingForumPost, error: isErrorForumPost, isSuccess: isSuccessForumPost } = useMutation(async (values: any) => {
    try {
      const response = await axios.post('/api/forum', values)
      if (response.status === 200) {
        // localStorage.setItem('token', response?.data?.data?.access_token)
        // router.push('/')
        // console.log(response)
      }

      // return response.data
    } catch (err: any) {
      throw new Error(err.response.data.message)
    }
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      content_value: '',
      tags: []
    },
    validationSchema,
    onSubmit: (values) => {
      if (formik.values.tags.length < 1) {
        return
      }
      if (formik.values.content_value === '') {
        return
      }
      setCancel(!cancel)
      formik.setFieldValue('title', '')
      formik.setFieldValue('content_value', '')
      formik.setFieldValue('tags', [])
      setTags([])
      mutate(values);
    },
  });

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

  const handleCancel = () => {
    setCancel(!cancel)
    formik.setFieldValue('title', '')
    formik.setFieldValue('content_value', '')
    formik.setFieldValue('tags', [])
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
        formik.setFieldValue('tags', [...tags, newTag])
        setTagInputValue('')
      }
    }
  }

  const handleClickTag = (tag: string) => {
    router.push(`/search/?tag=${tag}`)
  }

  const handleDeleteTag = (tagToDelete: string) => {
    setTags(tags.filter(tag => tag !== tagToDelete))
    formik.setFieldValue('tags', tags.filter(tag => tag !== tagToDelete))
  }

  return (
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
            <form onSubmit={formik.handleSubmit}>
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
                        // onChange={(e) => setTitle(e.target.value)}
                        name="title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        // error={formik.touched.title && Boolean(formik.errors.title)}
                        // helperText={formik.touched.title && formik.errors.title}
                      />
                      {formik.values.title === '' ?
                        <Typography color="error">Judul wajib diisi</Typography>
                        : null}
                    </Grid>
                    <Grid item xs={12} style={{ height: 390 }} sx={{ mb: 3 }}>
                      {/* wysiwys here */}
                      <TinyMCEEditor onEditorChange={(content: string) => {
                        formik.setFieldValue('content_value', content)
                      }} uploadToCLoudinary={uploadToCLoudinary} value={formik.values.content_value} />
                      {formik.values.content_value === '' ?
                        <Typography color="error">Isi konten wajib diisi</Typography>
                        : null}
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
                                name="tags"
                                value={tagInputValue}
                                onChange={handleInputChange}
                                placeholder="Tekan Spasi untuk menambahkan tag"
                              />
                              {formik.values.tags.length < 1 ?
                                <Typography color="error">Isi tag wajib diisi minimal 1</Typography>
                                : null}
                            </Grid>
                            <TagsView tags={tags} handleDeleteTag={handleDeleteTag} />
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Stack>
                </Grid>
                <Grid item>
                  <Button variant='contained' type="submit">
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
            </form>
          </DashboardCard>
        </Grid>
      </Collapse>
      <Grid item xs={12}>
        <DashboardCard title='Semua Pertanyaan'>
          {forumQuery?.map((question: any, index: any) => (
            <Card key={index} sx={{ mb: 3 }} variant='outlined'>
              <CardContent>
                <Stack
                  direction="column"
                  divider={<Divider orientation="horizontal" sx={{ borderWidth: '2px' }} flexItem />}
                  spacing={2}
                >
                  <Typography variant='h3'>
                    <Link href={`/questions/${question.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                      {question?.title}
                    </Link>
                  </Typography>
                  <Grid item>
                    {/* <div dangerouslySetInnerHTML={{ __html: question?.content }} /> */}
                    <TagsView tags={question.forum_tags} />
                  </Grid>
                  {/* <TextField variant='outlined' fullWidth placeholder='Tambahkan Komentar' size='small' /> */}
                </Stack>
              </CardContent>
            </Card>
          ))}
        </DashboardCard>
      </Grid>
    </Grid>
  )
}

export default Questions
