'use client'

import { Typography, Grid, Button, TextField, CardContent, Card, Collapse, Stack, Divider, Box, CircularProgress, Snackbar, Alert, IconButton, Chip } from '@mui/material'
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Axios from 'axios'
import TinyMCEEditor from '../components/tinymce/TinyMCEEditor'
import TagsView from '../components/tags/TagsView'
import { IconUpload } from '@tabler/icons-react'
import { IconArrowBackUp } from '@tabler/icons-react'
import { IconPencilQuestion } from '@tabler/icons-react'
import CloseIcon from '@mui/icons-material/Close'

import { useFormik } from "formik"
import * as Yup from 'yup'
import { useMutation, useQuery } from "react-query"
import axios from '@/lib/axios'
import Link from 'next/link'
import { IconClockPlus } from '@tabler/icons-react'

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
  const [openSnackBar, setOpenSnackBar] = useState(false)

  const { data: forumQuery, refetch: refetchForumQuery, isLoading: isLoadingForumQuery } = useQuery({
    queryKey: ['forum-data'],
    queryFn: async () => {
      const response = await axios.get('/api/forum')

      return response.data.data
    }
  })

  const { data: userLoginQuery } = useQuery({
    queryKey: ['user-login-data'],
    queryFn: async () => {
      const response = await axios.get('/api/user')

      return response.data.data
    }
  })

  const { mutate, isLoading: isLoadingForumPost, error: isErrorForumPost, isSuccess: isSuccessForumPost } = useMutation(async (values: any) => {
    try {
      const response = await axios.post('/api/forum', values)
      if (response.status === 200) {
        setOpenSnackBar(!openSnackBar)
        setCancel(!cancel)
        refetchForumQuery()
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
      mutate(values);
      formik.setFieldValue('title', '')
      formik.setFieldValue('content_value', '')
      formik.setFieldValue('tags', [])
      setTags([])
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

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }) + ' ' + date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

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
                        name="title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
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
                  <Button variant='contained' type="submit" disabled={isLoadingForumPost}>
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
      <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={() => setOpenSnackBar(!openSnackBar)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert
          onClose={() => setOpenSnackBar(!openSnackBar)}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Berhasil diinput
        </Alert>
      </Snackbar>
      <Grid item xs={12}>
        <DashboardCard title='Semua Pertanyaan'>
          {isLoadingForumQuery && (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              width="100%"
              // position="absolute"
              top={0}
              left={0}
              bgcolor="rgba(255, 255, 255, 0.8)"
            // zIndex={1}
            >
              <CircularProgress />
            </Box>
          )}
          {forumQuery?.map((question: any, index: any) => (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Card key={index} variant='outlined'>
                  <CardContent>
                    <Stack
                      direction="column"
                      // divider={<Divider orientation="horizontal" sx={{ borderWidth: '1px' }} flexItem />}
                      spacing={2}
                    >
                      <Link href={`/questions/${question.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                        <Typography variant='h6' sx={{ mb: 2 }}>
                          {userLoginQuery?.id === question?.user_id ?
                            <Typography sx={{ mb: 1 }}>
                              Pertanyaan saya : {userLoginQuery?.username} <Chip label={formatDate(question?.created_at)} size="small" sx={{ color: "#078500", borderColor: "#078500" }} variant="outlined" icon={<IconClockPlus size={15} color='#078500' />} />
                            </Typography>
                            : <Typography sx={{ mb: 1 }}>
                              User : {question?.username ? question?.username : '...'} <Chip label={formatDate(question?.created_at)} size="small" sx={{ color: "#078500", borderColor: "#078500" }} variant="outlined" icon={<IconClockPlus size={15} color='#078500' />} />
                            </Typography>}
                          {question?.title}
                        </Typography>
                        <TagsView tags={question.forum_tags} />
                      </Link>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          ))}
        </DashboardCard>
      </Grid>
    </Grid>
  )
}

export default Questions
