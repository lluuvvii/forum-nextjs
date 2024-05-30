'use client'

import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField"
import { IconButton, InputAdornment } from "@mui/material"
import { VisibilityOff, Visibility } from "@mui/icons-material"
import { useState } from "react";

const PasswordInput = ({ formik }: any) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <CustomTextField
      // type="password"
      type={showPassword ? 'text' : 'password'}
      variant="outlined"
      fullWidth
      id="password"
      name="password"
      value={formik.values.password}
      onChange={formik.handleChange}
      error={formik.touched.password && Boolean(formik.errors.password)}
      helperText={formik.touched.password && formik.errors.password}
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

export default PasswordInput