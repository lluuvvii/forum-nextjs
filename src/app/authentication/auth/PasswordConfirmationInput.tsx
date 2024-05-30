'use client'

import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField"
import { IconButton, InputAdornment } from "@mui/material"
import { VisibilityOff, Visibility } from "@mui/icons-material"
import { useState } from "react";

const PasswordConfirmationInput = ({ formik }: any) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <CustomTextField
      // type="password"
      type={showPassword ? 'text' : 'password'}
      variant="outlined"
      fullWidth
      id="password_confirmation"
      name="password_confirmation"
      value={formik.values.password_confirmation}
      onChange={formik.handleChange}
      error={formik.touched.password_confirmation && Boolean(formik.errors.password_confirmation)}
      helperText={formik.touched.password_confirmation && formik.errors.password_confirmation}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  )
}

export default PasswordConfirmationInput