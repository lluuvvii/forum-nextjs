'use client'

import React from 'react'
import { useState } from 'react'
import { Grid, Button, Stack, Divider, Collapse, Typography, Snackbar, Alert } from '@mui/material'
import DashboardCard from '../shared/DashboardCard'
import axios from '@/lib/axios'
import Axios from 'axios'

import { useMutation } from "react-query"
import TinyMCEEditor from '../tinymce/TinyMCEEditor'
import { IconUpload } from '@tabler/icons-react'
import { IconArrowBackUp } from '@tabler/icons-react'
import { IconPencilQuestion } from '@tabler/icons-react'

import { useFormik } from "formik"
import { useRouter } from 'next/navigation'

const ContentForm = ({ forumId, refetchDetailForumQuery }: any) => {
  const router = useRouter()
  const [cancel, setCancel] = useState(false)
  const [openSnackBar, setOpenSnackBar] = useState(false)

  const getToken = () => {
    const token = localStorage.getItem('token')
    return token
  }

  const { mutate, isLoading: isLoadingForumPost, error: isErrorForumPost, isSuccess: isSuccessForumPost } = useMutation(async (values: any) => {
    try {
      const response = await axios.post('/api/content', values)
      if (response.status === 200) {
        setOpenSnackBar(!openSnackBar)
        setCancel(!cancel)
        refetchDetailForumQuery()
      }

      // return response.data
    } catch (err: any) {
      throw new Error(err.response.data.message)
    }
  });

  const formik = useFormik({
    initialValues: {
      content_value: '',
    },
    onSubmit: (values) => {
      if (formik.values.content_value === '') {
        return
      }
      mutate({ content_value: values.content_value, forum_id: forumId })
      formik.setFieldValue('content_value', '')
    },
  });

  const uploadToCLoudinary = async (blobInfo: any, success: any, failure: any) => {
    const formData = new FormData()
    formData.append('file', blobInfo.blob(), blobInfo.filename())
    formData.append(
      'upload_preset',
      'forum_image_upload'
    )
    try {
      const response = await Axios.post('https://api.cloudinary.com/v1_1/dbzjr3io4/image/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      const data = await response.data.secure_url
      success(data)
      return data
    } catch (err) {
      console.error('Error uploading image : ', err)
      throw err
    }
  }

  const handleCancel = () => {
    if (!getToken()) {
      router.push('/authentication/login')
      return
    }
    setCancel(!cancel)
    formik.setFieldValue('content_value', '')
  }

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <DashboardCard title="Jawab Pertanyaan">
            <Collapse in={!cancel} timeout={1000}>
              <Grid item xs={12} mb={3}>
                <Button variant='contained' onClick={handleCancel}>
                  Jawab
                  <IconPencilQuestion size={15} style={{ marginLeft: '5px' }} />
                </Button>
              </Grid>
            </Collapse>
            <Collapse in={cancel} timeout={1000}>
              <Grid container sx={{ mb: 3 }}>
                <form onSubmit={formik.handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Stack
                        direction="column"
                        divider={<Divider orientation="horizontal" sx={{ borderWidth: '2px' }} flexItem />}
                        spacing={2}
                      >
                        <Grid item xs={12} style={{ height: 390 }} sx={{ mb: 3 }}>
                          {/* wysiwys here */}
                          <TinyMCEEditor onEditorChange={(content: string) => {
                            formik.setFieldValue('content_value', content)
                          }} uploadToCLoudinary={uploadToCLoudinary} value={formik.values.content_value} />
                          {formik.values.content_value === '' ?
                            <Typography color="error">Isi konten wajib diisi</Typography>
                            : null}
                        </Grid>
                      </Stack>
                    </Grid>
                    <Grid item>
                      <Button variant='contained' type="submit" disabled={isLoadingForumPost}>
                        <IconUpload size={15} style={{ marginRight: '5px' }} />
                        Unggah Jawaban
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
              </Grid>
            </Collapse>
          </DashboardCard>
        </Grid>
      </Grid>
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
    </>
  )
}

export default ContentForm