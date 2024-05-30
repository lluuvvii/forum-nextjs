import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import CustomTextField from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';
import PasswordInput from "./PasswordInput"
import axios from '@/lib/axios'
import { useMutation } from "react-query"
import { useFormik } from "formik"
import * as Yup from 'yup'
import PasswordConfirmationInput from './PasswordConfirmationInput';

interface registerType {
	title?: string;
	subtitle?: JSX.Element | JSX.Element[];
	subtext?: JSX.Element | JSX.Element[];
}

const validationSchema = Yup.object({
	name: Yup.string().required('Nama wajib diisi'),
	username: Yup.string().required('Username wajib diisi'),
	email: Yup.string().required('Email wajib diisi'),
	password: Yup.string().required('Password wajib diisi'),
	password_confirmation: Yup.string().required('Konfirmasi Password wajib diisi')
});

const AuthRegister = ({ title, subtitle, subtext }: registerType) => {
	const { mutate, isLoading, error, isSuccess } = useMutation(async (values: any) => {
		const response = await axios.post('/api/register', values)
		console.log(response)

		return response.data
	});

	const formik = useFormik({
		initialValues: {
			name: '',
			username: '',
			email: '',
			password: '',
			password_confirmation: ''
		},
		validationSchema,
		onSubmit: (values) => {
			mutate(values);
		},
	});

	return (
		// <>
		//     {title ? (
		//         <Typography fontWeight="700" variant="h2" mb={1}>
		//             {title}
		//         </Typography>
		//     ) : null}

		//     {subtext}

		//     <Box>
		//         <Stack mb={3}>
		//             <Typography variant="subtitle1"
		//                 fontWeight={600} component="label" htmlFor='name' mb="5px">Username</Typography>
		//             <CustomTextField id="name" variant="outlined" fullWidth />

		//             <Typography variant="subtitle1"
		//                 fontWeight={600} component="label" htmlFor='name' mb="5px">Nickname</Typography>
		//             <CustomTextField id="name" variant="outlined" fullWidth />

		//             <Typography variant="subtitle1"
		//                 fontWeight={600} component="label" htmlFor='email' mb="5px" mt="25px">Alamat Email</Typography>
		//             <CustomTextField id="email" variant="outlined" fullWidth />

		//             <Typography variant="subtitle1"
		//                 fontWeight={600} component="label" htmlFor='password' mb="5px" mt="25px">Password</Typography>
		//             <CustomTextField id="password" variant="outlined" fullWidth />
		//         </Stack>
		//         <Button color="primary" variant="contained" size="large" fullWidth component={Link} href="/authentication/login">
		//             Daftar
		//         </Button>
		//     </Box>
		//     {subtitle}
		// </>
		<>
			{title ? (
				<Typography fontWeight="700" variant="h2" mb={1}>
					{title}
				</Typography>
			) : null}

			{subtext}

			<form onSubmit={formik.handleSubmit}>
				<Stack>
					<Box mt="25px">
						<Typography
							variant="subtitle1"
							fontWeight={600}
							component="label"
							htmlFor="name"
							mb="5px"
						>
							Name
						</Typography>
						<CustomTextField
							variant="outlined"
							fullWidth
							id="name"
							name="name"
							value={formik.values.name}
							onChange={formik.handleChange}
							error={formik.touched.name && Boolean(formik.errors.name)}
							helperText={formik.touched.name && formik.errors.name}
						/>
					</Box>
					<Box mt="25px">
						<Typography
							variant="subtitle1"
							fontWeight={600}
							component="label"
							htmlFor="username"
							mb="5px"
						>
							Username
						</Typography>
						<CustomTextField
							variant="outlined"
							fullWidth
							id="username"
							name="username"
							value={formik.values.username}
							onChange={formik.handleChange}
							error={formik.touched.username && Boolean(formik.errors.username)}
							helperText={formik.touched.username && formik.errors.username}
						/>
					</Box>
					<Box mt="25px">
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
					<Box mt="25px">
						<Typography
							variant="subtitle1"
							fontWeight={600}
							component="label"
							htmlFor="password"
							mb="5px"
						>
							Konfirmasi Password
						</Typography>
						<PasswordConfirmationInput formik={formik} />
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
						Daftar
					</Button>
				</Box>
				{error ? <Typography color="error">{(error as any).message}</Typography> : null}
			</form>
			{subtitle}
		</>
	)
}

export default AuthRegister;
