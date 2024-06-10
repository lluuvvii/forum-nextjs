'use client'

import { useState } from 'react'
import { Avatar, Box, Button, Card, CardContent, Chip, CircularProgress, Collapse, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, Stack, TextField, Typography } from "@mui/material"
import axios from "@/lib/axios"
import { useMutation, useQuery } from "react-query"
import TagsView from "../../components/tags/TagsView"
import { IconClockEdit, IconClockPlus, IconEraser, IconThumbDown } from "@tabler/icons-react"
import { IconCheck } from "@tabler/icons-react"
import { IconThumbUp } from "@tabler/icons-react"
import { useRouter } from "next/navigation"
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { IconEdit } from '@tabler/icons-react'
import TinyMCEReadOnly from '../../components/tinymce/TinyMCEReadOnly'
import ContentForm from '../../components/contentUpload/ContentForm'
import SnackBarSuccess from '../../components/snackbar/SnackBarSuccess'
import DashboardCard from '../../components/shared/DashboardCard'
import TinyMCEEditor from '../../components/tinymce/TinyMCEEditor'
import Axios from 'axios'

const validationSchema = Yup.object({
  comment_value: Yup.string().required('Komentar tidak boleh kosong')
})

const commentUpdateSchema = Yup.object({
  comment_update_value: Yup.string().required('Komentar tidak boleh kosong')
})

const forumUpdateSchema = Yup.object({
  title: Yup.string().required('Judul wajib diisi'),
  // content_value: Yup.string().required('Isi konten wajib diisi'),
  // tags: Yup.array()
  //   .of(Yup.string().required('Tag tidak boleh kosong'))
  //   .required('Tags wajib diisi')
  //   .min(1, 'Setidaknya satu tag harus diisi')
});

