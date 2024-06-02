import { Button } from '@mui/material'
import Link from 'next/link'
import React from 'react'

const LoginButton = () => {
  return (
    <Button
      href="/authentication/login"
      variant="outlined"
      color="primary"
      component={Link}
      fullWidth
      onClick={() => localStorage.removeItem('token')}
    >
      Masuk
    </Button>
  )
}

export default LoginButton