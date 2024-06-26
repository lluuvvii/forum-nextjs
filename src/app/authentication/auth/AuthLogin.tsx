import React from "react"
import { useRouter } from "next/navigation"
import {
  Box,
  Typography,
  Button,
  Stack
} from "@mui/material"
import { useFormik } from "formik"
import * as Yup from 'yup'
import { useMutation } from "react-query"
import axios from '@/lib/axios'
import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField"
import PasswordInput from "./PasswordInput"

interface loginType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

const validationSchema = Yup.object({
  email: Yup.string().required('Email wajib diisi'),
  password: Yup.string().required('Password wajib diisi'),
});

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
  const router = useRouter()
  const { mutate, isLoading, error, isSuccess } = useMutation(async (values: any) => {
    try {
      const response = await axios.post('/api/login', values)
      if (response.status === 200) {
        localStorage.setItem('token', response?.data?.data?.access_token)
        router.push('/')
      }

      // return response.data
    } catch (err: any) {
      throw new Error(err.response.data.message)
    }
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <form onSubmit={formik.handleSubmit}>
        <Stack>
          <Box>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="email"
              mb="5px"
            >
              Email
            </Typography>
            <CustomTextField
              variant="outlined"
              fullWidth
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Box>
          <Box mt="25px">
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="password"
              mb="5px"
            >
              Password
            </Typography>
            <PasswordInput formik={formik} />
          </Box>
          <Stack
            justifyContent="space-between"
            direction="row"
            alignItems="center"
            my={2}
          >
          </Stack>
        </Stack>
        <Box>
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
            disabled={isLoading}
          >
            Masuk
          </Button>
        </Box>
        {error ? <Typography color="error">{(error as any).message}</Typography> : null}
        {isSuccess ? <Typography color="success">Berhasil masuk</Typography> : null}
      </form>
      {subtitle}
    </>
  )
}

export default AuthLogin;