const QuestionDetail = ({ params }: { params: { id: string } }) => {

  // state vars
  const id = params.id
  const router = useRouter()
  const [contentId, setContentId] = useState('')
  const [commentId, setCommentId] = useState('')
  const [openComment, setOpenComment] = useState(false)
  const [openUpdateComment, setOpenUpdateComment] = useState(false)
  const [openDeleteComment, setOpenDeleteComment] = useState(false)
  const [openUpdateForum, setOpenUpdateForum] = useState(false)
  const [tagsEdit, setTagsEdit] = useState<string[]>([])
  const [tagInputValue, setTagInputValue] = useState<string>('')

  const getToken = () => {
    const token = localStorage.getItem('token')
    return token
  }

  const formikComment = useFormik({
    initialValues: {
      comment_value: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      mutateComment({ comment_value: values.comment_value, content_id: contentId })
      resetForm()
    },
  })

  const formikUpdateComment = useFormik({
    initialValues: {
      comment_update_value: '',
    },
    validationSchema: commentUpdateSchema,
    onSubmit: (values, { resetForm }) => {
      mutateUpdateComment({ comment_value: values.comment_update_value })
      resetForm()
    },
  })

  const formikUpdateForum = useFormik({
    initialValues: {
      title: '',
      content_value: '',
      tags: []
    },
    validationSchema: forumUpdateSchema,
    onSubmit: (values) => {
      formikUpdateForum.setFieldValue('title', '')
      formikUpdateForum.setFieldValue('content_value', '')
      formikUpdateForum.setFieldValue('tags', [])
      setTagsEdit([])
      if (values.title === '') {
        return
      }
      if (values.tags.length < 1) {
        return
      }
      if (values.content_value === '') {
        return
      }
      mutateUpdateForum(values)
    },
  });

  // get query
  const { data: detailForumQuery, refetch: refetchDetailForumQuery, isLoading: isLoadingDetailForumQuery, isSuccess: isSuccessDetailForumQuery } = useQuery({
    queryKey: ['forum-detail', id],
    queryFn: async () => {
      const response = await axios.get(`/api/forum/${id}`)

      // console.log(response.data.data)

      return response.data.data
    }
  })

  const { data: userLoginQuery, refetch: refetchUserLogin } = useQuery({
    queryKey: ['user-login-data'],
    queryFn: async () => {
      const response = await axios.get('/api/user')

      return response.data.data
    }
  })

  // post query
  const { mutate: mutateSolved, isLoading: isLoadingSolved, error: isErrorSolved, isSuccess: isSuccessSolved } = useMutation(async (values: any) => {
    try {
      const response = await axios.post('/api/forum/mark', values)
      if (response.status === 200) {
        refetchDetailForumQuery()
        refetchUserLogin()
      }

      // return response.data
    } catch (err: any) {
      throw new Error(err.response.data.message)
    }
  })

  const { mutate: mutateUpVote, isLoading: isLoadingUpVote, error: isErrorUpVote, isSuccess: isSuccessUpVote } = useMutation(async (values: any) => {
    try {
      const response = await axios.post('/api/content/upvote', values)
      if (response.status === 200) {
        refetchDetailForumQuery()
        refetchUserLogin()
      }

      // return response.data
    } catch (err: any) {
      throw new Error(err.response.data.message)
    }
  })

  const { mutate: mutateDownVote, isLoading: isLoadingDownVote, error: isErrorDownVote, isSuccess: isSuccessDownVote } = useMutation(async (values: any) => {
    try {
      const response = await axios.post('/api/content/downvote', values)
      if (response.status === 200) {
        refetchDetailForumQuery()
        refetchUserLogin()
      }

      // return response.data
    } catch (err: any) {
      throw new Error(err.response.data.message)
    }
  })

  const { mutate: mutateComment, isLoading: isLoadingComment, error: isErrorComment, isSuccess: isSuccessComment } = useMutation(async (values: any) => {
    try {
      const response = await axios.post('/api/comment', values)
      if (response.status === 200) {
        refetchDetailForumQuery()
        refetchUserLogin()
      }

      // return response.data
    } catch (err: any) {
      throw new Error(err.response.data.message)
    }
  })

  const { mutate: mutateUpdateComment, isLoading: isLoadingUpdateComment, error: isErrorUpdateComment, isSuccess: isSuccessUpdateComment } = useMutation(async (values: any) => {
    try {
      const response = await axios.put(`/api/comment/${commentId}`, values)
      if (response.status === 200) {
        refetchDetailForumQuery()
        refetchUserLogin()
      }

      // return response.data
    } catch (err: any) {
      throw new Error(err.response.data.message)
    }
  })

  const { mutate: mutateDeleteComment, isLoading: isLoadingDeleteComment, error: isErrorDeleteComment, isSuccess: isSuccessDeleteComment } = useMutation(async (values: any) => {
    try {
      const response = await axios.delete(`/api/comment/${values}`)
      if (response.status === 200) {
        refetchDetailForumQuery()
        refetchUserLogin()
      }

      // return response.data
    } catch (err: any) {
      throw new Error(err.response.data.message)
    }
  })

  const { mutate: mutateDeleteContent, isLoading: isLoadingDeleteContent, error: isErrorDeleteContent, isSuccess: isSuccessDeleteContent } = useMutation(async (values: any) => {
    try {
      const response = await axios.delete(`/api/content/${values}`)
      if (response.status === 200) {
        refetchDetailForumQuery()
        refetchUserLogin()
      }

      // return response.data
    } catch (err: any) {
      throw new Error(err.response.data.message)
    }
  })

  const { mutate: mutateUpdateForum, isLoading: isLoadingUpdateForum, error: isErrorUpdateForum, isSuccess: isSuccessUpdateForum } = useMutation(async (values: any) => {
    try {
      const response = await axios.put(`/api/forum/${detailForumQuery.id}`, values)
      if (response.status === 200) {
        refetchDetailForumQuery()
        refetchUserLogin()
      }

      // return response.data
    } catch (err: any) {
      throw new Error(err.response.data.message)
    }
  })

  const { mutate: mutateDeleteForum, isLoading: isLoadingDeleteForum, error: isErrorDeleteForum, isSuccess: isSuccessDeleteForum } = useMutation(async (values: any) => {
    try {
      const response = await axios.delete(`/api/forum/${values}`)
      if (response.status === 200) {
        refetchDetailForumQuery()
        refetchUserLogin()
      }

      // return response.data
    } catch (err: any) {
      throw new Error(err.response.data.message)
    }
  })

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }) + ' ' + date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  // handler
  const handleAnswered = (id: number | string, forumId: number | string) => {
    if (!userLoginQuery) {
      router.push('/authentication/login')
      return
    }
    if (!getToken()) {
      router.push('/authentication/login')
      return
    }

    mutateSolved({ content_id: id, forum_id: forumId })
  }

  const handleUpVote = (id: number | string, voteType: string) => {
    if (!userLoginQuery) {
      router.push('/authentication/login')
      return
    }
    if (!getToken()) {
      router.push('/authentication/login')
      return
    }

    mutateUpVote({ content_id: id, vote_type: voteType })
  }

  const handleDownVote = (id: number | string, voteType: string) => {
    if (!userLoginQuery) {
      router.push('/authentication/login')
      return
    }
    if (!getToken()) {
      router.push('/authentication/login')
      return
    }

    mutateDownVote({ content_id: id, vote_type: voteType })
  }

  const handleCommentClick = () => {
    setOpenComment(!openComment)
  }

  const handleUpdateCommentClick = () => {
    setOpenUpdateComment(!openUpdateComment)
  }

  const handleDeleteCommentClick = () => {
    // setOpenUpdateComment(!openUpdateComment)
    setOpenDeleteComment(!openDeleteComment)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTagInputValue(event.target.value)
    if (event.target.value.includes(' ')) {
      event.preventDefault()
      const newTag = tagInputValue.trim()
      if (newTag) {
        setTagsEdit([...tagsEdit, newTag])
        formikUpdateForum.setFieldValue('tags', [...tagsEdit, newTag])
        setTagInputValue('')
      }
    }
  }

  const handleDeleteTag = (tagToDelete: string) => {
    setTagsEdit(tagsEdit.filter(tag => tag !== tagToDelete))
    formikUpdateForum.setFieldValue('tags', tagsEdit.filter(tag => tag !== tagToDelete))
  }

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

  return (
    <>
      {detailForumQuery?.user_id !== userLoginQuery?.id ?
        <Grid container>
          <Grid item xs={12} sx={{ mb: 3 }}>
            <ContentForm forumId={detailForumQuery?.id} refetchDetailForumQuery={refetchDetailForumQuery} />
          </Grid>
        </Grid>
        : null}
      <DashboardCard title="Konten Forum">
        <>
          {isLoadingDetailForumQuery && (
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
        </>
        <Collapse in={isSuccessDetailForumQuery} timeout={1000}>
          <Box sx={{ maxHeight: 800, overflowY: 'auto' }}>
            <Grid container spacing={1}>
              {detailForumQuery ?
                <>
                  {detailForumQuery?.contents?.map((content: any, index: any) => (
                    <Grid key={index} item xs={12}>
                      <Card variant='outlined'>
                        <CardContent>
                          <Stack
                            direction="column"
                            spacing={2}
                          >
                            <Grid container spacing={1}>
                              {content.user_id === detailForumQuery?.user_id ?
                                <Grid item xs={12}>
                                  <Grid container spacing={1} justifyContent='space-between'>
                                    <Typography variant='h6' sx={{ mb: 1 }}>
                                      Pertanyaan
                                    </Typography>
                                    <Grid item>
                                      <Grid container spacing={1}>
                                        <Grid item>
                                          <Button color="primary" variant="outlined" size="small" onClick={() => handleUpVote(content.id, "up")}>
                                            {content?.up_votes.length} <IconThumbUp size={15} />
                                          </Button>
                                        </Grid>
                                        <Grid item>
                                          <Button color="error" variant="outlined" size="small" onClick={() => handleDownVote(content.id, "down")}>
                                            <IconThumbDown size={15} /> {content?.down_votes.length}
                                          </Button>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                  <Grid item>
                                    <Grid container spacing={1}>
                                      <Grid item>
                                        <Avatar sx={{ width: 25, height: 25 }} src="https://source.boringavatars.com/beam" alt="user-profile" />
                                      </Grid>
                                      <Grid item>
                                        <Typography>
                                          {content?.user?.username}
                                        </Typography>
                                      </Grid>
                                    </Grid>
                                    <Chip label={formatDate(content?.updated_at)} size="small" sx={{ color: "#bdad00", border: 'none' }} variant="outlined" icon={<IconClockEdit size={15} color='#bdad00' />} />
                                    <Chip label={formatDate(content?.created_at)} size="small" sx={{ color: "#078500", border: 'none' }} variant="outlined" icon={<IconClockPlus size={15} color='#078500' />} />
                                  </Grid>
                                  <Typography variant='h4' sx={{ mt: 1, wordBreak: 'break-word' }}>
                                    {detailForumQuery?.title}
                                  </Typography>
                                </Grid>
                                :
                                <Grid item xs={12}>
                                  <Grid container justifyContent='space-between'>
                                    <Typography variant='h6' sx={{ mb: 1 }}>
                                      Jawaban
                                    </Typography>
                                    <Grid item>
                                      <Grid container spacing={1}>
                                        <Grid item>
                                          <Button color="primary" variant="outlined" size="small" onClick={() => handleUpVote(content.id, "up")}>
                                            {content?.up_votes.length} <IconThumbUp size={15} />
                                          </Button>
                                        </Grid>
                                        <Grid item>
                                          <Button color="error" variant="outlined" size="small" onClick={() => handleDownVote(content.id, "down")}>
                                            <IconThumbDown size={15} /> {content?.down_votes.length}
                                          </Button>
                                        </Grid>
                                        <Grid item>
                                          {content?.is_answer === 0 ?
                                            <>
                                              {userLoginQuery?.id === detailForumQuery?.user_id ?
                                                <>
                                                  {getToken() ?
                                                    <>
                                                      {!detailForumQuery.is_resolved ?
                                                        <Button color="success" variant={content?.is_answer === 0 ? "outlined" : "contained"} size="small" onClick={() => handleAnswered(content.id, detailForumQuery?.id)}>
                                                          Terjawab ?
                                                        </Button>
                                                        : null}
                                                    </>
                                                    : null}
                                                </>
                                                : null}
                                            </>
                                            :
                                            <Button color="success" variant={content?.is_answer === 0 ? "outlined" : "contained"} size="small" onClick={() => {
                                              if (getToken() && userLoginQuery?.id === detailForumQuery?.user_id) {
                                                handleAnswered(content.id, detailForumQuery?.id)
                                              }
                                            }}>
                                              Selesai <IconCheck size={15} />
                                            </Button>
                                          }
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                  <Grid container spacing={1}>
                                    <Grid item>
                                      <Avatar sx={{ width: 25, height: 25 }} src="https://source.boringavatars.com/beam" alt="user-profile" />
                                    </Grid>
                                    <Grid item>
                                      <Typography>
                                        {content?.user?.username}
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                  <Chip label={formatDate(content?.updated_at)} size="small" sx={{ color: "#bdad00", border: 'none' }} variant="outlined" icon={<IconClockEdit size={15} color='#bdad00' />} />
                                  <Chip label={formatDate(content?.created_at)} size="small" sx={{ color: "#078500", border: 'none' }} variant="outlined" icon={<IconClockPlus size={15} color='#078500' />} />
                                </Grid>}
                              <Grid item xs={12}>
                                <Stack direction="column" spacing={1}>
                                  <Grid item xs={12}>
                                    <TinyMCEReadOnly value={content?.content_value} />
                                  </Grid>
                                  {userLoginQuery?.id === content.user_id ?
                                    <>
                                      {content.user_id === detailForumQuery?.user_id ?
                                        <>
                                          {getToken() ?
                                            <Stack direction="row" spacing={1}>
                                              <Button variant='outlined' size="small" color="success" onClick={() => {
                                                formikUpdateForum.setFieldValue('title', detailForumQuery.title)
                                                formikUpdateForum.setFieldValue('content_value', content.content_value)
                                                // setTagsEdit([...tagsEdit, detailForumQuery.forum_tags.map((tag: any) => tag.tag.name)])
                                                // formikUpdateForum.setFieldValue('tags', [...formikUpdateForum.values.tags, detailForumQuery.forum_tags.map((tag: any) => tag.tag.name)])
                                                setOpenUpdateForum(!openUpdateForum)
                                              }}><IconEdit size={15} /> Edit Pertanyaan</Button>
                                              <Button variant='outlined' size="small" color="error" onClick={() => {
                                                mutateDeleteForum(detailForumQuery.id)
                                                router.push('/questions')
                                              }}><IconEraser size={15} /> Hapus Pertanyaan</Button>
                                              <form onSubmit={formikUpdateForum.handleSubmit}>
                                                <Dialog
                                                  fullWidth
                                                  open={openUpdateForum}
                                                  onClose={() => setOpenUpdateForum(!openUpdateForum)}
                                                  PaperProps={{
                                                    component: 'form',
                                                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                                                      event.preventDefault();
                                                      const formData = new FormData(event.currentTarget);
                                                      const formJson = Object.fromEntries((formData as any).entries());
                                                      setOpenUpdateForum(!openUpdateForum)
                                                    },
                                                  }}
                                                >
                                                  <DialogTitle>Edit pertanyaan anda</DialogTitle>
                                                  <DialogContent>
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
                                                              value={formikUpdateForum.values.title}
                                                              onChange={formikUpdateForum.handleChange}
                                                            />
                                                            {formikUpdateForum.values.title === '' ?
                                                              <Typography color="error">Judul wajib diisi</Typography>
                                                              : null}
                                                          </Grid>
                                                          <Grid item xs={12} style={{ height: 390 }} sx={{ mb: 3 }}>
                                                            <TinyMCEEditor onEditorChange={(content: string) => {
                                                              formikUpdateForum.setFieldValue('content_value', content)
                                                            }} uploadToCLoudinary={uploadToCLoudinary} value={formikUpdateForum.values.content_value} />
                                                            {formikUpdateForum.values.content_value === '' ?
                                                              <Typography color="error">Isi konten wajib diisi</Typography>
                                                              : null}
                                                          </Grid>
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
                                                                    {formikUpdateForum.values.tags.length < 1 ?
                                                                      <Typography color="error">Isi tag wajib diisi minimal 1</Typography>
                                                                      : null}
                                                                  </Grid>
                                                                  <TagsView handleDeleteTag={handleDeleteTag} tags={tagsEdit} />
                                                                </Grid>
                                                              </CardContent>
                                                            </Card>
                                                          </Grid>
                                                        </Stack>
                                                      </Grid>
                                                    </Grid>
                                                  </DialogContent>
                                                  <DialogActions>
                                                    <Button onClick={() => {
                                                      setOpenUpdateForum(!openUpdateForum)
                                                      formikUpdateForum.setFieldValue('tags', [])
                                                      setTagsEdit([])
                                                    }}>Batal</Button>
                                                    <Button type="submit">Kirim</Button>
                                                  </DialogActions>
                                                </Dialog>
                                              </form>
                                              {isSuccessDeleteForum && <SnackBarSuccess title="Berhasil menghapus pertanyaan" />}
                                              {isSuccessUpdateForum && <SnackBarSuccess title="Berhasil mengubah pertanyaan" />}
                                            </Stack>
                                            : null}
                                        </>
                                        :
                                        <>
                                          {getToken() ?
                                            <Stack direction="row" spacing={1}>
                                              <Button variant='outlined' size="small" color="success"><IconEdit size={15} /> Edit Jawaban</Button>
                                              <Button variant='outlined' size="small" color="error" onClick={() => {
                                                mutateDeleteContent(content.id)
                                              }}><IconEraser size={15} /> Hapus Jawaban</Button>
                                              {isSuccessDeleteContent && <SnackBarSuccess title="Berhasil menghapus jawaban" />}
                                            </Stack>
                                            : null}
                                        </>}
                                    </>
                                    : null}
                                </Stack>
                                {content.user_id === detailForumQuery?.user_id ?
                                  <TagsView tags={detailForumQuery?.forum_tags} />
                                  : null}
                              </Grid>
                              <Grid item xs={12}>
                                <Divider orientation='horizontal' sx={{ mb: 2 }} flexItem />
                                <form onSubmit={formikComment.handleSubmit}>
                                  <Box sx={{ display: 'flex', gap: 1 }}>
                                    <Button variant="contained" onClick={() => {
                                      if (getToken()) {
                                        handleCommentClick()
                                        setContentId(content.id)
                                        return
                                      }
                                      router.push('/authentication/login')
                                    }} size="small" fullWidth>
                                      Tambahkan Komentar
                                    </Button>
                                    <Dialog
                                      open={openComment}
                                      onClose={handleCommentClick}
                                      PaperProps={{
                                        component: 'form',
                                        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                                          event.preventDefault();
                                          const formData = new FormData(event.currentTarget);
                                          const formJson = Object.fromEntries((formData as any).entries());
                                          handleCommentClick()
                                        },
                                      }}
                                    >
                                      <DialogTitle>Tambahkan komentar anda</DialogTitle>
                                      <DialogContent>
                                        <TextField
                                          margin="dense"
                                          id="comment_value"
                                          name="comment_value"
                                          label="Komentar"
                                          fullWidth
                                          variant="standard"
                                          onChange={formikComment.handleChange}
                                          value={formikComment.values.comment_value}
                                          error={formikComment.touched.comment_value && Boolean(formikComment.errors.comment_value)}
                                          helperText={formikComment.touched.comment_value && formikComment.errors.comment_value}
                                        />
                                      </DialogContent>
                                      <DialogActions>
                                        <Button onClick={handleCommentClick}>Batal</Button>
                                        <Button type="submit">Kirim</Button>
                                      </DialogActions>
                                    </Dialog>
                                  </Box>
                                </form>
                                {isSuccessComment && <SnackBarSuccess title="Berhasil mengunggah komentar" />}
                              </Grid>
                              <Grid item xs={12}>
                                <Box sx={{ width: '100%', maxHeight: 300, overflowY: 'auto' }}>
                                  {content.comments?.map((comment: any, index: number) => (
                                    <div key={index}>
                                      {comment ?
                                        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                                          <TextField
                                            key={index}
                                            multiline
                                            id="outlined-read-only-input"
                                            defaultValue=""
                                            value={`${comment?.user.username} : ${comment?.comment_value}`}
                                            InputProps={{
                                              readOnly: true,
                                            }}
                                            variant="outlined"
                                            fullWidth
                                          />
                                          {userLoginQuery?.id === comment.user_id ?
                                            <>
                                              {getToken() ?
                                                <form onSubmit={formikUpdateComment.handleSubmit}>
                                                  <Stack direction="column" spacing={1}>
                                                    <Button variant='outlined' size="small" color="success" onClick={() => {
                                                      formikUpdateComment.setFieldValue('comment_update_value', comment.comment_value)
                                                      handleUpdateCommentClick()
                                                      setCommentId(comment.id)
                                                    }}><IconEdit size={15} /></Button>
                                                    <Button variant='outlined' size="small" color="error" onClick={() => {
                                                      handleDeleteCommentClick()
                                                      setCommentId(comment.id)
                                                    }}><IconEraser size={15} /></Button>
                                                    <Dialog
                                                      open={openUpdateComment}
                                                      onClose={handleUpdateCommentClick}
                                                      PaperProps={{
                                                        component: 'form',
                                                        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                                                          event.preventDefault();
                                                          const formData = new FormData(event.currentTarget);
                                                          const formJson = Object.fromEntries((formData as any).entries());
                                                          handleUpdateCommentClick()
                                                        },
                                                      }}
                                                    >
                                                      <DialogTitle>Edit komentar anda</DialogTitle>
                                                      <DialogContent>
                                                        <TextField
                                                          margin="dense"
                                                          id="comment_update_value"
                                                          name="comment_update_value"
                                                          label="Komentar"
                                                          fullWidth
                                                          variant="standard"
                                                          onChange={formikUpdateComment.handleChange}
                                                          value={formikUpdateComment.values.comment_update_value}
                                                          error={formikUpdateComment.touched.comment_update_value && Boolean(formikUpdateComment.errors.comment_update_value)}
                                                          helperText={formikUpdateComment.touched.comment_update_value && formikUpdateComment.errors.comment_update_value}
                                                        />
                                                      </DialogContent>
                                                      <DialogActions>
                                                        <Button onClick={handleUpdateCommentClick}>Batal</Button>
                                                        <Button type="submit">Kirim</Button>
                                                      </DialogActions>
                                                    </Dialog>
                                                    <Dialog
                                                      open={openDeleteComment}
                                                      onClose={handleDeleteCommentClick}
                                                      aria-labelledby="alert-dialog-title"
                                                      aria-describedby="alert-dialog-description"
                                                    >
                                                      <DialogTitle id="alert-dialog-title">
                                                        {"Hapus Komentar ?"}
                                                      </DialogTitle>
                                                      <DialogContent>
                                                        <DialogContentText id="alert-dialog-description">
                                                          Komentar yang anda pilih akan dihapus secara permanen
                                                        </DialogContentText>
                                                      </DialogContent>
                                                      <DialogActions>
                                                        <Button onClick={handleDeleteCommentClick}>Batal</Button>
                                                        <Button onClick={() => {
                                                          mutateDeleteComment(commentId)
                                                          handleDeleteCommentClick()
                                                        }} autoFocus>
                                                          Hapus
                                                        </Button>
                                                      </DialogActions>
                                                    </Dialog>
                                                  </Stack>
                                                </form>
                                                : null}
                                            </>
                                            : null}
                                        </Stack>
                                        : null}
                                    </div>
                                  ))}
                                </Box>
                                {isSuccessUpdateComment && <SnackBarSuccess title="Berhasil mengubah komentar" />}
                                {isSuccessDeleteComment && <SnackBarSuccess title="Berhasil menghapus komentar" />}
                              </Grid>
                            </Grid>
                          </Stack>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </>
                : null}
            </Grid>
          </Box>
        </Collapse>
      </DashboardCard >
    </>
  )
}

export default QuestionDetail